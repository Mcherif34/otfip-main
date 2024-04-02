import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, I18nManager, ScrollView, Share, TouchableOpacity, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeListData, HomePopularData } from '@/data';
import {
  CardSlide,
  Header,
  Icon,
  Image,
  NewsList,
  SafeAreaView,
  Tag,
  Text,
  PlaceholderLine,
  Placeholder,
} from '@/components';
import { BaseColor, BaseStyle, useTheme, Images } from '@/config';
import * as Utils from '@/utils';
import { getAnnoucements, getDocuments, getNews, getTags } from '@/selectors';
import { DataActions } from '@/actions';
import styles from './styles';

const facilitiesInit = [
  { id: '1', icon: 'wifi', name: 'News', checked: true },
  { id: '2', icon: 'bath', name: 'Impeachment' },
  { id: '3', icon: 'paw', name: 'West Bank' },
  { id: '4', icon: 'bus', name: 'Donald Trump' },
  { id: '5', icon: 'cart-plus', name: 'Corona Virus' },
  { id: '6', icon: 'clock', name: 'White House' },
];

const NPostDetail = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const itemData = route?.params?.item;
  const [loading, setLoading] = useState(true);
  const [popular] = useState(HomePopularData);
  const [list] = useState(HomeListData);
  const [facilities] = useState(facilitiesInit);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const { image, title, date, content } = itemData;
  const tags = useSelector(getTags);
  const documents = useSelector(getDocuments);
  const document = documents.find((doc) => doc.id === itemData.documentId);
  const announcements = useSelector(getAnnoucements);
  const similarAnn = announcements.filter((ann) => ann.id !== itemData.id);
  const news = useSelector(getNews);
  const similarNews = news.filter((sn) => sn.id !== itemData.id);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPostDetail = (item) => () => {
    navigation.push('NPostDetail', { item: item });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: '#',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const saveFavoris = async (item) => {
    try {
      let favoris = JSON.parse(await AsyncStorage.getItem('favoris')) || [];

      const existingIndex = favoris.findIndex((fav) => fav.id === item.id);

      if (existingIndex !== -1) {
        // Si l'élément existe déjà, le retirer du tableau
        favoris.splice(existingIndex, 1);
      } else {
        // Ajouter l'élément au tableau
        favoris.push(item);
      }
      // Sauvegarder le tableau mis à jour
      await AsyncStorage.setItem('favoris', JSON.stringify(favoris)).then(() => {
        // Afficher une alerte
        dispatch(DataActions.setFavourite(favoris));
        Alert.alert('Ajout aux favoris', "L'élément a été ajouté aux favoris.");
      });
    } catch (error) {
      console.error('Error saving favoris:', error);
    }
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.primary],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{ padding: 20 }}>
          {holders.map((item, index) => (
            <PlaceholderLine key={index} width={100} />
          ))}
        </View>
      </Placeholder>
    );
  };

  const renderContent = () => {
    return (
      <Fragment>
        <View style={styles.contentDescription}>
          <Text
            body2
            style={{
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}
            numberOfLines={100}
          >
            {itemData.description}
          </Text>
        </View>
        <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          {t('tags').toUpperCase()}
        </Text>
        <View style={styles.wrapContent}>
          {tags.map((item) => {
            return (
              <Tag
                status
                key={item.id}
                style={{
                  marginTop: 10,
                  marginRight: 10,
                  paddingHorizontal: 10,
                }}
              >
                {item.name}
              </Tag>
            );
          })}
        </View>
        <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {t('related_announcements').toUpperCase()}
        </Text>
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          {itemData.announcement === 1
            ? similarAnn.map((item, index) => (
                <NewsList
                  key={index.toString()}
                  // image={item?.image ? item.image : Images.docIcon}
                  imageUrl={item?.image}
                  date={item.createdDate}
                  title={item.name.toUpperCase()}
                  subtitle="test"
                  author={item.authorName}
                  style={{
                    marginBottom: index === list.length - 1 ? 0 : 20,
                  }}
                  onPress={goPostDetail(item)}
                />
              ))
            : similarNews.map((item, index) => (
                <NewsList
                  key={index.toString()}
                  image={item?.image ? item.image : Images.docIcon}
                  imageUrl={item?.image}
                  date={item.createdDate}
                  title={item.name.toUpperCase()}
                  subtitle="test"
                  author={item.authorName}
                  style={{
                    marginBottom: index === list.length - 1 ? 0 : 20,
                  }}
                  onPress={goPostDetail(item)}
                />
              ))}
        </View>
        <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {t('plus_news').toUpperCase()}
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {news.map((item, index) => (
            <CardSlide
              key={index.toString()}
              loading={loading}
              onPress={goPostDetail(item)}
              style={{
                marginRight: index === HomePopularData.length - 1 ? 0 : 15,
              }}
              imageUri={item?.image}
              date={item?.description?.slice(0, 90) + '...'}
              title={item.name.toUpperCase()}
              collection={item.collectionName}
            />
          ))}
        </ScrollView>
      </Fragment>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{ top: 'always', bottom: 'always' }}>
        <Header title={itemData.name.toUpperCase()} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: 230 - heightHeader }} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text medium caption1 grayColor>
              {itemData.createdDate}
            </Text>
            <Text title2 semibold style={{ marginVertical: 10 }}>
              {itemData.name.toUpperCase()}
            </Text>

            <View style={styles.lineSpace}>
              <View>
                <TouchableOpacity
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}
                  onPress={() => navigation.navigate('Review')}
                >
                  {/* <Tag rateSmall style={{ marginRight: 5 }} onPress={() => navigation.navigate('Review')}>
                   609 
                  </Tag> */}
                  {document && (
                    <>
                      <Icon name="download" color={BaseColor.primaryColor} size={18} />
                      <Text caption3 grayColor style={{ marginLeft: 5 }}>
                        Téléchargements :
                      </Text>
                      <Text headline grayColor style={{ marginLeft: 5 }}>
                        {document.downloadNumber}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
      >
        {itemData?.image ? (
          <Image source={{ uri: itemData.image }} style={{ height: '100%', width: '100%' }} />
        ) : (
          <Image source={Images.main_doc} style={{ height: '100%', width: '100%' }} />
        )}
        <TouchableOpacity
          style={[styles.viewIcon, { backgroundColor: colors.primaryLight }]}
          onPress={() => saveFavoris(itemData)}
        >
          <Icon solid name="bookmark" size={20} color={BaseColor.whiteColor} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.headerStyle, { position: 'absolute' }]}>
        <SafeAreaView style={{ width: '100%' }} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default NPostDetail;
