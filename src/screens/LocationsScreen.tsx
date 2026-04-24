import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenShell} from '../ui/ScreenShell';
import {ScreenHeader} from '../ui/ScreenHeader';
import {MissionCard} from '../ui/MissionCard';
import {palette, radius, typography} from '../config/theme';
import {locations} from '../data/locations';
import {useBookmarks} from '../providers/BookmarksProvider';
import {RootStackParamList} from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Locations'>;

export const LocationsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {isLocationSaved, toggleLocation} = useBookmarks();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return locations;
    }
    return locations.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <ScreenShell showStars withTabBar edges={['top']}>
      <ScreenHeader
        title="Space Locations"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search locations..."
          placeholderTextColor={palette.textMuted}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <MissionCard
            variant="row"
            image={item.image}
            title={item.name}
            subtitle={item.description.split('.')[0]}
            country={item.country}
            saved={isLocationSaved(item.id)}
            onToggleSave={() => toggleLocation(item.id)}
            onPress={() =>
              navigation.navigate('LocationDetails', {locationId: item.id})
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No locations match your search.</Text>
        }
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    height: 46,
    gap: 8,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: 14,
    paddingVertical: 0,
  },
  list: {
    gap: 10,
    paddingBottom: 20,
  },
  empty: {
    ...typography.bodySmall,
    textAlign: 'center',
    paddingVertical: 30,
  },
});
