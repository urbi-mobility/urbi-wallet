import React, { ReactElement } from 'react';
import { ImageRequireSource, ScrollView, StyleSheet, Text, View } from 'react-native';
import { filterButtons } from 'Urbi/components/bottomPanel/DefaultContent';
import ButtonAndLabel from 'Urbi/components/ButtonAndLabel';
import { DoubleChoice } from 'Urbi/components/DoubleChoice';
import { FilterGroup } from 'Urbi/components/FilterGroup';
import IconGroup from 'Urbi/components/IconGroup';
import ListItem from 'Urbi/components/ListItem';
import ListItemCompact from 'Urbi/components/ListItemCompact';
import ListItemDouble from 'Urbi/components/ListItemDouble';
import ListItemTable from 'Urbi/components/ListItemTable';
import SelectionHeader from 'Urbi/components/SelectionHeader';
import ButtonCompactDefault from 'Urbi/molecules/buttons/ButtonCompactDefault';
import ButtonCompactPrimary from 'Urbi/molecules/buttons/ButtonCompactPrimary';
import ButtonCompactSecondary from 'Urbi/molecules/buttons/ButtonCompactSecondary';
import ButtonDefault from 'Urbi/molecules/buttons/ButtonDefault';
import ButtonPrimary from 'Urbi/molecules/buttons/ButtonPrimary';
import ButtonSecondary from 'Urbi/molecules/buttons/ButtonSecondary';
import FilterButtonCategory from 'Urbi/molecules/buttons/filterButtons/FilterButtonCategory';
import FilterButtonSettings from 'Urbi/molecules/buttons/filterButtons/FilterButtonSettings';
import ImageButton from 'Urbi/molecules/buttons/filterButtons/ImageButton';
import IconButtonCompactDefault from 'Urbi/molecules/buttons/IconButtonCompactDefault';
import IconButtonCompactPrimary from 'Urbi/molecules/buttons/IconButtonCompactPrimary';
import IconButtonCompactSecondary from 'Urbi/molecules/buttons/IconButtonCompactSecondary';
import IconButtonDefault from 'Urbi/molecules/buttons/IconButtonDefault';
import IconButtonPrimary from 'Urbi/molecules/buttons/IconButtonPrimary';
import IconButtonSecondary from 'Urbi/molecules/buttons/IconButtonSecondary';
import Link from 'Urbi/molecules/buttons/Link';
import LinkCompact from 'Urbi/molecules/buttons/LinkCompact';
import CategoryAndLabel from 'Urbi/molecules/content/CategoryAndLabel';
import DoubleLabel from 'Urbi/molecules/content/DoubleLabel';
import IconAndDoubleLabel from 'Urbi/molecules/content/IconAndDoubleLabel';
import IconAndLabel from 'Urbi/molecules/content/IconAndLabel';
import Label from 'Urbi/molecules/content/Label';
import LabelTitle from 'Urbi/molecules/content/LabelTitle';
import EndDoubleLabel from 'Urbi/molecules/end/EndDoubleLabel';
import EndDoubleLabelAndIcon from 'Urbi/molecules/end/EndDoubleLabelAndIcon';
import EndLabel from 'Urbi/molecules/end/EndLabel';
import EndLabelAndIcon from 'Urbi/molecules/end/EndLabelAndIcon';
import BikeImg from 'Urbi/molecules/selection/BikeImg';
import Selection from 'Urbi/molecules/selection/Content';
import StationImg from 'Urbi/molecules/selection/StationImg';
import VehicleImg from 'Urbi/molecules/selection/VehicleImg';
import CenteredLabel from 'Urbi/molecules/text/CenteredLabel';
import { ProviderType } from 'Urbi/redux/config/types';
import { defaultState as vehiclesDefaultState } from 'Urbi/redux/vehicles/reducer';
import { colors } from 'Urbi/utils/colors';
import { onPress as onButtonPress, showAlert } from 'Urbi/utils/functions';
import { iconsProviders, vehicles } from 'Urbi/utils/images';
import { textStyle as makeTextStyle } from 'Urbi/utils/textStyles';

const styles = StyleSheet.create({
  Row: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 16,
  },
  Component: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  Text: { ...makeTextStyle('body', colors.secondary), textAlign: 'center', padding: 6 },
  Label: { backgroundColor: '#eee', flex: 1, alignSelf: 'stretch' },
});

