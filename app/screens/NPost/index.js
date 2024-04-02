import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, RefreshControl, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { PostListData } from '@/data';
import { Header, Icon, News169, NewsGrid, NewsList, SafeAreaView, Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
// Load sample data
import * as Utils from '@/utils';
import { getDatasets } from '@/selectors';
import OfficialText from '../OfficialText';
import styles from './styles';

let timeoutChangeMode = null;

export const modes = {
  // square: 'square',
  bars: 'bars',
  thList: 'th-list',
  thLarge: 'th-large',
};

const NPost = ({ mode = modes.thLarge, posts = PostListData, route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { collection } = route.params;
  // const collections = useSelector(getCollections);
  // const [collection, setCollection] = useState({});
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState(mode);
  const [list] = useState(posts);
  const datasets = useSelector(getDatasets);
  const collectionDatasets = datasets.filter((item) => item.collectionId === collection?.id);
  const [loading, setLoading] = useState(true);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim
      ),
      0,
      40
    )
  ).current;

  // useEffect(() => {
  //   setCollection(collections.filter((item) => item.id === collectionId));
  //   console.log(collections.filter((item) => item.id === collectionId));
  // }, [collections]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeSort = () => {};

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('NFilter');
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.primary],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    setLoading(true);
    clearTimeout(timeoutChangeMode);
    timeoutChangeMode = setTimeout(() => {
      setLoading(false);
    }, 1000);
    Utils.enableExperimental();
    let modeInline = 'th-list';
    switch (modeView) {
      // case 'square':
      //   modeInline = 'bars';
      //   break;
      case 'bars':
        modeInline = 'th-list';
        break;
      case 'th-list':
        modeInline = 'th-large';
        break;
      case 'th-large':
        modeInline = 'bars';
        break;

      default:
        break;
    }
    setModeView(modeInline);
  };

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

  const renderItem = ({ item, index }) => {
    switch (modeView) {
      // case 'square':
      //   return (
      //     <News43
      //       avatar={item.avatar}
      //       loading={loading}
      //       style={{ marginVertical: 8 }}
      //       name={item.name}
      //       description={item.description}
      //       title={item.name}
      //       image={item.logo}
      //       onPress={() => goPostDetail(item)}
      //     />
      //   );
      case 'bars':
        return (
          <News169
            avatar={item.avatar}
            loading={loading}
            style={{ marginVertical: 8 }}
            name={item.name.toUpperCase()}
            description={item.description}
            title={item.name.toUpperCase()}
            image={item.image}
            onPress={() => goPostDetail(item)}
          />
        );

      case 'th-list':
        return (
          <NewsList
            avatar={item.avatar}
            loading={loading}
            style={{ marginVertical: 8 }}
            description={item.description}
            title={item.name.toUpperCase()}
            subtitle={item.subtitle}
            date={item.date}
            image={item.image}
            onPress={() => goPostDetail(item)}
          />
        );
      case 'th-large':
        return (
          <NewsGrid
            avatar={item.avatar}
            loading={loading}
            style={{
              paddingLeft: index % 2 === 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            image={item?.logo}
            description={item.description}
            shortDescription={item.shortDescription}
            title={item.name.toUpperCase()}
            onPress={() => goPostDetail(item)}
          />
        );
      default:
        break;
    }
  };

  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });

    const android = Platform.OS === 'android';
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{ top: 15 }}
          contentContainerStyle={{
            marginTop: android ? 15 : 0,
            paddingHorizontal: 20,
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
          data={collectionDatasets}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          {/* <FilterSort modeView={modeView} onChangeSort={onChangeSort} onFilter={onFilter} /> */}
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        style={{
          padding: 0,
        }}
        title={collection?.name}
        renderLeft={() => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'center',
                width: 500,
                paddingBottom: 5,
                borderBottomColor: '#DDDDDD',
                borderBottomWidth: 1,
              }}
            >
              <Icon
                name="angle-left"
                size={30}
                enableRTL={true}
                color={colors.text}
                style={{ backgroundColor: colors.primary, padding: 5, borderRadius: 10 }}
              />
              <Text
                title2
                bold
                style={{
                  marginTop: 8,
                  marginLeft: 10,
                  fontSize: 22,
                  fontWeight: '800',
                  paddingBottom: 10,
                }}
              >
                {collection?.name.toUpperCase()}
              </Text>
            </View>
          );
        }}
        // renderRight={() => {
        //   return <Icon name="search" size={20} color={colors.primary} />;
        // }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        // onPressRight={() => {
        //   navigation.navigate('NSearchHistory', { keyword: '' });
        // }}
      />
      {collection?.id !== 8 ? (
        collectionDatasets?.length > 0 ? (
          renderList()
        ) : (
          <View
            style={{
              flex: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Text> {t('empty_data')}</Text>
          </View>
        )
      ) : (
        <OfficialText />
      )}
    </SafeAreaView>
  );
};

export default NPost;
