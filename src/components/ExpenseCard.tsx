import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Expense } from '@/types';

type ExpenseCardProps = {
  expense: Expense;
};

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const amountLabel = `${expense.amount.toFixed(2)} KM`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${expense.name}, ${expense.category}, ${expense.date}, ${amountLabel}`}
      onPress={() => console.log('Open', expense.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        accessible={false}
        source={{ uri: expense.photoUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {expense.name}
        </Text>
        <Text style={styles.info} numberOfLines={1}>
          {expense.category} · {expense.date}
        </Text>
      </View>

      <Text style={styles.amount} numberOfLines={1}>
        {amountLabel}
      </Text>
      <Text accessible={false} style={styles.chevron}>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#E5E5E5',
    borderWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    width: 64,
    height: 64,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
  },
  details: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  name: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '700',
  },
  info: {
    color: '#737373',
    fontSize: 12,
  },
  amount: {
    flexShrink: 0,
    color: '#333333',
    fontSize: 15,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  chevron: {
    color: '#8A8A8A',
    fontSize: 24,
    fontWeight: '400',
  },
});
