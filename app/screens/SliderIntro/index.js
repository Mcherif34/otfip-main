import { Fragment, useEffect } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BaseColor, Images } from '@/config';
import { parseHexTransparency } from '@/utils';
import { Icon, Text } from '@/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  buttonCircle: {
    backgroundColor: BaseColor.primaryColor,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  prevButtonCircle: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
});

const slides = [
  {
    key: 's0',
    text: 'DECOUVREZ UNE PLATEFORME DEDIEE AUX DONNEES RELATIVES AUX FINANCES PUBLIQUES',
    title: 'BIENVENUE !',
    icon: 'home',
    image: Images.data,
    backgroundColor: parseHexTransparency(BaseColor.pinkLightColor, 75),
  },
  {
    key: 's1',
    text: 'CONSULTER TOUTES LES RECETTES ET DEPENSES BUDGETAIRES DE L\'ETAT',
    title: 'BUDGET OUVERT',
    icon: 'wallet',
    image: Images.dataExploration,
    backgroundColor: parseHexTransparency(BaseColor.orangeColor, 75),
  },
  {
    key: 's2',
    title: 'SECTEUR PETROLIER ET MINIER',
    text: 'EN SAVOIR PLUS SUR CES SECTEURS ET LES REVENUS GENERES',
    icon: 'bitcoin',
    image: Images.dataTracking,
    backgroundColor: parseHexTransparency(BaseColor.pinkColor, 75),
  },
  {
    key: 's3',
    title: 'TEXTES OFFICIELS',
    text: 'NE RIEN MANQUER SUR LES TEXTES OFFICIELS CLASSES CHRONOLOGIQUEMENT',
    icon: 'shopping-cart',
    image: Images.dataAnalyse,
    backgroundColor: parseHexTransparency(BaseColor.blueColor, 75),
  },
  {
    key: 's4',
    title: 'PUBLICATIONS',
    text: 'RESTER INFORMES SUR NOS DERNIERES PUBLICATIONS',
    icon: 'newspaper',
    image: Images.dataReport,
    backgroundColor: parseHexTransparency(BaseColor.kashmir, 75),
  },
  {
    key: 's5',
    title: "C'EST PARTI !",
    text: "L'OBSERVATOIRE TCHADIEN DES FINANCES PUBLIQUES VOUS SOUHAITE LA BIENVENUE",
    icon: 'project-diagram',
    image: Images.dashboard,
    backgroundColor: parseHexTransparency(BaseColor.greenColor, 75),
  }
];

const SliderIntro = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent', true);
    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          alignItems: 'center',
          justifyContent: "space-around",
          paddingBottom:0,
          paddingHorizontal: 20,
        }}
      >
        <View></View>
        <View></View>
        <Image source={item.image} style={{ width: 300, height: 300 }} />
        {/* <Icon name={item.icon} color={BaseColor.whiteColor} size={200} /> */}
        <View style={{
          paddingTop: 0,
        }}>
          <Text darkPrimaryColor title1>
            {item.title}
          </Text>
          <Text darkPrimaryColor body1 light style={{ textAlign: 'left', marginTop: 6 }}>
            {item.text}
          </Text>
        </View>
        <View></View>
      </View>
    );
  };

  const onDone = () => {
    navigation.dispatch(StackActions.replace('NewsMenu'));
  };

  const onSkip = () => {
    navigation.dispatch(StackActions.replace('NewsMenu'));
  };

  const renderButton =
    (label = '') =>
    () => {
      return (
        <View style={styles.buttonCircle}>
          <Text footnote whiteColor>
            {label}
          </Text>
        </View>
      );
    };

  const renderSkipButton =
    (label = '') =>
    () => {
      return (
        <View style={styles.prevButtonCircle}>
          <Text footnote whiteColor>
            {label}
          </Text>
        </View>
      );
    };

  return (
    <Fragment>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        renderDoneButton={renderButton('COMMENCER')}
        renderNextButton={renderButton('SUIVANT')}
        renderSkipButton={renderSkipButton('PASSER')}
        activeDotStyle={{
          backgroundColor: BaseColor.primaryColor
        }}
      />
    </Fragment>
  );
};

export default SliderIntro;
