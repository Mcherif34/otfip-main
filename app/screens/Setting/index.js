import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { BaseStyle, useTheme, BaseColor } from '@/config';
import * as Utils from '@/utils';
import { getFavourites, getInto } from '@/selectors';
import { ApplicationActions } from '@/actions';
import { Header, SafeAreaView, Icon, Text } from '@/components';
import styles from './styles';

const { setIntro } = ApplicationActions;

const Item = ({ onPress, title, ComponentRight = null, iconName, iconBackground, isBorder = true }) => {
  const { colors } = useTheme();
  const styleItem = [
    styles.profileItem,
    {
      borderBottomColor: colors.border,
    },
  ];
  return (
    <TouchableOpacity style={styleItem} onPress={onPress} disabled={!onPress}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 5,
          backgroundColor: iconBackground,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}
      >
        <Icon size={20} name={iconName} color={BaseColor.whiteColor} />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderBottomWidth: isBorder ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: colors.border,
            paddingVertical: 15,
            justifyContent: 'center',
            height: 50,
            paddingRight: 15,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text body2>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>{ComponentRight}</View>
          {onPress && (
            <Icon name="angle-right" size={18} color={BaseColor.grayColor} style={{ marginLeft: 5 }} enableRTL={true} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Setting({ isShowHeader = true }) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const forceDark = useSelector((state) => state.application.force_dark);
  const font = useSelector((state) => state.application.font);
  const favourites = useSelector(getFavourites);

  const [reminders, setReminders] = useState(true);
  const dispatch = useDispatch();
  const intro = useSelector(getInto);
  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = (value) => {
    setReminders(value);
  };

  const darkOption = forceDark ? t('always_on') : forceDark !== null ? t('always_off') : t('dynamic_system');

  const onChangeIntro = () => {
    dispatch(setIntro(!intro));
  };

  const renderContent = () => {
    return (
      <View style={{ backgroundColor: colors.card, flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.contain]}>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 8,
            }}
          >
            <Item
              title={t('language').toUpperCase()}
              iconName="globe"
              iconBackground={BaseColor.primaryColor}
              onPress={() => {
                navigation.navigate('ChangeLanguage');
              }}
              ComponentRight={
                <Text body2 grayColor>
                  {Utils.languageFromCode(i18n.language)}
                </Text>
              }
            />
            {/* <Item
              title={t('theme')}
              iconName="palette"
              iconBackground={BaseColor.greenColor}
              onPress={() => {
                navigation.navigate('ThemeSetting');
              }}
              ComponentRight={
                <View
                  style={[
                    styles.themeIcon,
                    {
                      backgroundColor: colors.primary,
                      borderColor: colors.border,
                    },
                  ]}
                />
              }
            /> */}
            {/* <Item
              title={t('font')}
              iconName="font"
              iconBackground={BaseColor.accentColor}
              onPress={() => {
                navigation.navigate('SelectFontOption');
              }}
              ComponentRight={
                <Text body1 grayColor>
                  {font ?? t('default')}
                </Text>
              }
            /> */}

            <Item
              title={t('dark_theme').toUpperCase()}
              iconName="adjust"
              iconBackground={BaseColor.primaryColor}
              onPress={() => {
                navigation.navigate('SelectDarkOption');
              }}
              ComponentRight={
                <Text body2 grayColor>
                  {darkOption}
                </Text>
              }
            />
            {/* <Item
              title={t('notification').toUpperCase()}
              iconName="bell"
              iconBackground={BaseColor.primaryColor}
              contentStyle={{ paddingVertical: 10 }}
              ComponentRight={<Switch size={18} onValueChange={toggleSwitch} value={reminders} />}
            /> */}
            <Item
              title={t("Afficher l'écran d'introduction").toUpperCase()}
              iconName="teamspeak"
              iconBackground={BaseColor.primaryColor}
              contentStyle={{ paddingVertical: 10 }}
              ComponentRight={<Switch onValueChange={onChangeIntro} value={intro} />}
            />
            <Item
              title={t('favoris').toUpperCase()}
              iconName="bookmark"
              iconBackground={BaseColor.primaryColor}
              contentStyle={{ paddingVertical: 10 }}
              onPress={() => {
                navigation.navigate('NFavourite');
              }}
              ComponentRight={
                favourites?.length !== 0 && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: BaseColor.whiteColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 20,
                      height: 20,
                      backgroundColor: 'red',
                      borderRadius: 10,
                    }}
                  >
                    <Text whiteColor caption2>
                      {favourites?.length}
                    </Text>
                  </View>
                )
              }
            />
            {/* <Item
              isBorder={false}
              title={t('app_version')}
              iconName="vimeo-v"
              iconBackground={BaseColor.blueColor}
              ComponentRight={
                <Text body1 grayColor>
                  {BaseSetting.appVersion}
                </Text>
              }
            /> */}
          </View>
        </ScrollView>
      </View>
    );
  };

  if (!isShowHeader) {
    return renderContent();
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View style={BaseStyle.container}>
        <Header
          style={{ marginBottom: 20, borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}
          renderLeft={() => (
            <Text title1 bold style={{ fontSize: 22, fontWeight: '800' }}>
              {t('setting').toUpperCase()}
            </Text>
          )}
          title={''}
          styleLeft={{
            flex: 1,
          }}
          styleContentLeft={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 0,
            width: '100%',
          }}
          styleContentCenter={{
            flex: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          styleRight={{ flex: 0 }}
        />
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}
