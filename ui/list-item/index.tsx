import MyText from '@/ui/text';
import { StyleSheet, View, ViewProps } from 'react-native';
import { THEME_COLORS } from '../theme';

interface ListItemProps extends ViewProps {
  title: string | number;
  number?: number | string;
  icon?: React.ReactNode;
}

const ListItem = ({ title, number, icon }: ListItemProps) => {
  return (
    <View style={styles.container}>
      {!!icon && icon}

      <View>
        {!!number && (
          <MyText size="sm" color="white" weight="500" style={styles.number}>
            {number}
          </MyText>
        )}
      </View>

      <MyText size="base" color="white" weight="500" style={styles.title}>
        {title}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME_COLORS.ALL.blue,
    backgroundColor: `${THEME_COLORS.ALL.blue}30`,
    width: 200,
  },
  number: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: THEME_COLORS.ALL.white,
    aspectRatio: '1 / 1',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    borderRadius: 12,
  },
});

export default ListItem;
