import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Message } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface ReferenceCardProps {
  message: Message;
}

export default function ReferenceCard({ message }: ReferenceCardProps) {
  const refs = message.references;
  if (!refs || refs.length === 0) return null;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>📚</Text>
          <Text style={styles.headerText}>References</Text>
        </View>
        {refs.map((ref, index) => (
          <TouchableOpacity
            key={index}
            style={styles.refRow}
            onPress={() => Linking.openURL(ref.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.linkIcon}>🔗</Text>
            <Text style={styles.refTitle} numberOfLines={2}>
              {ref.title}
            </Text>
          </TouchableOpacity>
        ))}
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
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerIcon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  headerText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  linkIcon: {
    fontSize: 12,
    marginRight: spacing.sm,
  },
  refTitle: {
    ...typography.bodySmall,
    color: colors.accent,
    flex: 1,
  },
});
