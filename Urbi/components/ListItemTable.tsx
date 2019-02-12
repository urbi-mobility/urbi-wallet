import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import CategoryAndLabel from 'Urbi/molecules/content/CategoryAndLabel';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 4, // 12 in zeplin, we add 8 to marginRight to columns
  } as ViewStyle,
  Column: {
    marginRight: 8,
  } as ViewStyle,
});

type ListItemTableProps = {
  columns: Array<ReactElement<typeof CategoryAndLabel>>;
  divideIn?: number; // set if > columns.length to force dividing the row in...
};

const mapColumns = (column: ReactElement<typeof CategoryAndLabel>, i: number) =>
  React.cloneElement(column as React.ReactElement<any>, { key: `col-${i}`, style: styles.Column });

const addEmptyColumns = (props: ListItemTableProps) => {
  const { columns, divideIn } = props;
  if (!divideIn || columns.length >= divideIn) return null;
  const cols = [];
  for (let i = 0; i < divideIn - columns.length; i++) {
    cols.push(<View key={`col-${columns.length + i}`} style={{ flex: 1 }} />);
  }
  return cols;
};

export const ListItemTable = (props: ListItemTableProps) => (
  <View style={styles.Wrapper}>
    {props.columns.map(mapColumns)}
    {addEmptyColumns(props)}
  </View>
);

export default ListItemTable;
