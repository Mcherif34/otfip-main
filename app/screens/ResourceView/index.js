import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { PProject } from '@/data';
import { Header, Icon, ModalFilter, SafeAreaView, Text } from '@/components';
import styles from './styles';
import Attachment from './Attachment';

const sortOptionInit = [
  {
    value: 'most_helpful',
    text: 'most_helpful',
  },
  {
    value: 'most_favourable',
    text: 'most_favourable',
  },
  {
    value: 'most_crictical',
    text: 'most_crictical',
  },
  {
    value: 'most_recent',
    text: 'most_recent',
  },
];

const ResourceView = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [, setMembers] = useState(PProject[0].members);
  const [item, setItem] = useState(PProject[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [loading, setLoading] = useState(false);
  const searchBox = useRef(null);
  const [option, setOption] = useState(sortOptionInit[3]);

  const width = Dimensions.get('window').width;

  useEffect(() => {
    if (route?.params?.members) {
      setMembers(route?.params?.members);
    }
  }, [route?.params?.members]);

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route?.params?.item);
    }
  }, [route?.params?.item]);

  const onSelectFilter = (itemInline) => {
    setSortOption(
      sortOption.map((optionInline) => ({
        ...optionInline,
        checked: itemInline.value === optionInline.value,
      }))
    );
  };
  const onSubmitEditing = () => {
    setLoading(true);
    if (searchBox) {
      searchBox.current.blur();
    }

    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return ' il y a ' + interval + ' ans';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return ' il y a ' + interval + ' mois';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return ' il y a ' + interval + ' jours';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return ' il y a ' + interval + ' heures';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return ' il y a ' + interval + ' minutes';
    }

    if (seconds < 10) return " à l'instant";

    return ' il y a ' + Math.floor(seconds) + ' secondes';
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        title={t('resource_view')}
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
                {t('resource_detail').toUpperCase()}
              </Text>
            </View>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text
                headline
                bold
                style={{
                  fontSize: 15,
                }}
              >
                {item.name?.toUpperCase()}
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <ProfileAuthor
                  style={{ flex: 1 }}
                  image={Images.profile1}
                  name="Steve Garret"
                  description="Crated on 19 Otc 2021"
                />
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="ellipsis-v" size={14} />
                </TouchableOpacity>
              </View> */}
              {/* <View style={styles.row}>
                <Icon name="briefcase" size={14} color={BaseColor.kashmir} />
                <Text title style={{ marginLeft: 5, FontWeight: 600 }}>
                  {item?.name}
                </Text>
              </View> */}
              <Text body2 light style={{ paddingVertical: 10 }}>
                {item?.description}
              </Text>
              {item?.authorName && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text bold style={{ fontSize: 12 }}>
                    {t('authorName').toUpperCase()} :{' '}
                  </Text>
                  <Text>{item?.authorName}</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text medium bold style={{ fontSize: 12 }}>
                  {t('time_ago').toUpperCase()} :{' '}
                </Text>
                <Text>{timeAgo(item?.updatedDate)}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text medium bold style={{ fontSize: 12 }}>
                  {t('downloads').toUpperCase()} :<Text>{' 0'}</Text>
                </Text>
                <Text>{item?.downloadNumber}</Text>
              </View>
              <Text
                headline
                style={{
                  paddingTop: 40,
                  paddingBottom: 5,
                  marginBottom: 20,
                }}
              >
                {t('documents').toUpperCase()}
              </Text>
              {item?.documentsDTO?.length > 0 ? (
                item.documentsDTO?.map((elt, index) => <Attachment key={index} item={elt} />)
              ) : (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>Aucun document disponible encore</Text>
                </View>
              )}
              {/* <Text
                headline
                style={{
                  paddingTop: 10,
                  paddingBottom: 5,
                }}
              >
                {t('status')}
              </Text>
              <View style={styles.specifications}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <Tag
                        primary
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 2,
                          backgroundColor: colors.primaryLight,
                        }}
                      >
                        {t('hight')}
                      </Tag>
                    )}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <ProfileAuthor image={Images.profile1} name={'Edward Harvey'} description={'Junior Developer'} />
                    )}
                  />
                </View>
              </View> */}
              {/* <View style={styles.specifications}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('status')}
                    renderTitle={() => (
                      <Tag
                        primary
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 2,
                          backgroundColor: BaseColor.kashmir,
                        }}
                      >
                        {t('resolved')}
                      </Tag>
                    )}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <Tag
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 3,
                        }}
                        outlineSecondaryIcon
                        gray
                        icon={<Icon solid name="star" color={colors.accent} />}
                        textStyle={{
                          paddingHorizontal: 5,
                        }}
                      >
                        {t('improve')}
                      </Tag>
                    )}
                  />
                </View>
              </View> */}
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                  }}
                >
                  {/* <Text headline style={{ paddingHorizontal: 4 }}>
                    {t('comments')}
                  </Text> */}
                  {/* <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      onSelectFilter(option);
                      setModalVisible(true);
                    }}
                  >
                    <Text body1 style={{ paddingHorizontal: 4 }}>
                      {t(option.value)}
                    </Text>
                    <Icon name="angle-down" size={14} color={colors.text} />
                  </TouchableOpacity> */}
                </View>
              </View>
              {/* {EReviewsData.map((itemInline, index) => (
                <CardCommentSimple
                  key={index}
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: BaseColor.dividerColor,
                  }}
                  image={itemInline.source}
                  name={itemInline.name}
                  date={itemInline.date}
                  comment={itemInline.comment}
                />
              ))} */}
            </View>
          </ScrollView>
          {/* <SearchBox ref={searchBox} onSubmitEditing={onSubmitEditing} loading={loading} /> */}
        </KeyboardAvoidingView>
      </View>
      <ModalFilter
        options={sortOption}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        onApply={() => {
          const optionInline = sortOption.find((itemInline) => itemInline.checked);
          setOption(optionInline);
          setModalVisible(false);
        }}
        onSelectFilter={onSelectFilter}
      />
    </SafeAreaView>
  );
};

export default ResourceView;
