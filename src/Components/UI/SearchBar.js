import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

const SearchBar = ({ value, onChangeText, placeholder = 'Search...' }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: theme.colors.cardGlass, borderColor: theme.colors.border, borderRadius: theme.radii.m },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        style={[styles.input, { color: theme.colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 },
  input: { fontSize: 16 },
});

export default SearchBar;
