import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface PromptResultCardProps {
  message: Message;
}

export default function PromptResultCard({ message }: PromptResultCardProps) {
  if (!message.promptResult) return null;

  const { prompt, parameters } = message.promptResult;

  const parameterLabels: Record<string, string> = {
    subject_detail: 'Subject & Drift Details',
    camera_language: 'Camera Language',
    time_control: 'Time Control',
    lighting_env: 'Lighting & Environment',
    quality_realism: 'Visual Quality & Realism',
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{message.content}</Text>

        <View style={styles.promptCard}>
          <View style={styles.promptHeader}>
            <Text style={styles.promptHeaderIcon}>✨</Text>
            <Text style={styles.promptHeaderText}>Generated Prompt</Text>
          </View>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>

        <View style={styles.parametersCard}>
          <Text style={styles.parametersTitle}>Your Selections</Text>
          {Object.entries(parameters).map(([key, value]) => (
            <View key={key} style={styles.parameterRow}>
              <Text style={styles.parameterKey}>
                {parameterLabels[key] || key}
              </Text>
              <Text style={styles.parameterValue}>
                {String(value)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.sm,
    marginHorizontal: spacing.lg,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginTop: spacing.xs,
  },
  avatarText: {
    color: colors.textOnRed,
    fontSize: 14,
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  promptCard: {
    backgroundColor: '#1A2332',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  promptHeaderIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  promptHeaderText: {
    ...typography.label,
    color: colors.accent,
  },
  promptText: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  parametersCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  parametersTitle: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  parameterKey: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
  parameterValue: {
    ...typography.bodySmall,
    color: colors.adobeRed,
    fontWeight: '600',
    flex: 1.5,
    textAlign: 'right',
  },
});
