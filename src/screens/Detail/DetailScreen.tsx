import { Text, View } from 'react-native';

export default function DetailScreen({ route }: any) {
  const { productId } = route.params;

  return (
    <View>
      <Text>Detail Screen: {productId}</Text>
    </View>
  );
}
