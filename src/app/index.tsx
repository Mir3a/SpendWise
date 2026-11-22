import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExpenseCard from '@/components/ExpenseCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { expenses } from '@/data/expenses';
import { useTheme } from '@/hooks/use-theme';

function ExpenseSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
  const categoryCount = new Set(expenses.map(expense => expense.category)).size;
  const average = expenses.length ? totalSpending / expenses.length : 0;
  const summaries = [
    { label: 'Expenses', value: String(expenses.length) },
    { label: 'Average (KM)', value: average.toFixed(2) },
    { label: 'Categories', value: String(categoryCount) },
  ];

  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => <ExpenseCard expense={item} style={styles.expenseCard} />}
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: Spacing.md + insets.bottom }]}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={styles.dashboard}>
          <View style={styles.header}>
            <Text style={[styles.subtitle, { color: theme.muted }]}>Your spending overview</Text>
          </View>

          <View style={[styles.totalCard, { backgroundColor: theme.primary }]}>
            <Text style={[styles.totalLabel, { color: theme.onPrimary }]}>Total Spending</Text>
            <Text style={[styles.totalAmount, { color: theme.onPrimary }]} selectable>
              {totalSpending.toFixed(2)} KM
            </Text>
          </View>

          <View style={styles.summaryRow}>
            {summaries.map(({ label, value }) => (
              <View
                key={label}
                style={[styles.summaryBox, { backgroundColor: theme.card, borderColor: theme.border }]}
              >
                <Text style={[styles.summaryValue, { color: theme.text }]}>{value}</Text>
                <Text style={[styles.summaryLabel, { color: theme.muted }]}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
              Recent Expenses
            </Text>
            <Text style={[styles.expenseCount, { color: theme.muted }]}>
              {expenses.length} expenses
            </Text>
          </View>
        </View>
      }
      ListHeaderComponentStyle={styles.listHeader}
      ItemSeparatorComponent={ExpenseSeparator}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: Spacing.md },
  dashboard: { gap: Spacing.md },
  listHeader: { marginBottom: Spacing.md },
  separator: { height: Spacing.md },
  expenseCard: { width: '100%' },
  header: { gap: Spacing.xs, paddingVertical: Spacing.sm },
  subtitle: { fontSize: FontSize.body },
  totalCard: {
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  totalLabel: { fontSize: FontSize.body },
  totalAmount: { fontSize: FontSize.hero, fontWeight: '700', fontVariant: ['tabular-nums'] },
  summaryRow: { flexDirection: 'row', gap: Spacing.sm, width: '100%' },
  summaryBox: {
    flex: 1,
    minWidth: 0,
    padding: Spacing.sm,
    gap: Spacing.xs,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryValue: { fontSize: FontSize.title, fontWeight: '700', textAlign: 'center', maxWidth: '100%' },
  summaryLabel: { fontSize: FontSize.small, textAlign: 'center', maxWidth: '100%' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  sectionTitle: { fontSize: FontSize.title, fontWeight: '700', flexShrink: 1 },
  expenseCount: { fontSize: FontSize.small },
});
