import React from 'react';
import { View, Text } from 'react-native';

export default function EmptyView() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No data available</Text>
    </View>
  );
}
