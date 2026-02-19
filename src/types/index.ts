export type MessageType =
  | 'text'
  | 'choice'
  | 'prompt-result'
  | 'video-preview'
  | 'reference'
  | 'learner-card';

export interface ChoiceOption {
  id: string;
  label: string;
  letter: string;
}

export interface Message {
  id: string;
  type: MessageType;
  sender: 'user' | 'ai';
  content: string;
  choices?: {
    stepId: string;
    options: ChoiceOption[];
  };
  selectedChoiceId?: string;
  promptResult?: {
    prompt: string;
    parameters: Record<string, string>;
  };
  references?: { title: string; url: string }[];
  learnerCard?: { step: string; points: string[] }[];
  timestamp: number;
}

export type ConversationPhase = 'idle' | 'intro' | 'exploring' | 'generating' | 'complete';

export interface ConversationState {
  phase: ConversationPhase;
  currentStepIndex: number;
  totalSteps: number;
  userIdea: string;
  selections: Record<string, string>;
  messages: Message[];
  isTyping: boolean;
}

export type ConversationAction =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'SET_TYPING'; isTyping: boolean }
  | { type: 'SET_PHASE'; phase: ConversationPhase }
  | { type: 'SET_USER_IDEA'; idea: string }
  | { type: 'ADD_SELECTION'; key: string; value: string }
  | { type: 'SET_STEP'; index: number }
  | { type: 'RESET' };
