import React, { ReactElement } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import ImageButton, {
  size as imageButtonSize,
} from 'Urbi/molecules/buttons/filterButtons/ImageButton';
import { colors } from 'Urbi/utils/colors';

const minItemPadding = 12;
const minItemWidth = imageButtonSize + minItemPadding;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    height: 72,
    minHeight: 72,
    paddingTop: 12,
  } as ViewStyle,
  ScrollViewWrapper: {
    height: 44,
    maxHeight: 44,
  } as ViewStyle,
  ScrollView: {
    flex: 1,
  } as ViewStyle,
  Dots: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 4,
  } as ViewStyle,
  Dot: {
    height: 4,
    minHeight: 4,
    width: 4,
    borderRadius: 2,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: colors.ursula,
  } as ViewStyle,
  Filler: {
    flex: 1,
    height: imageButtonSize,
  } as ViewStyle,
});

type IconGroupProps = {
  icons: Array<ReactElement<typeof ImageButton>>;
};

type IconGroupState = {
  padding: number;
  pages: number;
  iconsPerPage: number;
  scrollViewWidth: number;
  selectedPage: number;
};

export class IconGroup extends React.PureComponent<IconGroupProps, IconGroupState> {
  constructor(props: IconGroupProps) {
    super(props);
    this.state = {
      padding: minItemPadding,
      pages: 1,
      iconsPerPage: 5,
      scrollViewWidth: 100,
      selectedPage: 0,
    };
    this.onLayout = this.onLayout.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
  }

  addFiller() {
    const { icons } = this.props;
    const { padding, iconsPerPage } = this.state;
    if (icons.length % iconsPerPage === 0) return null;
    const filler = [];
    for (let i = iconsPerPage - (icons.length % iconsPerPage); i > 1; i--) {
      filler.push(
        <View key={`filler-${i}`} style={[styles.Filler, { width: imageButtonSize + padding }]} />
      );
    }
    filler.push(<View key="filler-last" style={[styles.Filler, { width: imageButtonSize }]} />);
    return filler;
  }

  onLayout(e: LayoutChangeEvent) {
    const width = e.nativeEvent.layout.width;
    // the rightmost item needs no marginRight, try to be optimistic
    let perPage = Math.ceil(width / minItemWidth);
    // ...but check that they still fit
    if (perPage * minItemWidth - minItemPadding > width) {
      perPage = Math.floor(width / minItemWidth);
    }
    const paddingSpace = width - (perPage * minItemWidth - minItemPadding);
    const padding = minItemPadding + paddingSpace / perPage;
    this.setState({
      iconsPerPage: perPage,
      pages: Math.ceil(this.props.icons.length / perPage),
      scrollViewWidth: width,
      padding,
    });
  }

  wrapButtons() {
    return this.props.icons.map((icon, i) => (
      <View key={`icon-${i}`} style={{ marginRight: this.state.padding }}>
        {icon}
      </View>
    ));
  }

  showPagination() {
    if (this.state.pages > 1) {
      const pages = [];
      for (let i = 0; i < this.state.pages; i++) {
        const isSelected = i === this.state.selectedPage;
        const style = isSelected ? [styles.Dot, { backgroundColor: colors.primary }] : styles.Dot;
        pages.push(<View key={`dot-page-${i}`} style={style} />);
      }
      return <View style={styles.Dots}>{pages}</View>;
    }
    return null;
  }

  onScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    this.setState({
      selectedPage: Math.floor(e.nativeEvent.contentOffset.x / this.state.scrollViewWidth),
    });
  }

  render() {
    const snap = this.state.pages < 3;
    return (
      <View style={styles.Wrapper}>
        <View style={styles.ScrollViewWrapper}>
          <ScrollView
            style={styles.ScrollView}
            onLayout={this.onLayout}
            snapToAlignment={snap ? 'end' : undefined}
            snapToInterval={snap ? this.state.scrollViewWidth + this.state.padding : undefined}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={this.onScrollEnd}
            horizontal
          >
            {this.wrapButtons()}
            {this.addFiller()}
          </ScrollView>
        </View>
        {this.showPagination()}
      </View>
    );
  }
}

export default IconGroup;
