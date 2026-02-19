import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, borderRadius, typography } from '../src/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo Area */}
        <View style={styles.logoArea}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>Ai</Text>
          </View>
          <Text style={styles.adobeText}>ADOBE</Text>
        </View>

        {/* Hero Content */}
        <View style={styles.heroContent}>
          <Text style={styles.title}>Creative{'\n'}Prompt Builder</Text>
          <Text style={styles.subtitle}>
            Don't know the right words for your video vision?{'\n'}
            Let me help you discover them.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem
            emoji="🎬"
            title="Explore Techniques"
            description="Learn cinematography concepts through visual examples"
          />
          <FeatureItem
            emoji="🎯"
            title="Make Choices"
            description="Pick your preferred style from curated option pairs"
          />
          <FeatureItem
            emoji="✨"
            title="Get Your Prompt"
            description="Receive a professional video prompt built from your preferences"
          />
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/chat')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>Start Creating</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Powered by Adobe Firefly
        </Text>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    justifyContent: 'center',
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoBox: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    color: colors.textOnRed,
    fontSize: 20,
    fontWeight: '700',
  },
  adobeText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 3,
  },
  heroContent: {
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 44,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  features: {
    marginBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 28,
    marginRight: spacing.lg,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    ...typography.bodySmall,
    color: colors.textTertiary,
  },
  ctaButton: {
    backgroundColor: colors.adobeRed,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  ctaText: {
    color: colors.textOnRed,
    fontSize: 18,
    fontWeight: '700',
  },
  footerText: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.textTertiary,
  },
});
