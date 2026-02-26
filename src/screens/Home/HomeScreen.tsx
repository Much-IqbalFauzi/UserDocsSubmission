import { Button, Text, View } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  const handleNavigate = () => {
    navigation.navigate('Detail', { productId: 12 });
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="To Detail" onPress={handleNavigate} />
    </View>
  );
}
