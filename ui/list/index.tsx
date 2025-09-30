import ListItem from '@/ui/list-item';
import { FlatList, FlatListProps, ListRenderItem, StyleSheet, View } from 'react-native';

type Item = {
  id: string;
  title: string | number;
  number?: number;
};

interface ListProps extends Omit<FlatListProps<Item>, 'data' | 'renderItem'> {
  items: Item[];
  renderItem?: ListRenderItem<Item>;
}

const List = ({ items, style, ...props }: ListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        contentContainerStyle={[styles.contentContainer, style]}
        renderItem={({ item }) => <ListItem title={item.title} number={item.number} />}
        keyExtractor={(item) => item.id}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12,
    flex: 1,
    paddingBottom: 40,
  },
});

export default List;
