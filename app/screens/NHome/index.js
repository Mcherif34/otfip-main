import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, ScrollView, TextInput, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import YoutubePlayer from 'react-native-youtube-iframe';
import { HomePopularData, HomeTopicData } from '@/data';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import { CardSlide, CategoryList, NewsList, SafeAreaView, Text, Icon, CardReport05, LineChart } from '@/components';
import { getAnnoucements, getAttributes, getCollections, getDatasets, getDocumentVideos, getNews } from '@/selectors';
import { formatAmount } from '@/utils';
import { DataActions } from '@/actions';
import { getAllAttributes } from '../../services/attributeService';
import { getAllCollections } from '../../services/collectionService';
import { getAllAnnouncement, getAllNews } from '../../services/newsService';
import { getAllDatasets } from '../../services/datasetService';
import { getAllPublicationType } from '../../services/publicationService';
import { getAllResource } from '../../services/resourceService';
import * as Util from '../../utils';
import styles from './styles';

const searchHistoryInit = [
  { id: '1', keyword: 'Corona Virus' },
  { id: '2', keyword: 'Amber Heard' },
  { id: '3', keyword: 'Brexit' },
  { id: '4', keyword: 'Real Marid' },
  { id: '5', keyword: 'Liverpool' },
  { id: '6', keyword: 'Super Bowl  2020 time' },
];