const renderComponent = (name: string, component: JSX.Element) => (
  <View style={styles.Row}>
    <View style={styles.Component}>{component}</View>
    <View style={styles.Label}>
      <Text style={styles.Text}>{name}</Text>
    </View>
  </View>
);

const onPress = onButtonPress(
  'Pikachu I choose you!',
  "Hey we're on iOS!",
  'This would be a Toast message if we were on Android, but...'
);

const categoryFilters = filterButtons({
  byCategory: { bike: true, public_transport: true },
  byExtras: vehiclesDefaultState.filters.byExtras,
});

const onFilterPress = (id: string, active: boolean) => {
  categoryFilters.find((f) => f.id === id)!.active = active;
  showAlert(`'${id}' is now ${active ? 'active' : 'inactive'}`, "Look at me, I'm the Toast now");
};

const onImageButtonPress = (id: string, active: boolean) =>
  showAlert(`'${id}' is now ${active ? 'active' : 'inactive'}`);

const imageButton = (id: string, image: ImageRequireSource) => (
  <ImageButton id={id} image={image} setActive={onImageButtonPress} active />
);

const iconGroupIcons = [
  imageButton('drivenow', iconsProviders.ic_drivenow),
  imageButton('car2go', iconsProviders.ic_car2go),
  imageButton('bluemove', iconsProviders.ic_bluemove),
  imageButton('cooltra', iconsProviders.ic_cooltra),
  imageButton('coup', iconsProviders.ic_coup),
  imageButton('driveby', iconsProviders.ic_driveby),
  imageButton('adduma', iconsProviders.ic_adduma),
  imageButton('emov', iconsProviders.ic_emov),
  imageButton('mimoto', iconsProviders.ic_mimoto),
  imageButton('mo2drive', iconsProviders.ic_mo2drive),
  imageButton('muving', iconsProviders.ic_muving),
  imageButton('sco2t', iconsProviders.ic_sco2t),
  imageButton('scoome', iconsProviders.ic_scoome),
  imageButton('ofo', iconsProviders.ic_ofo),
  imageButton('obike', iconsProviders.ic_obike),
];

const longTitle =
  "Hello, I'm an incredibly long title which should be trimmed at some point. " +
  'However, I should be able to span at least 2 lines before that happens.';

const longSubtitle =
  'Subtitle goes here, and is also incredibly long. It should also take up to 2 lines, ' +
  'but never more than that. You should see an ellipsis at the right, right where the ' +
  'text is cut';

const renderSelectionHeader = (
  title: string,
  body: string,
  footer: string,
  image: ReactElement<typeof VehicleImg> | ReactElement<typeof BikeImg>
) => {
  const selection = (
    <Selection
      title={title}
      body={body}
      footer={footer}
      link={<LinkCompact text="info" onPress={onPress} uppercase />}
    />
  );

  return renderComponent('SelectionHeader', <SelectionHeader content={selection} img={image} />);
};

