import { ScrollView, Text, View, StyleSheet } from 'react-native';

import ExpenseCard from '@/components/ExpenseCard';
import { expenses } from '@/data/expenses';

export default function HomeScreen() {
  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">SpendWise</Text>
        <Text style={styles.subtitle}>Your spending overview</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Spending</Text>
        <Text style={styles.totalAmount}>{totalSpending.toFixed(2)} KM</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Recent Expenses
        </Text>
        <Text style={styles.expenseCount}>{expenses.length} expenses</Text>
      </View>

      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
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
    gap: 12,
    paddingBottom: 32,
  },
  header: {
    gap: 4,
    paddingVertical: 8,
  },
  title: {
    color: '#262626',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#737373',
    fontSize: 15,
  },
  totalCard: {
    backgroundColor: '#292929',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  sectionTitle: {
    color: '#262626',
    fontSize: 20,
    fontWeight: '700',
    flexShrink: 1,
  },
  expenseCount: {
    color: '#737373',
    fontSize: 14,
  },
});
