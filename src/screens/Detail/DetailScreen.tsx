import { Text, View } from 'react-native';
import { User } from '../../types/user';
import { styles } from './style';
import AlbumTag from './Sub/AlbumTag';

export default function DetailScreen({ route, navigation }: any) {
  const { paramItem } = route.params;
  const user: User = paramItem;

  navigation.setOptions({
    title: user.name,
  });

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.userInfo}>{user.name}</Text>
      <Text style={styles.userInfo}>{user.email}</Text>
      <Text style={styles.userInfo}>{user.phone}</Text>
      <Text style={styles.userInfo}>{user.company.name}</Text>

      <Text style={styles.userInfo}>Album tags:</Text>
      <AlbumTag userId={user.id} />
    </View>
  );
}
