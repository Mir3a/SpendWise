import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';

import type { Expense } from '@/types';

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const description = expense.description?.trim();
  const receiptPhotoUrl = expense.receiptPhotoUrl?.trim();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image
        source={{ uri: expense.photoUrl }}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={`Expense image for ${expense.name}`}
      />

      <View style={styles.summary}>
        <Text style={styles.name} accessibilityRole="header">
          {expense.name}
        </Text>
        <Text style={styles.amount} selectable>
          {expense.amount.toFixed(2)} KM
        </Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value} selectable>{expense.category}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value} selectable>{expense.date}</Text>
        </View>
      </View>

      {description ? (
        <View style={styles.field}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Description
          </Text>
          <Text style={styles.value} selectable>{description}</Text>
        </View>
      ) : null}

      {receiptPhotoUrl ? (
        <View style={styles.field}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Receipt
          </Text>
          <Image
            source={{ uri: receiptPhotoUrl }}
            style={styles.receiptImage}
            resizeMode="contain"
            accessibilityLabel={`Receipt for ${expense.name}`}
          />
        </View>
      ) : null}

      <View style={styles.field}>
        <Text style={styles.label}>Expense ID</Text>
        <Text style={styles.id} selectable>{expense.id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 20,
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },
  summary: {
    gap: 8,
  },
  name: {
    color: '#262626',
    fontSize: 24,
    fontWeight: '700',
  },
  amount: {
    color: '#262626',
    fontSize: 32,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  infoCard: {
    padding: 16,
    gap: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  field: {
    gap: 6,
  },
  label: {
    color: '#737373',
    fontSize: 13,
  },
  value: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    color: '#262626',
    fontSize: 18,
    fontWeight: '600',
  },
  receiptImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  id: {
    color: '#737373',
    fontSize: 12,
  },
});
