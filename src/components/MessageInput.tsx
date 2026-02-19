import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme';

interface MessageInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
}: MessageInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0 || disabled) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, disabled && styles.inputDisabled]}
          value={text}
          onChangeText={setText}
          placeholder={disabled ? 'Select an option above...' : placeholder}
          placeholderTextColor={colors.textTertiary}
          multiline
          maxLength={500}
          editable={!disabled}
          onSubmitEditing={handleSend}
          blurOnSubmit
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (text.trim().length === 0 || disabled) && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={text.trim().length === 0 || disabled}
        >
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing.lg,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.sm,
    ...typography.body,
    color: colors.textPrimary,
    maxHeight: 100,
    minHeight: 44,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.surfaceLight,
  },
  sendIcon: {
    color: colors.textOnRed,
    fontSize: 20,
    fontWeight: '700',
  },
});
