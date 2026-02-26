import { Text, View } from 'react-native';
import { User } from '../../types/user';

export default function DetailScreen({ route }: any) {
  const { paramItem } = route.params;

  return (
    <View>
      <Text>Detail Screen: {paramItem}</Text>
    </View>
  );
}