// tslint:disable:jsx-no-multiline-js
const DesignShowcase = () => (
  <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
    {renderComponent('IconGroup', <IconGroup icons={iconGroupIcons.slice(0, 10)} />)}
    {renderComponent('IconGroup (more icons)', <IconGroup icons={iconGroupIcons} />)}
    {renderComponent('IconGroup (fewer icons)', <IconGroup icons={iconGroupIcons.slice(0, 5)} />)}
    {renderComponent('ButtonPrimary', <ButtonPrimary label="test" onPress={onPress} />)}
    {renderComponent(
      'ButtonPrimary (disabled)',
      <ButtonPrimary label="test" onPress={onPress} disabled />
    )}
    {renderComponent(
      'ButtonCompactPrimary',
      <ButtonCompactPrimary label="test" onPress={onPress} />
    )}
    {renderComponent(
      'ButtonCompactPrimary (disabled)',
      <ButtonCompactPrimary label="test" onPress={onPress} disabled />
    )}
    {renderComponent('ButtonDefault', <ButtonDefault label="test" onPress={onPress} />)}
    {renderComponent(
      'ButtonDefault (disabled)',
      <ButtonDefault label="test" onPress={onPress} disabled />
    )}
    {renderComponent(
      'ButtonCompactDefault',
      <ButtonCompactDefault label="test" onPress={onPress} />
    )}
    {renderComponent(
      'ButtonCompactDefault (disabled)',
      <ButtonCompactDefault label="test" onPress={onPress} disabled />
    )}
    {renderComponent('ButtonSecondary', <ButtonSecondary label="test" onPress={onPress} />)}
    {renderComponent(
      'ButtonCompactSecondary',
      <ButtonCompactSecondary label="test" onPress={onPress} />
    )}
    {renderComponent('CenteredLabel', <CenteredLabel text="ONE LINE" />)}
    {renderComponent(
      'CenteredLabel (success)',
      <CenteredLabel text="ONE LINE" color={colors.success} />
    )}
    {renderComponent(
      'CenteredLabel (long)',
      <CenteredLabel text="One very long line that should be centered and cropped" />
    )}
    {renderComponent('Label', <Label text="Hello, I'm a title" />)}
    {renderComponent(
      'Label (long)',
      <Label text="Hello, I'm an incredibly long title, and I should be trimmed at some point" />
    )}
    {renderComponent('LabelTitle', <LabelTitle text="Hello, I'm a title" />)}
    {renderComponent('LabelTitle (long)', <LabelTitle text={longTitle} />)}
    {renderComponent(
      'DoubleLabel',
      <DoubleLabel label="Hello, I'm a title" subtitle="Subtitle goes here" />
    )}
    {renderComponent(
      'DoubleLabel (long)',
      <DoubleLabel label={longTitle} subtitle={longSubtitle} />
    )}
    {renderComponent(
      'IconAndLabel (with icon)',
      <IconAndLabel icon="sentiment_satisfied" label="Hello, I'm a title" />
    )}
    {renderComponent(
      'IconAndLabel (with small icon)',
      <IconAndLabel icon="sentiment_satisfied" label="Hello, I'm a title" smallIcon />
    )}
    {renderComponent(
      'IconAndLabel',
      <IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />
    )}
    {renderComponent(
      'IconAndLabel (long)',
      <IconAndLabel image={iconsProviders.ic_car2go} label={longTitle} />
    )}
    {renderComponent(
      'IconAndDoubleLabel',
      <IconAndDoubleLabel
        icon={iconsProviders.ic_car2go}
        label="Hello, I'm a title"
        subtitle="Subtitle goes here"
      />
    )}
    {renderComponent(
      'IconAndDoubleLabel (long)',
      <IconAndDoubleLabel
        icon={iconsProviders.ic_car2go}
        label={`Via Giambellino 40, 20189\nMilano, Italy`}
        subtitle={`05/04/17 at 12:15 - 13 min, and if we need\nwe add something more here.`}
      />
    )}
    {renderComponent(
      'IconAndDoubleLabel (long)',
      <IconAndDoubleLabel
        icon={iconsProviders.ic_car2go}
        label={`Via Giambellino 40, 20189\nMilano, Italy, and a lot of other stuff that we want to show`}
        subtitle={`05/04/17 at 12:15 - 13 min, and if we need\nwe add something more here.`}
      />
    )}
    {renderComponent('CategoryAndLabel', <CategoryAndLabel category="micro" label="Title" />)}
    {renderComponent(
      'ListItem',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={<EndLabel label="label" />}
      />
    )}
    {renderComponent(
      'ListItem (with long EndLabel)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={<EndLabel label="long, long, long, long, long label" />}
      />
    )}
    {renderComponent(
      'ListItem (with EndDoubleLabel)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={<EndDoubleLabel label="label" subtitle="label" />}
      />
    )}
    {renderComponent(
      'ListItem (with long EndDoubleLabel)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={
          <EndDoubleLabel
            label="hello, I'm a very long label"
            subtitle="very long subtitle label"
          />
        }
      />
    )}
    {renderComponent(
      'ListItem (with EndLabelAndIcon)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={<EndLabelAndIcon label="label" icon={iconsProviders.ic_car2go} />}
      />
    )}
    {renderComponent(
      'ListItem (with long EndLabelAndIcon)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={
          <EndLabelAndIcon label="hello, I'm a very long label" icon={iconsProviders.ic_car2go} />
        }
      />
    )}
    {renderComponent(
      'ListItem (with EndDoubleLabelAndIcon)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={
          <EndDoubleLabelAndIcon
            label="label"
            subtitle="subtitle"
            icon={iconsProviders.ic_car2go}
          />
        }
      />
    )}
    {renderComponent(
      'ListItem (with long EndDoubleLabelAndIcon)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        end={
          <EndDoubleLabelAndIcon
            label="hello, I'm a very long label"
            subtitle="and I'm an even longer subtitle"
            icon={iconsProviders.ic_car2go}
          />
        }
      />
    )}
    {renderComponent(
      'ListItem (with action)',
      <ListItem
        content={<IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" />}
        icon={iconsProviders.ic_car2go}
      />
    )}
    {renderComponent(
      'ListItemCompact',
      <ListItemCompact
        content={
          <IconAndLabel image={iconsProviders.ic_car2go} label="Hello, I'm a title" smallIcon />
        }
        end={<EndLabel label="label" />}
      />
    )}
    {renderComponent(
      'ListItemDouble',
      <ListItemDouble content={<DoubleLabel label="Hello, I'm a title" subtitle="Body" />} />
    )}
    {renderComponent(
      'ListItemDouble (w/IconAndDoubleLabel)',
      <ListItemDouble
        content={
          <IconAndDoubleLabel
            icon={iconsProviders.ic_car2go}
            label="Hello, I'm a title"
            subtitle="Body"
          />
        }
      />
    )}
    {renderComponent(
      'ListItemDouble (w/EndDoubleLabelAndIcon)',
      <ListItemDouble
        content={<DoubleLabel label="Hello, I'm a title" subtitle="Body" />}
        end={
          <EndDoubleLabelAndIcon
            label="hello, I'm a very long label"
            subtitle="and I'm an even longer subtitle"
            icon={iconsProviders.ic_car2go}
          />
        }
      />
    )}
    {renderComponent(
      'ListItemDouble (w/action)',
      <ListItemDouble
        content={
          <IconAndDoubleLabel
            icon={iconsProviders.ic_car2go}
            label="Hello, I'm a title"
            subtitle="Body"
          />
        }
        icon={iconsProviders.ic_car2go}
      />
    )}
    {renderComponent(
      'ButtonAndLabel',
      <ButtonAndLabel
        button={<ButtonCompactPrimary label="action" onPress={onPress} />}
        label={<CenteredLabel text="BodyBold" color={colors.success} />}
      />
    )}
    {renderComponent(
      'DoubleChoice',
      <DoubleChoice
        left={<ButtonCompactPrimary label="Action" onPress={onPress} />}
        right={<ButtonCompactDefault label="Action" onPress={onPress} />}
      />
    )}
    {renderComponent(
      'DoubleChoice (inverse)',
      <DoubleChoice
        left={<ButtonCompactDefault label="Action" onPress={onPress} />}
        right={<ButtonCompactPrimary label="Action" onPress={onPress} />}
      />
    )}
    {renderComponent(
      'DoubleChoice (default and secondary)',
      <DoubleChoice
        left={<ButtonCompactDefault label="Action" onPress={onPress} />}
        right={<ButtonCompactSecondary label="Action" onPress={onPress} />}
      />
    )}
    {renderComponent(
      'DoubleChoice (primary and secondary)',
      <DoubleChoice
        left={<ButtonCompactSecondary label="Action" onPress={onPress} />}
        right={<ButtonCompactPrimary label="Action" onPress={onPress} />}
      />
    )}
    {renderComponent(
      'DoubleChoice (primary only)',
      <DoubleChoice left={<ButtonCompactPrimary label="Action" onPress={onPress} />} />
    )}
    {renderComponent(
      'DoubleChoice (default only)',
      <DoubleChoice right={<ButtonCompactDefault label="Action" onPress={onPress} />} />
    )}
    {renderComponent('IconButtonPrimary', <IconButtonPrimary label="star" onPress={onPress} />)}
    {renderComponent(
      'IconButtonPrimary (disabled)',
      <IconButtonPrimary label="star" onPress={onPress} disabled />
    )}
    {renderComponent('IconButtonDefault', <IconButtonDefault label="star" onPress={onPress} />)}
    {renderComponent(
      'IconButtonDefault (disabled)',
      <IconButtonDefault label="star" onPress={onPress} disabled />
    )}
    {renderComponent('IconButtonSecondary', <IconButtonSecondary label="star" onPress={onPress} />)}
    {renderComponent(
      'IconButtonCompactPrimary',
      <IconButtonCompactPrimary label="star" onPress={onPress} />
    )}
    {renderComponent(
      'IconButtonCompactPrimary (disabled)',
      <IconButtonCompactPrimary label="star" onPress={onPress} disabled />
    )}
    {renderComponent(
      'IconButtonCompactDefault',
      <IconButtonCompactDefault label="star" onPress={onPress} />
    )}
    {renderComponent(
      'IconButtonCompactDefault (disabled)',
      <IconButtonCompactDefault label="star" onPress={onPress} disabled />
    )}
    {renderComponent(
      'IconButtonCompactSecondary',
      <IconButtonCompactSecondary label="star" onPress={onPress} />
    )}
    {renderComponent(
      'IconButtonCompactSecondary (disabled)',
      <IconButtonCompactSecondary label="star" onPress={onPress} disabled />
    )}
    {renderComponent(
      'FilterButtonCategory',
      <FilterButtonCategory
        icon="directions_car"
        id={ProviderType.free_floating}
        setActive={onFilterPress}
        active
      />
    )}
    {renderComponent('FilterButtonSettings', <FilterButtonSettings onClick={onPress} />)}
    {renderComponent(
      'FilterGroup',
      <FilterGroup
        filterButtons={categoryFilters}
        onFilterToggle={onFilterPress}
        onSettingsClicked={onPress}
      />
    )}
    {renderComponent(
      'ImageButton',
      <ImageButton
        id="drivenow"
        image={iconsProviders.ic_drivenow}
        setActive={onImageButtonPress}
        active
      />
    )}
    {renderComponent('Link', <Link text="info" onPress={onPress} uppercase />)}
    {renderComponent('LinkCompact', <LinkCompact text="info" onPress={onPress} uppercase />)}
    {renderComponent(
      'Selection (no link)',
      <Selection title="ProviderName" body="BMW Active Tourer Cabrio" footer="AB 123 CD" />
    )}
    {renderComponent(
      'Selection (with link)',
      <Selection
        title="ProviderName"
        body="BMW Active Tourer Cabrio"
        footer="AB 123 CD"
        link={<LinkCompact text="info" onPress={onPress} uppercase />}
      />
    )}
    {renderComponent('VehicleImg', <VehicleImg image={vehicles.ic_car2go_cla} />)}
    {renderComponent('VehicleImg', <VehicleImg image={vehicles.ic_muving_scooter} />)}
    {renderComponent(
      'BikeImg',
      <BikeImg image={vehicles.ic_bike} providerLogo={iconsProviders.ic_bikemi} />
    )}
    {renderComponent('StationImg', <StationImg providerLogo={iconsProviders.ic_bikemi} />)}
    {renderSelectionHeader(
      'car2go',
      'CLA',
      'B-GO1545',
      <VehicleImg image={vehicles.ic_car2go_cla} />
    )}
    {renderSelectionHeader(
      'ofo',
      'Bike with Low steps',
      'OMgoKa',
      <BikeImg image={vehicles.ic_bike} providerLogo={iconsProviders.ic_ofo} />
    )}
    {renderSelectionHeader(
      'Muving',
      'Muvi',
      '5273KBX',
      <VehicleImg image={vehicles.ic_muving_scooter} />
    )}
    {renderComponent(
      'ListItemTable',
      <ListItemTable columns={[<CategoryAndLabel key="k" category="micro" label="Title" />]} />
    )}
    {renderComponent(
      'ListItemTable (2 cols)',
      <ListItemTable
        columns={[
          <CategoryAndLabel key="k" category="micro" label="Title" />,
          <CategoryAndLabel key="k" category="micro" label="Title" />,
        ]}
      />
    )}
    {renderComponent(
      'ListItemTable (3 cols)',
      <ListItemTable
        columns={[
          <CategoryAndLabel key="k" category="micro" label="Title" />,
          <CategoryAndLabel key="k" category="micro" label="Title" />,
          <CategoryAndLabel key="k" category="micro" label="Title" />,
        ]}
      />
    )}
    {renderComponent(
      'ListItemTable (3 cols, 1 missing)',
      <ListItemTable
        columns={[
          <CategoryAndLabel key="k" category="micro" label="Title" />,
          <CategoryAndLabel key="k" category="micro" label="Title" />,
        ]}
        divideIn={3}
      />
    )}
  </ScrollView>
);

export default DesignShowcase;
