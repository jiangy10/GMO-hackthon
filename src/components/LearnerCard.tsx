import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Message } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface LearnerCardProps {
  message: Message;
}

function formatForExport(cards: { step: string; points: string[] }[]): string {
  return cards
    .map(
      (card, i) =>
        `${i + 1}. ${card.step}\n${card.points.map((p) => `   • ${p}`).join('\n')}`
    )
    .join('\n\n');
}

export default function LearnerCard({ message }: LearnerCardProps) {
  const cards = message.learnerCard;
  if (!cards || cards.length === 0) return null;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCopy = async () => {
    const text = formatForExport(cards);
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = formatForExport(cards);
    try {
      await Share.share({
        message: `Knowledge Review Cards\n\n${text}`,
        ...(Platform.OS !== 'web' ? {} : { title: 'Knowledge Review Cards' }),
      });
    } catch (_) {
      // user cancelled
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Knowledge Review Cards</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleCopy}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{copied ? '✓' : '📋'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>↗</Text>
            </TouchableOpacity>
          </View>
        </View>

        {cards.map((card, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View key={index} style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggle(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionNumber}>{index + 1}</Text>
                <Text style={styles.sectionTitle}>{card.step}</Text>
                <Text style={styles.chevron}>{isExpanded ? '▾' : '▸'}</Text>
              </TouchableOpacity>
              {isExpanded && (
                <View style={styles.pointsList}>
                  {card.points.map((point, pi) => (
                    <View key={pi} style={styles.pointRow}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.pointText}>{point}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
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
  card: {
    flex: 1,
    backgroundColor: '#1A2332',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.lg,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  headerText: {
    ...typography.label,
    color: colors.accent,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(74, 144, 217, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
    color: colors.accent,
  },
  section: {
    marginBottom: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  sectionNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  chevron: {
    fontSize: 14,
    color: colors.textTertiary,
    marginLeft: spacing.xs,
  },
  pointsList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: {
    color: colors.accent,
    fontSize: 14,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  pointText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});
