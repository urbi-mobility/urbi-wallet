import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import FilterButtonCategory from 'Urbi/molecules/buttons/filterButtons/FilterButtonCategory';
import FilterButtonSettings from 'Urbi/molecules/buttons/filterButtons/FilterButtonSettings';

type FilterButton = { id: string; icon: string; active?: boolean };

type FilterGroupProps = {
  filterButtons: FilterButton[];
  onFilterToggle: (id: string, active: boolean) => void;
  onSettingsClicked: () => void;
  style?: ViewStyle;
  managed?: boolean; // whether the state of filters is managed through props
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 12,
    height: 78,
    maxWidth: 410,
  } as ViewStyle,
});

export class FilterGroup extends React.PureComponent<FilterGroupProps> {
  createFilterButton(b: FilterButton, onToggle: (id: string, active: boolean) => void) {
    return (
      <FilterButtonCategory
        key={`filterButton-${b.id}`}
        id={b.id}
        icon={b.icon}
        active={b.active || false}
        setActive={onToggle}
        managed={this.props.managed}
      />
    );
  }

  render() {
    return (
      <View style={[styles.Wrapper, this.props.style]}>
        {this.props.filterButtons.map((b) => this.createFilterButton(b, this.props.onFilterToggle))}
        <FilterButtonSettings onClick={this.props.onSettingsClicked} />
      </View>
    );
  }
}

export default FilterGroup;
