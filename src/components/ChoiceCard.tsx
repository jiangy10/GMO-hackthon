import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Message, ChoiceOption } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface ChoiceCardProps {
  message: Message;
  onSelect: (option: ChoiceOption) => void;
  disabled?: boolean;
}

export default function ChoiceCard({
  message,
  onSelect,
  disabled,
}: ChoiceCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!message.choices) return null;

  const { options } = message.choices;

  const handleSelect = (option: ChoiceOption) => {
    if (disabled || selectedId) return;
    setSelectedId(option.id);
    onSelect(option);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.optionsList}>
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isOther = selectedId !== null && selectedId !== option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionSelected,
                  isOther && styles.optionDimmed,
                ]}
                onPress={() => handleSelect(option)}
                disabled={!!disabled || !!selectedId}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.letterBadge,
                    isSelected && styles.letterBadgeSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      isSelected && styles.letterTextSelected,
                    ]}
                  >
                    {option.letter}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.xs,
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
  optionsList: {
    gap: spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.choiceCardBorder,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  optionSelected: {
    borderColor: colors.adobeRed,
    backgroundColor: '#3A2020',
  },
  optionDimmed: {
    opacity: 0.35,
  },
  letterBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  letterBadgeSelected: {
    backgroundColor: colors.adobeRed,
  },
  letterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  letterTextSelected: {
    color: colors.textOnRed,
  },
  optionLabel: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  optionLabelSelected: {
    color: colors.adobeRedLight,
    fontWeight: '600',
  },
});
