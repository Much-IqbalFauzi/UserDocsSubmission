import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useFetch } from '../../hooks/useFetch';
import TextCard from '../../components/TextCard';
import { getAlbums } from '../../services/albumService';
import { Album } from '../../types/album';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import EmptyView from '../../components/EmptyView';
import { User } from '../../types/user';
import { getUsers } from '../../services/userService';

export default function HomeScreen({ navigation }: any) {
  const { data, loading, error, execute } = useFetch<User[]>(getUsers);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={execute} />;
  if (!data || data.length === 0) return <EmptyView />;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      refreshing={loading}
      onRefresh={execute}
      renderItem={({ item }) => (
        <TextCard
          user={item}
          onPress={() => navigation.navigate('Detail', { userId: item })}
        />
      )}
    />
  );
}
