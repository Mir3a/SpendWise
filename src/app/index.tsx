import { ScrollView, Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExpenseCard from '@/components/ExpenseCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { expenses } from '@/data/expenses';
import { useTheme } from '@/hooks/use-theme';
import type { ExpenseCategory } from '@/types';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;
  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
  const categories = expenses.reduce(
    (unique, expense) => unique.add(expense.category),
    new Set<ExpenseCategory>(),
  );
  const average = expenses.length ? totalSpending / expenses.length : 0;
  const summaries = [
    { label: 'Expenses', value: String(expenses.length) },
    { label: 'Average (KM)', value: average.toFixed(2) },
    { label: 'Categories', value: String(categories.size) },
  ];

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: Spacing.md + insets.bottom }]}
      contentInsetAdjustmentBehavior="automatic"
    >
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

      <View style={styles.grid}>
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: Spacing.md, gap: Spacing.md },
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
  summaryRow: { flexDirection: 'row', gap: Spacing.sm },
  summaryBox: {
    flex: 1,
    minWidth: 0,
    padding: Spacing.sm,
    gap: Spacing.xs,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  summaryValue: { fontSize: FontSize.title, fontWeight: '700', textAlign: 'center' },
  summaryLabel: { fontSize: FontSize.small, textAlign: 'center' },
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: Spacing.md },
});
