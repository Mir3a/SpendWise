import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Expense } from '@/types';

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const description = expense.description?.trim();
  const receiptPhotoUrl = expense.receiptPhotoUrl?.trim();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: Spacing.md + insets.bottom }]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.body}>
        <Image
          source={{ uri: expense.photoUrl }}
          style={[styles.image, { backgroundColor: theme.card }]}
          resizeMode="cover"
          accessibilityLabel={'Expense image for ' + expense.name}
        />
        <Text style={[styles.name, { color: theme.text }]} accessibilityRole="header">
          {expense.name}
        </Text>

        <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.muted }]}>Amount</Text>
            <Text style={[styles.value, styles.amount, { color: theme.text }]} selectable>
              {expense.amount.toFixed(2)} KM
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.muted }]}>Category</Text>
            <Text style={[styles.value, { color: theme.text }]} selectable>{expense.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.muted }]}>Date</Text>
            <Text style={[styles.value, { color: theme.text }]} selectable>{expense.date}</Text>
          </View>
          {description ? (
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.muted }]}>Description</Text>
              <Text style={[styles.value, { color: theme.text }]} selectable>{description}</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.muted }]}>Expense ID</Text>
            <Text style={[styles.value, styles.id, { color: theme.muted }]} selectable>
              {expense.id}
            </Text>
          </View>
        </View>

        {receiptPhotoUrl ? (
          <View style={styles.receiptSection}>
            <Text style={[styles.sectionTitle, { color: theme.text }]} accessibilityRole="header">
              Receipt
            </Text>
            <Image
              source={{ uri: receiptPhotoUrl }}
              style={[styles.receiptImage, { backgroundColor: theme.card }]}
              resizeMode="contain"
              accessibilityLabel={'Receipt for ' + expense.name}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: Spacing.md },
  body: { width: '100%', maxWidth: 600, alignSelf: 'center', gap: Spacing.lg },
  image: { width: '100%', aspectRatio: 16 / 9, borderRadius: Radius.md, borderCurve: 'continuous' },
  name: { fontSize: FontSize.hero, fontWeight: '700' },
  infoCard: { padding: Spacing.md, gap: Spacing.lg, borderRadius: Radius.md, borderCurve: 'continuous' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: Spacing.md },
  label: { fontSize: FontSize.small, maxWidth: '40%', flexShrink: 1 },
  value: { flex: 1, flexShrink: 1, minWidth: 0, fontSize: FontSize.body, textAlign: 'right' },
  amount: { fontSize: FontSize.hero, fontWeight: '700', fontVariant: ['tabular-nums'] },
  id: { fontSize: FontSize.small },
  receiptSection: { gap: Spacing.sm },
  sectionTitle: { fontSize: FontSize.title, fontWeight: '600' },
  receiptImage: { width: '100%', aspectRatio: 3 / 4, borderRadius: Radius.md, borderCurve: 'continuous' },
});
