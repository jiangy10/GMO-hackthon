import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
  visible: boolean;
}

export default function ProgressDots({
  currentStep,
  totalSteps,
  visible,
}: ProgressDotsProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < currentStep && styles.dotCompleted,
              index === currentStep && styles.dotActive,
              index > currentStep && styles.dotPending,
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>
        Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotCompleted: {
    backgroundColor: colors.adobeRed,
  },
  dotActive: {
    backgroundColor: colors.adobeRed,
    width: 24,
    borderRadius: 4,
  },
  dotPending: {
    backgroundColor: colors.surfaceHighlight,
  },
  label: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '500',
  },
});
