import { Message, ChoiceOption, ConversationState } from '../types';
import {
  introMessages,
  overviewMessages,
  scriptSteps,
  finalMessages,
  finalPrompt,
  knowledgePoints,
} from '../data/conversationScript';

let messageCounter = 0;

function createId(): string {
  return `msg_${Date.now()}_${++messageCounter}`;
}

function aiText(content: string): Message {
  return {
    id: createId(),
    type: 'text',
    sender: 'ai',
    content,
    timestamp: Date.now(),
  };
}

function userText(content: string): Message {
  return {
    id: createId(),
    type: 'text',
    sender: 'user',
    content,
    timestamp: Date.now(),
  };
}

function choiceMessage(stepIndex: number): Message {
  const step = scriptSteps[stepIndex];
  return {
    id: createId(),
    type: 'choice',
    sender: 'ai',
    content: '',
    choices: {
      stepId: step.id,
      options: step.choices,
    },
    timestamp: Date.now(),
  };
}

function referenceMessage(stepIndex: number): Message | null {
  const step = scriptSteps[stepIndex];
  if (!step.references || step.references.length === 0) return null;
  return {
    id: createId(),
    type: 'reference',
    sender: 'ai',
    content: '',
    references: step.references,
    timestamp: Date.now(),
  };
}

function learnerCardMessage(): Message {
  return {
    id: createId(),
    type: 'learner-card',
    sender: 'ai',
    content: '',
    learnerCard: knowledgePoints,
    timestamp: Date.now(),
  };
}

export interface EngineResponse {
  aiMessages: Message[];
  stateUpdates: Partial<ConversationState>;
}

/**
 * Kick off the conversation with intro messages.
 */
export function startConversation(): EngineResponse {
  return {
    aiMessages: introMessages.map(aiText),
    stateUpdates: {
      phase: 'intro',
      currentStepIndex: 0,
      totalSteps: scriptSteps.length,
    },
  };
}

/**
 * User submits their video idea (free text during intro phase).
 * Responds with the 5-point overview then the first step's educational
 * content and choice card.
 */
export function handleUserIdea(idea: string): EngineResponse {
  const step = scriptSteps[0];
  const refMsg = referenceMessage(0);
  return {
    aiMessages: [
      userText(idea),
      ...overviewMessages.map(aiText),
      ...step.preMessages.map(aiText),
      ...(refMsg ? [refMsg] : []),
      choiceMessage(0),
    ],
    stateUpdates: {
      phase: 'exploring',
      userIdea: idea,
      currentStepIndex: 0,
    },
  };
}

/**
 * User clicks one of the choice buttons.
 */
export function handleChoiceSelection(
  option: ChoiceOption,
  state: ConversationState
): EngineResponse {
  const currentStep = scriptSteps[state.currentStepIndex];
  const nextIndex = state.currentStepIndex + 1;
  const isLast = nextIndex >= scriptSteps.length;

  const confirmation =
    currentStep.confirmationMessages[option.id] ??
    currentStep.defaultConfirmation;

  const newSelections = {
    ...state.selections,
    [currentStep.id]: `${option.letter}. ${option.label}`,
  };

  if (isLast) {
    return buildFinalResponse(
      userText(`${option.letter}，${option.label}`),
      confirmation,
      newSelections,
      nextIndex,
    );
  }

  const nextStep = scriptSteps[nextIndex];
  const refMsg = referenceMessage(nextIndex);
  return {
    aiMessages: [
      userText(`${option.letter}，${option.label}`),
      ...confirmation.map(aiText),
      ...nextStep.preMessages.map(aiText),
      ...(refMsg ? [refMsg] : []),
      choiceMessage(nextIndex),
    ],
    stateUpdates: {
      phase: 'exploring',
      currentStepIndex: nextIndex,
      selections: newSelections,
    },
  };
}

/**
 * User types free text during the exploring phase instead of clicking.
 * Advances exactly the same way as a choice selection.
 */
export function handleUserText(
  text: string,
  state: ConversationState
): EngineResponse {
  const currentStep = scriptSteps[state.currentStepIndex];
  const nextIndex = state.currentStepIndex + 1;
  const isLast = nextIndex >= scriptSteps.length;

  const newSelections = {
    ...state.selections,
    [currentStep.id]: text,
  };

  if (isLast) {
    return buildFinalResponse(
      userText(text),
      currentStep.defaultConfirmation,
      newSelections,
      nextIndex,
    );
  }

  const nextStep = scriptSteps[nextIndex];
  const refMsg = referenceMessage(nextIndex);
  return {
    aiMessages: [
      userText(text),
      ...currentStep.defaultConfirmation.map(aiText),
      ...nextStep.preMessages.map(aiText),
      ...(refMsg ? [refMsg] : []),
      choiceMessage(nextIndex),
    ],
    stateUpdates: {
      phase: 'exploring',
      currentStepIndex: nextIndex,
      selections: newSelections,
    },
  };
}

function buildFinalResponse(
  userMsg: Message,
  confirmation: string[],
  selections: Record<string, string>,
  nextIndex: number,
): EngineResponse {
  const parameterMap: Record<string, string> = {};
  for (const step of scriptSteps) {
    parameterMap[step.id] = selections[step.id] ?? '';
  }

  const promptResultMsg: Message = {
    id: createId(),
    type: 'prompt-result',
    sender: 'ai',
    content: finalMessages[1],
    promptResult: {
      prompt: finalPrompt,
      parameters: parameterMap,
    },
    timestamp: Date.now(),
  };

  const previewMsg: Message = {
    id: createId(),
    type: 'video-preview',
    sender: 'ai',
    content:
      "Here's a preview of what your video would look like with these settings.",
    timestamp: Date.now(),
  };

  return {
    aiMessages: [
      userMsg,
      ...confirmation.map(aiText),
      ...finalMessages.map(aiText),
      promptResultMsg,
      learnerCardMessage(),
      aiText('Calling Firefly API...'),
      previewMsg,
      aiText("Is there anything you'd like to adjust or modify in this prompt?"),
    ],
    stateUpdates: {
      phase: 'complete',
      currentStepIndex: nextIndex,
      selections,
    },
  };
}

export function resetConversation(): EngineResponse {
  messageCounter = 0;
  return startConversation();
}
