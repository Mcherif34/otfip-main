/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ActivityIndicator, Platform, StatusBar, Text, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationActions, DataActions } from '@/actions';
import * as Utils from '@/utils';
import { getInto, languageSelect } from '@/selectors';
import { BaseSetting, useTheme } from '@/config';
import { getAllAuthors } from '../services/authorService';
import { getAllDatas, getAllMetadatas } from '../services/datasetService';
import { getAllDocumentTypes, getAllDocumentVideos, getAllDocuments } from '../services/documentService';
import { getAllTags } from '../services/tagService';
import * as rootNavigation from './rootNavigation';
import { AllScreens } from './config';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainScreens = () => {
  return (
   <MainStack.Navigator
      initialRouteName={'Loading'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.keys(AllScreens).map((name) => {
        const { component, options } = AllScreens[name];
        return <MainStack.Screen key={name} name={name} component={component} options={options} />;
      })}
    </MainStack.Navigator>
  );
};

const Navigator = () => {
  // Check display intro screen
  const intro = useSelector(getInto);
  // const intro = true;
  const { theme } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const language = useSelector(languageSelect);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Config status bar
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [isDarkMode]);

  useEffect(() => {
    const onProcess = async () => {
      
        // Get current language of device
        const languageCode = language ?? BaseSetting.defaultLanguage;
        // console.warn("Language code:", languageCode);
        dispatch(ApplicationActions.onChangeLanguage(languageCode));
        // Config language for app
        // console.warn("Configuring language for app");
        await i18n.use(initReactI18next).init({
          resources: BaseSetting.resourcesLanguage,
          lng: languageCode,
          fallbackLng: languageCode,
          compatibilityJSON: 'v3',
        });
        // console.warn("Language configured");
        setLoading(false);
        Utils.enableExperimental();
        // console.warn("End onProcess");
    };
    onProcess();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          // fetchDataOfType(getAllCollections, DataActions.setCollections),
          // fetchDataOfType(getAllAnnouncement, DataActions.setAnnouncements),
          // fetchDataOfType(getAllDatasets, DataActions.setDatasets),
          fetchDataOfType(getAllDocuments, DataActions.setDocuments),
          // fetchDataOfType(getAllNews, DataActions.setNews),
          fetchDataOfType(getAllTags, DataActions.setTags),
          fetchDataOfType(getAllDatas, DataActions.setDatas),
          // fetchDataOfType(getAllAttributes, DataActions.setAttributes),
          fetchDataOfType(getAllMetadatas, DataActions.setMetadatas),
          fetchDataOfType(getAllDocumentTypes, DataActions.setDocumentType),
          fetchDataOfType(getAllDocumentVideos, DataActions.setDocumentVideo),
          fetchDataOfType(getAllAuthors, DataActions.setAuthor),
          // fetchDataOfType(getAllPublicationType, DataActions.setPublication),
        ]);

        setLoading(false); // Marquer le chargement comme terminé
      } catch (error) {
        console.error('Error when fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  // Fonction générique pour charger les données et les envoyer à l'action Redux
  const fetchDataOfType = async (getDataFunction, dispatchAction) => {
    try {
      const data = await getDataFunction();
      if (data && data.length) {
         dispatch(dispatchAction(data));
        return data;
      } else {
        console.warn('Data is undefined or has no length:', data);
        return null;
      }
    } catch (error) {
      console.error('Error when fetching data:', error.message);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };


  // useEffect(() => {
  //   getAllCollections()
  //     .then((data) => {
  //       dispatch(DataActions.setCollections(data));
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch collections data', error);
  //     });

  //     getAllAnnouncement()
  //       .then((data) => {
  //         dispatch(DataActions.setAnnouncements(data));
  //       })
  //       .catch((error) => {
  //         console.error('Error when fetch announcements data', error);
  //       });

  //   getAllDatasets()
  //     .then((data) => {
  //       dispatch(DataActions.setDatasets(data));
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch dataset data', error);
  //     });

  //   getAllDocuments()
  //     .then((data) => {
  //       dispatch(DataActions.setDocuments(data));
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch document data', error);
  //     });

  //   getAllNews()
  //     .then((data) => {
  //       dispatch(DataActions.setNews(data));
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch news data', error);
  //     });

  //   getAllTags()
  //     .then((data) => {
  //       dispatch(DataActions.setTags(data));
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch tags data', error);
  //     });

  //   getAllDatas()
  //     .then((data) => {
  //       dispatch(DataActions.setDatas(data)); 
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch datas data', error);
  //     });

  //   getAllAttributes()
  //     .then((data) => {
  //       dispatch(DataActions.setAttributes(data)); 
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch attributes data', error);
  //     });

  //   getAllMetadatas()
  //     .then((data) => {
  //       dispatch(DataActions.setMetadatas(data)); 
  //     })
  //     .catch((error) => {
  //       console.error('Error when fetch metadatas data', error);
  //     });

  // }, [dispatch]);



  const goToApp = (name) => {
    rootNavigation.navigate(name);
  };

  useEffect(() => {
    if (!loading) {
      rootNavigation.dispatch(StackActions.replace(intro ? 'SliderIntro' : 'NewsMenu'));
    }
  }, [loading]);

  return (
    <>
    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    ) : (
    // Votre contenu une fois que toutes les données sont chargées
    // Use the font with the fontFamily property after loading
    <View style={{ flex: 1, position: 'relative' }}>
      <NavigationContainer theme={theme} ref={rootNavigation.navigationRef}>
        <RootStack.Navigator
          screenOptions={{
            presentation: 'transparentModal',
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        >
          <RootStack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
          {/* {Object.keys(ModalScreens).map((name) => {
              const { component, options } = ModalScreens[name];
              return <RootStack.Screen key={name} name={name} component={component} options={options} />;
            })} */}
        </RootStack.Navigator>
      </NavigationContainer>
      {/* {!loading && <AssistiveTouch goToApp={goToApp} />} */}
    </View>
  )}
    
    </> );
};

export default Navigator;
