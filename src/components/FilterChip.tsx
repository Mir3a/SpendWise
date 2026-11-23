import { Pressable, StyleSheet, Text } from 'react-native';

import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: selected ? theme.primary : theme.card, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: selected ? theme.onPrimary : theme.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: FontSize.small, fontWeight: '600' },
  pressed: { opacity: 0.6 },
});
