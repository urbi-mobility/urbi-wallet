import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from 'Urbi/utils/colors';
import { registeredTextStyle } from 'Urbi/utils/textStyles';

type DebugOverlayProps = {
  lines: string[];
  show?: boolean;
};

const styles = StyleSheet.create({
  Overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 200,
    paddingLeft: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
  } as ViewStyle,
});

const overlayStyle = registeredTextStyle('micro', colors.ulisse);

const renderLine = (line: string, i: number) => (
  <Text key={`debug-text-${i}`} style={overlayStyle}>
    {line}
  </Text>
);

export const DebugOverlay = (props: DebugOverlayProps) => {
  if (props.show) {
    return <View style={styles.Overlay}>{props.lines.map((line, i) => renderLine(line, i))}</View>;
  }
  return null;
};

export default DebugOverlay;