const NHome = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const collections = useSelector(getCollections);
  const announcements = useSelector(getAnnoucements);
  const datasets = useSelector(getDatasets);
  const news = useSelector(getNews);
  const attributes = useSelector(getAttributes);
  const videos = useSelector(getDocumentVideos);
  const [search, setSearch] = useState('');
  const { colors } = useTheme();
  const videoRef = useRef();
  const [video, setVideo] = useState(0);
  //const [searchHistory, setSearchHistory] = useState(searchHistoryInit);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [data, setData] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);
  //const mainNews = announcements[0];
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();

  const width = Dimensions.get('window').width;

  // console.log(videos[0]?.url);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getAllAttributesData();
        await getAllCollectionsData();
        await getAllAnnouncementData();
        await getDatasetData();
        await getNewsData();
        await getPublicationData();
        await getResourcesData();
        getStatistic();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Erreur de récupération des données', 'Veuillez réessayer ultérieurement');
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const getAllAttributesData = async () => {
    try {
      const atts = await getAllAttributes();
      if (atts && atts.length) {
        dispatch(DataActions.setAttributes(atts));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getAllCollectionsData = async () => {
    try {
      const coll = await getAllCollections();
      if (coll && coll.length) {
        dispatch(DataActions.setCollections(coll));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getAllAnnouncementData = async () => {
    try {
      const ann = await getAllAnnouncement();
      if (ann && ann.length) {
        dispatch(DataActions.setAnnouncements(ann));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getDatasetData = async () => {
    try {
      const datasets = await getAllDatasets();
      if (datasets && datasets.length) {
        dispatch(DataActions.setDatasets(datasets));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getPublicationData = async () => {
    try {
      const publications = await getAllPublicationType();
      if (publications && publications.length) {
        dispatch(DataActions.setPublication(publications));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getNewsData = async () => {
    try {
      const newsData = await getAllNews();
      if (newsData && newsData.length) {
        dispatch(DataActions.setNews(newsData));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getResourcesData = async () => {
    try {
      const resourcesData = await getAllResource();
      if (resourcesData && resourcesData.length) {
        dispatch(DataActions.setResource(resourcesData));
      }
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Veuillez ressayer plutard');
    }
  };

  const getStatistic = () => {
    // data card traitment
    const incomeValue = attributes
      .filter((item) => item.axis === false && item.dataTypeId === 3 && item.dataId === 1)
      .map((item) => parseFloat(item.value));
    const sumIncome = incomeValue.reduce((acc, current) => acc + current, 0);
    setIncome(sumIncome);

    const expenseValue = attributes
      .filter((item) => item.axis === false && item.dataTypeId === 2 && item.dataId === 1)
      .map((item) => parseFloat(item.value));
    const sumExpense = expenseValue.reduce((acc, current) => acc + current, 0);
    setExpense(sumExpense);

    let labels = attributes.filter((item) => item.axis === false).map((item) => item.year);
    labels = [...new Set(labels)];
    labels = [...labels].reverse();
    // data chart traitment
    let incomeData = [];
    labels?.slice(-5).forEach((year) => {
      let incomeAttValue = attributes
        .filter((item) => item.axis === false && item.year === year && item.dataTypeId === 3 && item.dataId === 1)
        .map((item) => parseFloat(item.value));
      let sum = incomeAttValue.reduce((acc, current) => acc + current, 0);
      incomeData.push(sum);
    });

    let expenseData = [];
    labels?.slice(-5).forEach((year) => {
      let expenseAttValue = attributes
        .filter((item) => item.axis === false && item.year === year && item.dataTypeId === 2 && item.dataId === 1)
        .map((item) => parseFloat(item.value));
      let sum = expenseAttValue.reduce((acc, current) => acc + current, 0);
      expenseData.push(sum);
    });

    const obj = {
      labels: labels.slice(-5),
      datasets: [
        {
          data: incomeData,
          color: (_opacity = 1) => BaseColor.primaryColor,
          strokeWidth: 2, // optional
        },
        {
          data: expenseData,
          color: (_opacity = 1) => BaseColor.accentColor, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: [t('income'), t('expense')],
    };

    setData(obj);
  };

  // const data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   datasets: [
  //     {
  //       data: [200, 500, 1000, 500, 1000, 250, 2000, 1500, 1000, 50, 20, 10],
  //       color: (_opacity = 1) => BaseColor.primaryColor,
  //       strokeWidth: 2, // optional
  //     },
  //     {
  //       data: [300, 1500, 500, 500, 100, 200, 400, 500, 1000, 1000, 100, 100],
  //       color: (_opacity = 1) => BaseColor.accentColor, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   legend: [t('income'), t('expense')],
  // };

  const onSearch = (keyword) => {
    setLoadingActivity(true);
    setTimeout(() => {
      setLoadingActivity(false);
      navigation.navigate('NSearchHistory', { keyword: keyword });
    }, 1000);
  };

  const goPost = (item) => () => {
    navigation.navigate('NPost', { collection: item });
  };

  const goPostDetail = (item) => () => {
    navigation.navigate('NPostDetail', { item: item });
  };

  const goDatasetDetail = (item) => () => {
    navigation.navigate('FCryptol02', { item: item });
  };

  const goToCategory = () => {
    navigation.navigate('NCategory');
  };

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:embed\/|v=|vi\/|youtu\.be\/|\/embed\/|\/v\/|\/e\/|watch\?v=)([^\?&"'>]+)/);
    return match && match[1] ? match[1] : null;
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <>
          <View
            style={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <Image
              style={{
                width: Util.scaleWithPixel(200),
                height: Util.scaleWithPixel(60),
              }}
              source={require('../../assets/images/logo-otfip.png')}
            />
          </View>
        </>
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 25,
              backgroundColor: '#F1EFEF',
              marginBottom: 30,
              borderRadius: 5,
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

          {/* <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -10,
              backgroundColor: 'blue'
            }}
          >
            <Carousel
              loop
              height={width / 14}
              width={width}
              autoPlay={true}
              data={announcements}
              // scrollAnimationDuration={3000}
              ref={videoRef}
              onScrollBegin={(index) => setVideo(index)}
              onSnapToItem={(index) => setVideo(index)}
              autoPlayInterval={10000}
              renderItem={({ item }) => (
                <View style={{
                  height: 20,
                  width: '100%',

                }}>
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          </View> */}

          <View style={{ paddingHorizontal: 0, paddingBottom: 10 }}>
            <Text headline bold style={{ fontSize: 17 }}>
              {t('general_budget')?.toUpperCase()}
            </Text>
            <Text subhead grayColor style={{ fontSize: 12, marginTop: 5 }}>
              {t('general_budget_desc')?.toUpperCase()}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 20 }}>
            <View style={{ flex: 1, paddingRight: 7 }}>
              <CardReport05
                // onPress={() => navigation.navigate('Dashboard5')}
                icon="arrow-up"
                title={t('income')?.toUpperCase()}
                price={formatAmount(income)}
                currency="FCFA"
                style={{ backgroundColor: BaseColor.primaryColor }}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 7 }}>
              <CardReport05
                // onPress={() => navigation.navigate('Dashboard2')}
                icon="arrow-down"
                title={t('expense')?.toUpperCase()}
                price={formatAmount(expense)}
                currency="FCFA"
                style={{ backgroundColor: BaseColor.accentColor }}
              />
            </View>
          </View>
          <ScrollView horizontal style={{ flex: 1, paddingLeft: 0, width: '100%' }}>
            {data !== null && <LineChart data={data} />}
          </ScrollView>
          <View
            style={{
              marginVertical: 20,
            }}
          >

            <Text headline bold style={{ fontSize: 17 }}>
              {t('dataset')?.toUpperCase()}
            </Text>
            <Text subhead grayColor style={{ fontSize: 12, marginTop: 5, marginBottom: 5 }}>
              {t('datset_subtitle')?.toUpperCase()}
            </Text>

            <ScrollView
              contentContainerStyle={{marginTop: 15}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {datasets?.slice(0, 3).map((item, index) => (
                <CardSlide
                  key={index.toString()}
                  loading={loading}
                  onPress={goDatasetDetail(item)}
                  style={{
                    marginRight: index === HomePopularData?.length - 1 ? 0 : 15,
                  }}
                  image={item?.logo ? item.logo : Images.main_doc}
                  date={item?.description?.slice(0, 90) + '...'}
                  title={item.name.toUpperCase()}
                  collection={item.collectionName}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.topicsView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text headline bold style={{ fontSize: 17 }}>
                {t('news_video')?.toUpperCase()}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  height: 20,
                }}
              >
                {videos?.slice(0, 3).map((vid, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: video === index ? '#7E8299' : '#B5B5C3',
                      width: video === index ? 20 : 8,
                      height: 8,
                      borderRadius: 8,
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      console.log(index);
                      videoRef.current.scrollTo(index);
                    }}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Carousel
                loop
                height={width / 2}
                width={width - 40}
                autoPlay={true}
                data={videos?.slice(0, 3)}
                scrollAnimationDuration={1000}
                ref={videoRef}
                onScrollBegin={(index) => setVideo(index)}
                onSnapToItem={(index) => setVideo(index)}
                autoPlayInterval={10000}
                renderItem={({ item }) => (
                  <>
                    <YoutubePlayer
                      height={300}
                      width="100%"
                      play={playing}
                      videoId={extractYouTubeVideoId(item?.url)}
                      onChangeState={onStateChange}
                    />
                  </>
                )}
              />
            </View>
          </View>

          <View style={styles.topicsView}>
            <Text headline bold style={{ fontSize: 17 }}>
              {t('browse_topics')?.toUpperCase()}
            </Text>
            <Text subhead grayColor style={{ fontSize: 12, marginTop: 5 }}>
              {t('select_your_most_interesting_category')?.toUpperCase()}
            </Text>
            <View style={{marginTop: 15}}>
              {collections?.slice(0, 3).map((item, index) => (
                <CategoryList
                  key={index.toString()}
                  loading={loading}
                  onPress={goPost(item)}
                  style={{
                    marginBottom: index === HomeTopicData?.length - 1 ? 0 : 15,
                  }}
                  image={item.logo}
                  title={item.name?.toUpperCase()}
                  subtitle={item.description?.slice(0, 170) + '...'}
                />
              ))}
              <TouchableOpacity style={{backgroundColor: '#045596', alignItems: 'center', paddingTop: 5, paddingBottom: 5, borderRadius: 3}} onPress={goToCategory}>
                <Text body2 semibold style={{color: '#FFFFFF'}}>
                  {t('see_more')?.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <News43
            loading={loading}
            onPress={goPostDetail(mainNews)}
            style={{ marginTop: 5 }}
            image={mainNews?.image ? mainNews?.image : Images.newsGrapheMain}
            name={mainNews?.name}
            description={mainNews?.description}
            title={mainNews?.title}
          /> */}

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text headline bold style={{ fontSize: 17 }}>
              {t('announcements')?.toUpperCase()}
            </Text>
            <Text subhead grayColor style={{ fontSize: 12, marginTop: 5 }}>
              {t('announcement_subtitle')?.toUpperCase()}
            </Text>
            {announcements.map((item, index) => (
              <NewsList
                key={index.toString()}
                loading={loading}
                image={Images.docIcon}
                imageUrl={item?.image}
                title={item.name?.toUpperCase()}
                subtitle={item.subtitle}
                documentId={item.documentId}
                author={item.authorName}
                date={typeof item?.createdDate === 'string' ? item?.createdDate : new Date().toLocaleDateString()}
                style={{
                  marginTop: 15,
                }}
                onPress={goPostDetail(item)}
              />
            ))}
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text headline bold style={{ fontSize: 17 }}>
              {t('news_title')?.toUpperCase()}
            </Text>
            <Text subhead grayColor style={{ fontSize: 12, marginTop: 5 }}>
              {t('news_sub_title')?.toUpperCase()}
            </Text>
            <ScrollView
              contentContainerStyle={styles.paddingFlatList}
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
                    marginRight: index === HomePopularData?.length - 1 ? 0 : 15,
                  }}
                  imageUri={item?.image}
                  date={item?.description?.slice(0, 90) + '...'}
                  title={item.name?.toUpperCase()}
                  collection={item.collectionName}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {loadingActivity ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={BaseColor.primaryColor} />
          <Text title3>Recherche...</Text>
        </View>
      ) : (
        <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
          {renderContent()}
        </SafeAreaView>
      )}
    </View>
  );
};

export default NHome;
