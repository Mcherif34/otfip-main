import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Animated, Platform, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryList, Header, Icon, NewsGrid, NewsList, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import { HomeChannelData, RecentListData } from '@/data';
import { getAnnoucements, getCollections, getDatasets, getNews } from '@/selectors';
import styles from './styles';

const searchHistoryInit = [
  { id: '1', keyword: 'Budget' },
  { id: '2', keyword: 'Open' },
  { id: '3', keyword: 'Note' },
  { id: '4', keyword: 'document' },
  // { id: '5', keyword: 'Liverpool' },
  // { id: '6', keyword: 'Super Bowl  2020 time' },
];

export const modes = {
  // square: 'square',
  bars: 'bars',
  thList: 'th-list',
  thLarge: 'th-large',
};

const NSearchHistory = (props) => {
  const { navigation, route } = props;
  const { keyword } = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState(searchHistoryInit);
  const [recentlyView] = useState(RecentListData);
  const [channels] = useState(HomeChannelData);
  const collections = useSelector(getCollections);
  const [collectionData, setCollectionData] = useState();
  const datasets = useSelector(getDatasets);
  const [datasetData, setDatasetData] = useState();
  const announcements = useSelector(getAnnoucements);
  const [annData, setAnnData] = useState();
  const news = useSelector(getNews);
  const [newsData, setNewsData] = useState();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [modeView, setModeView] = useState(modes.thLarge);

  const getHistory = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        // await AsyncStorage.setItem('history', searchHistoryInit);
        const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
        // setSearchHistory(history);
        setLoading(false);
      } catch (error) {
        console.error('Error getting history:', error);
        setLoading(false);
        return [];
      }
    }, 1000);
  };

  // const removeFavourite = async (item) => {
  //   try {
  //     const favoris = JSON.parse(await AsyncStorage.getItem('favoris')) || [];
  //     const updatedFavoris = favoris.filter((favori) => favori.id !== item.id);

  //     await AsyncStorage.setItem('favoris', JSON.stringify(updatedFavoris));
  //     setFavourite(updatedFavoris);
  //     dispatch(DataActions.setFavourite(updatedFavoris));
  //   } catch (error) {
  //     console.error('Error removing favori:', error);
  //   }
  // };

  useEffect(() => {
    getHistory();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getHistory();
    if (keyword) {
      setSearch(keyword);
      onSearch(keyword);
    } else {
      setSearch('');
    }
  }, []);

  const onSearch = async (keyword) => {
    const collectionsFound = collections.filter((item) => item.name.includes(keyword));
    setCollectionData(collectionsFound);
    const datasetsFound = datasets.filter((item) => item.name.includes(keyword));
    // console.log(datasetsFound);
    setDatasetData(datasetsFound);
    const announcementsFound = announcements.filter((item) => item.name.includes(keyword));
    setAnnData(announcementsFound);
    const newsFound = news.filter((item) => item.name.includes(keyword));
    setNewsData(newsFound);
    //const found = searchHistory.some((item) => item.keyword === keyword);
    let searchData = [];

    if (
      collectionsFound.length != 0 ||
      datasetsFound.length != 0 ||
      announcementsFound.length != 0 ||
      newsFound.length != 0
    ) {
      const existedSearchHistory = searchHistory.filter((item) => item.keyword === keyword);
      if (existedSearchHistory.length > 0) {
        searchData = searchHistory.map((item) => {
          return {
            ...item,
            checked: item.keyword === keyword,
          };
        });
      } else {
        searchData = searchHistory
          .concat({
            keyword: keyword,
          })
          .map((item) => {
            return {
              ...item,
              checked: item.keyword === keyword,
            };
          });
      }
      //console.warn(searchHistory);
    } else {
      const existedSearchHistory = searchHistory.filter((item) => item.keyword === keyword);
      if (existedSearchHistory.length > 0) {
        searchData = searchHistory.map((item) => {
          return {
            ...item,
            checked: item.keyword === keyword,
          };
        });
      } else {
        searchData = searchHistory
          .concat({
            keyword: keyword,
          })
          .map((item) => {
            return {
              ...item,
              checked: item.keyword === keyword,
            };
          });
      }
    }

    // if (collectionsFound.length != 0 || datasetsFound.length != 0 || announcementsFound.length != 0 || newsFound.length != 0) {
    //   const existedSearchHistory = searchHistory.filter((item) => item.keyword === keyword);
    //   console.warn("Existed History : ", existedSearchHistory);
    //   if(existedSearchHistory) {
    //     searchData = searchHistory.map((item) => {
    //         return {
    //           ...item,
    //           checked: item.keyword === keyword,
    //         };
    //       });
    //   } else {
    //       searchData = searchHistory.concat({
    //         keyword: keyword,
    //         checked: true
    //       });
    //   }
    // }

    setSearch(keyword);
    setSearchHistory(searchData);
    setTimeout(() => setLoading(false), 2000);
    //setTimeout(() => navigation.navigate('NPost'), 1000);
  };

  const android = Platform.OS === 'android';

  const getTotalCol = () => {
    switch (modeView) {
      // case 'square':
      //   return 1;
      case 'bars':
        return 1;
      case 'th-list':
        return 1;
      case 'th-large':
        return 2;
      default:
        return 1;
    }
  };

  const goPostDetail = (item) => {
    // console.warn("DATASET : ", item.id);
    navigation.navigate('FCryptol02', { item: item });
    //navigation.navigate('NPostDetail', { item: item });
  };

  const goPost = (id) => () => {
    navigation.navigate('NPost', { collectionId: id });
  };

  const goPostDetailAnn = (item) => () => {
    navigation.navigate('NPostDetail', { item: item });
  };

  const renderItem = ({ item, index }) => {
    return (
      <NewsGrid
        avatar={item.avatar}
        loading={loading}
        style={{
          paddingLeft: index % 2 === 0 ? 0 : 15,
          paddingBottom: 15,
        }}
        image={item.logo}
        description={item.description}
        shortDescription={item.shortDescription}
        title={item.name}
        onPress={() => goPostDetail(item)}
      />
    );
  };
  const renderCollection = ({ item, index }) => {
    return (
      <></>
      // <NewsGrid
      //   avatar={item.avatar}
      //   loading={loading}
      //   style={{
      //     paddingLeft: index % 2 === 0 ? 0 : 15,
      //     paddingBottom: 15,
      //   }}
      //   image={item.logo}
      //   description={item.description}
      //   shortDescription={item.shortDescription}
      //   title={item.name}
      //   onPress={() => goPostDetail(item)}
      // />
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <TouchableOpacity onPress={() => onSearch(search)}>
                <Text header headline primaryColor>
                  {t('apply')}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setSearch(text)}
            autoCorrect={false}
            placeholder={t('enter_keywords')}
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              onSearch(search);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSearch('');
            }}
            style={styles.btnClearSearch}
          >
            <Icon name="times" size={18} color={BaseColor.grayColor} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={styles.rowTitle}>
            <Text title4 semibold>
              {t('search_history').toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => setSearchHistory([])}>
              <Text caption1 accentColor>
                {t('clear')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.itemHistory,
                  item.checked
                    ? {
                        backgroundColor: colors.primary,
                      }
                    : {
                        backgroundColor: colors.card,
                      },
                ]}
                onPress={() => onSearch(item.keyword)}
                key={'search' + index}
              >
                <Text
                  caption2
                  style={
                    item.checked
                      ? {
                          color: BaseColor.whiteColor,
                        }
                      : {}
                  }
                >
                  {item.keyword}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          {/* <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text title3 semibold>
              {t('data_correspond').toUpperCase()}
            </Text>
          </View> */}
          {datasetData && (
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentInset={{ top: 10 }}
              contentContainerStyle={{
                marginTop: android ? 50 : 0,
                paddingHorizontal: 10,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {}}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              data={datasetData}
              key={getTotalCol()}
              numColumns={getTotalCol()}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          )}

          {collectionData && (
            <View
              style={{
                paddingHorizontal: 10,
                width: '100%',
              }}
            >
              {collectionData.map((item, index) => (
                <CategoryList
                  key={index.toString()}
                  loading={loading}
                  onPress={goPost(item?.id)}
                  style={{
                    marginTop: 10,
                    marginBottom: index === collectionData?.length - 1 ? 0 : 15,
                  }}
                  image={item.logo}
                  title={item.name}
                  subtitle={item.description.slice(0, 70) + '...'}
                />
              ))}
            </View>
          )}

          {annData && (
            <View
              style={{
                paddingHorizontal: 10,
                width: '100%',
              }}
            >
              {annData.map((item, index) => (
                <NewsList
                  key={index.toString()}
                  loading={loading}
                  image={Images.docIcon}
                  imageUrl={item?.image}
                  title={item.name}
                  subtitle={item.subtitle}
                  documentId={item.documentId}
                  author={item.authorName}
                  date={typeof item?.createdDate === 'string' ? item?.createdDate : new Date().toLocaleDateString()}
                  style={{
                    marginTop: 15,
                  }}
                  onPress={goPostDetailAnn(item)}
                />
              ))}
            </View>
          )}
          {/* <Text title3 semibold>
            {t('recently_viewed').toUpperCase()}
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={recentlyView}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 10,
                  marginTop: 5,
                }}
                image={item.image}
                onPress={() =>
                  navigation.navigate('NPostDetail', {
                    item: item,
                  })
                }
              />
            )}
          /> */}
        </View>

        {/* <View
          style={{
            marginTop: 24,
          }}
        >
          <Text title3 semibold>
            {t('discover_channels')}
          </Text>
          <Text body2 grayColor>
            {t('description_discover_channels')}
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 4 }}
            data={channels}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CardChannelGrid image={item.image} title={item.title} />}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default NSearchHistory;
