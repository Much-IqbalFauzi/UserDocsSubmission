import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 32,
    fontWeight: '500',
  },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 8 },
  error: { color: 'red', marginBottom: 10 },
});
