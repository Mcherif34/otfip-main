import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { getFavourites } from '@/selectors';

export const tabBarIcon = ({ color, name }) => (
  <Image
    source={name}
    style={{
      width: 22,
      height: 22,
    }}
    color={color}
  />
);

export const tabBarIconHaveNoty = ({ color, name }) => {
  const favourites = useSelector(getFavourites);

  return (
    <View>
      {tabBarIcon({ color, name })}
      {favourites?.length !== 0 && (
        <View
          style={{
            borderWidth: 1,
            borderColor: BaseColor.whiteColor,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 20,
            height: 20,
            backgroundColor: 'red',
            top: -5,
            right: -12,
            borderRadius: 10,
          }}
        >
          <Text whiteColor caption2>
            {favourites?.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigatorMazi = ({ tabScreens = {} }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: BaseStyle.tabBar,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '800'          
        },
      }}
    >
      {Object.keys(tabScreens).map((name, index) => {
        const { options, component } = tabScreens[name];
        return (
          <BottomTab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              ...options,
              title: t(options.title),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};
