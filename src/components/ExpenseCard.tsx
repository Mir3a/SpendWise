import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Expense } from '@/types';

type ExpenseCardProps = {
  expense: Expense;
  style?: StyleProp<ViewStyle>;
};

export default function ExpenseCard({ expense, style }: ExpenseCardProps) {
  const theme = useTheme();
  const amountLabel = expense.amount.toFixed(2) + ' KM';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[expense.name, expense.category, expense.date, amountLabel].join(', ')}
      onPress={() => console.log('Open', expense.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.photoContainer}>
        <Image
          accessible={false}
          source={{ uri: expense.photoUrl }}
          style={[styles.photo, { backgroundColor: theme.card }]}
          resizeMode="cover"
        />
        <Text
          style={[styles.badge, { backgroundColor: theme.primary, color: theme.onPrimary }]}
        >
          {expense.category}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.text }]}>{expense.name}</Text>
        <View style={styles.details}>
          <Text style={[styles.info, { color: theme.muted }]}>{expense.category}</Text>
          <Text style={[styles.info, { color: theme.muted }]}>{expense.date}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.amount, { color: theme.text }]}>{amountLabel}</Text>
          <Text accessible={false} style={[styles.chevron, { color: theme.muted }]}>
            ›
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    minWidth: 0,
  },
  pressed: { opacity: 0.6 },
  photoContainer: {
    borderTopLeftRadius: Radius.md,
    borderTopRightRadius: Radius.md,
    overflow: 'hidden',
  },
  photo: { width: '100%', aspectRatio: 16 / 9 },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    maxWidth: '90%',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    fontSize: FontSize.small,
    fontWeight: '600',
  },
  content: { padding: Spacing.md, gap: Spacing.sm },
  name: { fontSize: FontSize.body, fontWeight: '700' },
  details: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  info: { fontSize: FontSize.small, flexShrink: 1 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  amount: {
    flex: 1,
    fontSize: FontSize.title,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  chevron: { fontSize: FontSize.hero },
});
