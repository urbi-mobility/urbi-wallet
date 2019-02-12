import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { maxWidth, minWidth } from 'Urbi/molecules/buttons/ButtonCompactPrimary';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
  },
});

type DoubleChoiceProps = {
  left?: JSX.Element;
  right?: JSX.Element;
};

export class DoubleChoice extends React.PureComponent<DoubleChoiceProps> {
  private left: JSX.Element;
  private right: JSX.Element;

  constructor(props: DoubleChoiceProps) {
    super(props);
    const leftStyle = { flex: 1, marginRight: 10, maxWidth, minWidth };
    const rightStyle = { flex: 1, marginLeft: 10, maxWidth, minWidth };
    this.left = this.props.left ? (
      React.cloneElement(this.props.left, { style: leftStyle })
    ) : (
      <View style={leftStyle} />
    );
    this.right = this.props.right ? (
      React.cloneElement(this.props.right, { style: rightStyle })
    ) : (
      <View style={rightStyle} />
    );
  }

  render() {
    return (
      <View style={styles.Wrapper}>
        {this.left}
        {this.right}
      </View>
    );
  }
}

export default DoubleChoice;
