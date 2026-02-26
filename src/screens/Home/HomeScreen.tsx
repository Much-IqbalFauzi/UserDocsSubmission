import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFetch } from '../../hooks/useFetch';
import TextCard from '../../components/TextCard';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import { User } from '../../types/user';
import { getUsers } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { styles } from './style';

export default function HomeScreen({ navigation }: any) {
  const { data, loading, error, execute } = useFetch<User[]>(getUsers);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    getSavedEmail();
  }, []);

  useEffect(() => {
    execute();
  }, [execute]);

  const getSavedEmail = async () => {
    const email = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL);
    if (email) {
      setUserEmail(email);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={execute} />;
  if (!data || data.length === 0) return <EmptyView />;

  return (
    <View>
      <View>
        <Text style={styles.header}>Welcome: {userEmail}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={execute}
        renderItem={({ item }) => (
          <TextCard
            user={item}
            onPress={() => navigation.navigate('Detail', { paramItem: item })}
          />
        )}
      />
    </View>
  );
}
