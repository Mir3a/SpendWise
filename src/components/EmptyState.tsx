import { StyleSheet, Text, View } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyStateProps = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.receipt, { backgroundColor: theme.card, borderColor: theme.border }]}
      >
        <View style={[styles.receiptLine, { backgroundColor: theme.muted }]} />
        <View style={[styles.receiptLine, { backgroundColor: theme.muted }]} />
        <View style={[styles.receiptLine, styles.shortLine, { backgroundColor: theme.muted }]} />
      </View>
      <Text style={[styles.title, { color: theme.text }]} accessibilityRole="header">
        {title}
      </Text>
      <Text style={[styles.message, { color: theme.muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    padding: Spacing.lg,
  },
  receipt: {
    width: Spacing.xl,
    height: Spacing.xl + Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  receiptLine: { width: '100%', height: 2 },
  shortLine: { width: '60%' },
  title: { fontSize: FontSize.title, fontWeight: '700', textAlign: 'center' },
  message: { fontSize: FontSize.small, textAlign: 'center' },
});
