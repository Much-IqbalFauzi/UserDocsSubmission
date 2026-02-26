import { useContext, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login('mock@mail.com', 'MOCK_TOKEN');
    setLoading(false);
  };

  return (
    <View>
      <Text>Login Screen</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
