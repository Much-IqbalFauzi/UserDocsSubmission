import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Album } from '../types/album';
import { User } from '../types/user';

interface Props {
  user: User;
  onPress?: () => void;
}

export default function TextCard({ user, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderBottomWidth: 1,
  },
  name: {
    fontWeight: 'bold',
  },
});
