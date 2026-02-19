import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChatProvider } from '../src/context/ChatContext';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <ChatProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </ChatProvider>
  );
}
