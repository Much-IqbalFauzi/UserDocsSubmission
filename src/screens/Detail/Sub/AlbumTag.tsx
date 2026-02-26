import { Text, View } from 'react-native';
import { useFetch } from '../../../hooks/useFetch';
import { Album } from '../../../types/album';
import { getAlbums } from '../../../services/albumService';
import { styles } from '../style';
import LoadingView from '../../../components/LoadingView';
import ErrorView from '../../../components/ErrorView';
import EmptyView from '../../../components/EmptyView';
import { useEffect } from 'react';

export default function AlbumTag({ userId }: { userId: number }) {
  const { data, error, loading, execute } = useFetch<Album[]>(getAlbums);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={execute} />;
  if (!data || data.length === 0) return <EmptyView />;

  const filteredData = data.filter(item => item.userId == userId);

  return (
    <View>
      <View style={styles.tagContainer}>
        {filteredData.map(item => (
          <View key={item.id} style={styles.tag}>
            <Text adjustsFontSizeToFit={true}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
