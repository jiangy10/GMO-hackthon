import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';
import { colors, spacing, borderRadius, typography } from '../theme';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.aiText,
          ]}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
    marginHorizontal: spacing.lg,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: colors.textOnRed,
    fontSize: 14,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  userBubble: {
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: spacing.xs,
  },
  aiBubble: {
    backgroundColor: colors.aiBubble,
    borderBottomLeftRadius: spacing.xs,
  },
  text: {
    ...typography.body,
  },
  userText: {
    color: colors.textOnRed,
  },
  aiText: {
    color: colors.textPrimary,
  },
});
