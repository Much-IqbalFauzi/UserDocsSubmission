import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  userInfo: {
    fontSize: 18,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  tag: {
    padding: 4,
    display: 'flex',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    margin: 4,
  },
});
