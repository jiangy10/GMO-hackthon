import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Message } from '../types';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const previewSource = require('../../assets/preview-video.mp4');

interface VideoPreviewCardProps {
  message: Message;
}

export default function VideoPreviewCard({ message }: VideoPreviewCardProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const webVideoRef = useCallback((node: any) => {
    if (Platform.OS === 'web' && node) {
      const el = node as HTMLElement;
      const videoEl = el.querySelector?.('video');
      if (videoEl) {
        videoEl.style.width = '100%';
        videoEl.style.height = '100%';
        videoEl.style.objectFit = 'contain';
      }
    }
  }, []);

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      if (!hasStarted) {
        setHasStarted(true);
      }
      await videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.description}>{message.content}</Text>

        <View style={styles.previewContainer} ref={webVideoRef}>
          <Video
            ref={videoRef}
            source={previewSource}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
              }
            }}
            {...(Platform.OS === 'web' ? { useNativeControls: false } : {})}
          />

          <TouchableOpacity
            style={[
              styles.videoOverlay,
              hasStarted && isPlaying && styles.videoOverlayHidden,
            ]}
            onPress={togglePlayback}
            activeOpacity={0.8}
          >
            {!hasStarted && (
              <>
                <View style={styles.playButton}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
                <Text style={styles.tapHint}>Tap to play preview</Text>
              </>
            )}
            {hasStarted && !isPlaying && (
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            )}
          </TouchableOpacity>

          {hasStarted && isPlaying && (
            <TouchableOpacity
              style={styles.pauseZone}
              onPress={togglePlayback}
              activeOpacity={1}
            />
          )}
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
  description: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  previewContainer: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.sm,
    backgroundColor: '#000',
    ...shadows.elevated,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  videoOverlayHidden: {
    opacity: 0,
  },
  pauseZone: {
    ...StyleSheet.absoluteFillObject,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.adobeRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: colors.textOnRed,
    fontSize: 20,
    marginLeft: 3,
  },
  tapHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
