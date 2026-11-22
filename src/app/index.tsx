import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EmptyState from '@/components/EmptyState';
import ExpenseCard from '@/components/ExpenseCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchExpenses } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { Expense } from '@/types';

type LoadStatus = 'loading' | 'error' | 'ready';

function ExpenseSeparator() {
  return <View style={styles.separator} />;
}

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [hasMounted, setHasMounted] = useState(Platform.OS !== 'web');
  const [contentWidth, setContentWidth] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [attempt, setAttempt] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const refreshInFlight = useRef(false);
  const isScreenMounted = useRef(false);

  useEffect(() => {
    isScreenMounted.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydration requires a post-mount layout pass.
    setHasMounted(true);

    return () => {
      isScreenMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadExpenses() {
      try {
        const result = await fetchExpenses();
        if (ignore) return;

        setExpenses(result);
        setStatus('ready');
      } catch (error) {
        if (ignore) return;

        setErrorMessage(
          error instanceof Error && error.message ? error.message : 'Could not load expenses'
        );
        setStatus('error');
      }
    }

    void loadExpenses();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  async function refresh() {
    // A ref blocks repeated pulls even before the refreshing state re-renders.
    if (!isScreenMounted.current || refreshInFlight.current) return;

    refreshInFlight.current = true;
    setRefreshing(true);

    try {
      const updatedExpenses = await fetchExpenses();
      if (isScreenMounted.current) setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Could not refresh expenses', error);
    } finally {
      refreshInFlight.current = false;
      if (isScreenMounted.current) setRefreshing(false);
    }
  }

  // Keep the server and first browser render identical before using viewport dimensions.
  const columns = !hasMounted ? 1 : width >= 900 ? 3 : width >= 600 ? 2 : 1;
  // Measure inside the list padding to account for a web scrollbar's width.
  const availableWidth = contentWidth ?? Math.max(0, width - 2 * Spacing.md);
  const cardWidth = !hasMounted
    ? '100%'
    : Math.max(0, (availableWidth - (columns - 1) * Spacing.md) / columns);
  const totalSpending = expenses.reduce((total, expense) => total + expense.amount, 0);
  const categoryCount = new Set(expenses.map(expense => expense.category)).size;
  const average = expenses.length ? totalSpending / expenses.length : 0;
  const summaries = [
    { label: 'Expenses', value: String(expenses.length) },
    { label: 'Average (KM)', value: average.toFixed(2) },
    { label: 'Categories', value: String(categoryCount) },
  ];

  if (status === 'loading') {
    return (
      <View
        style={[
          styles.screen,
          styles.stateContainer,
          { backgroundColor: theme.background, paddingBottom: Spacing.md + insets.bottom },
        ]}
        accessibilityState={{ busy: true }}
      >
        <ActivityIndicator size="large" color={theme.primary} accessibilityLabel="Loading expenses" />
        <Text style={[styles.statusText, { color: theme.muted }]}>Loading expenses...</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View
        style={[
          styles.screen,
          styles.stateContainer,
          { backgroundColor: theme.background, paddingBottom: Spacing.md + insets.bottom },
        ]}
      >
        <Text style={[styles.statusText, { color: theme.text }]} accessibilityRole="alert">
          {errorMessage}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setStatus('loading');
            setErrorMessage('');
            setAttempt(current => current + 1);
          }}
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.retryLabel, { color: theme.onPrimary }]}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      data={expenses}
      refreshing={refreshing}
      onRefresh={refresh}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.columns : undefined}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => <ExpenseCard expense={item} style={{ width: cardWidth }} />}
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: Spacing.md + insets.bottom }]}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View
          style={styles.dashboard}
          onLayout={({ nativeEvent }) => setContentWidth(nativeEvent.layout.width)}
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
        </View>
      }
      ListHeaderComponentStyle={styles.listHeader}
      ItemSeparatorComponent={ExpenseSeparator}
      ListEmptyComponent={
        <EmptyState title="No expenses yet" message="Your expenses will appear here." />
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  statusText: { fontSize: FontSize.body, textAlign: 'center' },
  retryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  retryLabel: { fontSize: FontSize.body, fontWeight: '700' },
  pressed: { opacity: 0.6 },
  content: { flexGrow: 1, padding: Spacing.md },
  dashboard: { gap: Spacing.md },
  listHeader: { marginBottom: Spacing.md },
  separator: { height: Spacing.md },
  columns: { gap: Spacing.md },
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
