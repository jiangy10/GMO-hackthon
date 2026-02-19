import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import {
  ConversationState,
  ConversationAction,
  Message,
  ChoiceOption,
} from '../types';
import {
  startConversation,
  handleUserIdea,
  handleChoiceSelection,
  handleUserText,
  EngineResponse,
} from '../services/conversationEngine';

const initialState: ConversationState = {
  phase: 'idle',
  currentStepIndex: 0,
  totalSteps: 5,
  userIdea: '',
  selections: {},
  messages: [],
  isTyping: false,
};

function chatReducer(
  state: ConversationState,
  action: ConversationAction
): ConversationState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.isTyping };
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SET_USER_IDEA':
      return { ...state, userIdea: action.idea };
    case 'ADD_SELECTION':
      return {
        ...state,
        selections: { ...state.selections, [action.key]: action.value },
      };
    case 'SET_STEP':
      return { ...state, currentStepIndex: action.index };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

interface ChatContextValue {
  state: ConversationState;
  initConversation: () => void;
  sendUserIdea: (idea: string) => void;
  selectChoice: (option: ChoiceOption) => void;
  sendText: (text: string) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const processEngineResponse = useCallback(
    async (response: EngineResponse) => {
      if (response.stateUpdates.phase) {
        dispatch({ type: 'SET_PHASE', phase: response.stateUpdates.phase });
      }
      if (response.stateUpdates.userIdea !== undefined) {
        dispatch({ type: 'SET_USER_IDEA', idea: response.stateUpdates.userIdea });
      }
      if (response.stateUpdates.currentStepIndex !== undefined) {
        dispatch({ type: 'SET_STEP', index: response.stateUpdates.currentStepIndex });
      }
      if (response.stateUpdates.selections) {
        for (const [key, value] of Object.entries(response.stateUpdates.selections)) {
          dispatch({ type: 'ADD_SELECTION', key, value });
        }
      }

      for (const msg of response.aiMessages) {
        if (msg.sender === 'user') {
          dispatch({ type: 'ADD_MESSAGE', message: msg });
        } else {
          dispatch({ type: 'SET_TYPING', isTyping: true });
          await delay(500 + Math.random() * 400);
          dispatch({ type: 'SET_TYPING', isTyping: false });
          dispatch({ type: 'ADD_MESSAGE', message: msg });

          // Simulate Firefly API call with a longer pause
          if (msg.content === 'Calling Firefly API...') {
            dispatch({ type: 'SET_TYPING', isTyping: true });
            await delay(5000);
            dispatch({ type: 'SET_TYPING', isTyping: false });
          }

          if (response.aiMessages.indexOf(msg) < response.aiMessages.length - 1) {
            await delay(200);
          }
        }
      }
    },
    []
  );

  const initConversation = useCallback(() => {
    dispatch({ type: 'RESET' });
    processEngineResponse(startConversation());
  }, [processEngineResponse]);

  const sendUserIdea = useCallback(
    (idea: string) => {
      processEngineResponse(handleUserIdea(idea));
    },
    [processEngineResponse]
  );

  const selectChoice = useCallback(
    (option: ChoiceOption) => {
      processEngineResponse(handleChoiceSelection(option, stateRef.current));
    },
    [processEngineResponse]
  );

  const sendText = useCallback(
    (text: string) => {
      const phase = stateRef.current.phase;
      if (phase === 'intro') {
        processEngineResponse(handleUserIdea(text));
      } else if (phase === 'exploring') {
        processEngineResponse(handleUserText(text, stateRef.current));
      } else if (phase === 'complete') {
        dispatch({
          type: 'ADD_MESSAGE',
          message: {
            id: `msg_${Date.now()}`,
            type: 'text',
            sender: 'user',
            content: text,
            timestamp: Date.now(),
          },
        });
      }
    },
    [processEngineResponse]
  );

  return (
    <ChatContext.Provider
      value={{ state, initConversation, sendUserIdea, selectChoice, sendText }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
