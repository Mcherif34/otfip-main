import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { NewsWishlist, SafeAreaView, Text, ModalFilter, Header, Icon } from '@/components';
import { DataActions } from '@/actions';

const sortOptionInit = [
  {
    value: 'remove',
    icon: 'sort-amount-up',
    text: 'remove',
  },
  {
    value: 'reset_all',
    icon: 'sort-amount-up',
    text: 'reset_all',
  },
];

const NFavourite = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [favourite, setFavourite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [item, setItem] = useState();
  const dispatch = useDispatch();

  const getFavourite = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const favoris = JSON.parse(await AsyncStorage.getItem('favoris')) || [];
        setFavourite(favoris);
        setLoading(false);
      } catch (error) {
        console.error('Error getting favoris:', error);
        setLoading(false);
        return [];
      }
    }, 1000);
  };

  const removeFavourite = async (item) => {
    try {
      const favoris = JSON.parse(await AsyncStorage.getItem('favoris')) || [];
      const updatedFavoris = favoris.filter((favori) => favori.id !== item.id);

      await AsyncStorage.setItem('favoris', JSON.stringify(updatedFavoris));
      setFavourite(updatedFavoris);
      dispatch(DataActions.setFavourite(updatedFavoris));
    } catch (error) {
      console.error('Error removing favori:', error);
    }
  };
  const removeAllFavourite = async () => {
    try {
      const favoris = [];
      await AsyncStorage.setItem('favoris', JSON.stringify(favoris));
      setFavourite(favoris);
      dispatch(DataActions.setFavourite(favoris));
    } catch (error) {
      console.error('Error removing favori:', error);
    }
  };

  useEffect(() => {
    getFavourite();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value === selected.value,
        };
      })
    );
  };

  const onApply = async () => {
    // await removeFavourite(item);
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected.value === 'reset_all') {
      await removeAllFavourite(item);
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
    if (itemSelected.value === 'remove') {
      await removeFavourite(item);
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
  };

  const renderContent = () => {
    return (
      <View style={[{ flex: 1, paddingTop: 20 }]}>
        <Header
          title={t('favorites')}
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
                  title3
                  bold
                  style={{
                    marginTop: 8,
                    marginLeft: 10,
                    fontSize: 22,
                    fontWeight: '800',
                    paddingBottom: 10,
                  }}
                >
                  {t('favorites').toUpperCase()}
                </Text>
              </View>
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        {/* <View style={{ marginBottom: 16, paddingHorizontal: 20 }}>
          <Text header bold>
            {t('favorites')}
          </Text>
        </View> */}

        {favourite?.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              Votre liste de favoris est vide!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                getFavourite();
              }}
              style={{
                backgroundColor: BaseColor.primaryColor,
                borderRadius: 30,
                paddingHorizontal: 30,
                paddingVertical: 10,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  marginRight: 5,
                }}
              >
                Actualiser
              </Text>
              {loading && <ActivityIndicator size="small" />}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => {
                    getFavourite();
                  }}
                />
              }
              data={favourite}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NewsWishlist
                  loading={loading}
                  image={item.image}
                  title={item.name}
                  subtitle={item.description.slice(0,85).concat('...')}
                  rate={item.rate}
                  onPress={() =>
                    navigation.navigate('NPostDetail', {
                      item: item,
                    })
                  }
                  onAction={() => {
                    setItem(item);
                    setModalVisible(true);
                  }}
                />
              )}
            />
            <ModalFilter
              options={sortOption}
              isVisible={modalVisible}
              onSwipeComplete={() => {
                setModalVisible(false);
                setSortOption(sortOptionInit);
              }}
              onApply={onApply}
              onSelectFilter={onSelectFilter}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default NFavourite;
