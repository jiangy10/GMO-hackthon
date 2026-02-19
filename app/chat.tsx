import React, { useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useChat } from '../src/context/ChatContext';
import { Message } from '../src/types';
import ChatBubble from '../src/components/ChatBubble';
import ChoiceCard from '../src/components/ChoiceCard';
import PromptResultCard from '../src/components/PromptResultCard';
import VideoPreviewCard from '../src/components/VideoPreviewCard';
import ReferenceCard from '../src/components/ReferenceCard';
import LearnerCard from '../src/components/LearnerCard';
import TypingIndicator from '../src/components/TypingIndicator';
import MessageInput from '../src/components/MessageInput';
import { colors, spacing, typography } from '../src/theme';

export default function ChatScreen() {
  const router = useRouter();
  const { state, initConversation, selectChoice, sendText } =
    useChat();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    initConversation();
  }, []);

  useEffect(() => {
    if (state.messages.length > 0 || state.isTyping) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [state.messages.length, state.isTyping]);

  const handleSend = (text: string) => {
    sendText(text);
  };

  const isInputActive =
    (state.phase === 'intro' || state.phase === 'exploring' || state.phase === 'complete') &&
    !state.isTyping;

  const placeholderText =
    state.phase === 'intro'
      ? 'Describe your video idea...'
      : state.phase === 'complete'
        ? 'Type your feedback...'
        : 'Type your choice or thoughts...';

  const renderMessage = ({ item }: { item: Message }) => {
    switch (item.type) {
      case 'text':
        return <ChatBubble message={item} />;
      case 'choice':
        return (
          <ChoiceCard
            message={item}
            onSelect={selectChoice}
            disabled={
              state.phase === 'complete' ||
              state.isTyping ||
              item.id !==
                state.messages
                  .filter((m) => m.type === 'choice')
                  .slice(-1)[0]?.id
            }
          />
        );
      case 'prompt-result':
        return <PromptResultCard message={item} />;
      case 'video-preview':
        return <VideoPreviewCard message={item} />;
      case 'reference':
        return <ReferenceCard message={item} />;
      case 'learner-card':
        return <LearnerCard message={item} />;
      default:
        return <ChatBubble message={item} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerLogoBox}>
            <Text style={styles.headerLogoText}>Ai</Text>
          </View>
          <Text style={styles.headerTitle}>Creative Assistant</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={state.messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={state.isTyping ? <TypingIndicator /> : null}
        />

        <MessageInput
          onSend={handleSend}
          placeholder={placeholderText}
          disabled={!isInputActive}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '300',
    marginTop: -2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogoBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  headerLogoText: {
    color: colors.textOnRed,
    fontSize: 13,
    fontWeight: '700',
  },
  headerTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerRight: {
    width: 36,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
