import React, { ReactElement, SFC } from 'react';
import { View } from 'react-native';
import ButtonAndLabel from 'Urbi/components/ButtonAndLabel';
import DoubleChoice from 'Urbi/components/DoubleChoice';
import ListItemSwitch from 'Urbi/components/ListItemSwitch';
import ButtonCompactDefault from 'Urbi/molecules/buttons/ButtonCompactDefault';
import IconButtonSecondary from 'Urbi/molecules/buttons/IconButtonSecondary';
import { IconAndLabel } from 'Urbi/molecules/content/IconAndLabel';
import { providers as providersConf } from 'Urbi/redux/config/reducer';
import { ProviderType, providerTypeNames } from 'Urbi/redux/config/types';
import { ProvidersEnabledByType } from 'Urbi/redux/settings/types';
import { onPress as showAlert } from 'Urbi/utils/functions';
import { iconsProviders } from 'Urbi/utils/images';

export interface ServiceItem {
  key: string;
  providerInfoAndToggle: ReactElement<typeof ListItemSwitch>;
  providerActions?: ReactElement<typeof ButtonAndLabel> | ReactElement<typeof DoubleChoice>;
}

const onIconPress = showAlert('Not there yet');

const createListItem = (
  providersEnabled: ProvidersEnabledByType,
  p: string,
  toggleProvider: (v: boolean) => any
) => {
  const conf = providersConf[p];
  return {
    content: <IconAndLabel image={iconsProviders[`ic_${p}`]} label={conf.name || p} />,
    onSwitchToggle: toggleProvider,
    enabled: providersEnabled[conf.type][p],
    secondaryAction: <IconButtonSecondary label="info_outline" onPress={onIconPress} />,
  };
};

const createSecondRow = (p: string, onPress: () => any) => {
  const conf = providersConf[p];
  if (!conf.canLogin) return undefined;
  return <DoubleChoice left={<ButtonCompactDefault label="login" onPress={onPress} />} />;
};

export const groupBySection = (
  providersEnabled: ProvidersEnabledByType,
  toggleProvider: (providerId: string) => (v: boolean) => any,
  onButtonPress: (providerId: string) => () => any
) =>
  [ProviderType.free_floating, ProviderType.scooter, ProviderType.bike]
    .map((t) => ({
      title: providerTypeNames[t],
      data: Object.keys(providersEnabled[t])
        .map((p) => ({
          key: p,
          providerInfoAndToggle: (
            <ListItemSwitch {...createListItem(providersEnabled, p, toggleProvider(p))} />
          ),
          providerActions: createSecondRow(p, onButtonPress(p)),
        }))
        .sort(
          (i1: { key: string }, i2: { key: string }) =>
            i1.key > i2.key ? 1 : i1.key < i2.key ? -1 : 0
        ),
    }))
    .filter((e) => e.data.length);

const ListItemService = (item: ServiceItem) => (
  <View>
    {item.providerInfoAndToggle}
    {item.providerActions}
  </View>
);

export default ListItemService;
