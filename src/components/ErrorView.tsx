import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
      <Button title="Retry" onPress={onRetry} />
    </View>
  );
}
