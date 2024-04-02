import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SceneMap } from 'react-native-tab-view';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Header, Icon, SafeAreaView, TabSlider, Tag, Text } from '@/components';
import { getDocuments, getTags } from '@/selectors';
import Detail from './Detail';
import Profile from './Profile';
import Profit from './Profit';
import Transactions from './Transactions';
import styles from './styles';

export default function FCryptol01({ navigation }) {
  const route = useRoute();
  const item = route?.params?.item;
  const screen = route?.params?.screen ?? '';
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const tags = useSelector(getTags);
  const documents = useSelector(getDocuments);
  const datatsetDocs = documents.filter((doc) => doc.datasetId === item.id);
  const datasetDownloadNumber = datatsetDocs.reduce((total, doc) => total + doc.downloadNumber, 0);
  const [routes] = useState([
    { key: 'detail', title: 'GRAPHIQUE' },
    //{ key: 'profile', title: 'Tableaux' },
    { key: 'profit', title: 'FICHIERS' },
    { key: 'transactions', title: 'INDEXATION' },
  ]);

  const onUnWatch = () => {
    if (screen) {
      navigation.navigate({
        name: screen,
        params: { item: item },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  };

  const renderScene = SceneMap({
    detail: () => <Detail dataset={item} onUnWatch={onUnWatch} />,
    profile: Profile,
    profit: () => <Profit dataset={item} />,
    transactions: () => <Transactions dataset={item} />,
  });

  const renderContent = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: BaseColor.dividerColor,
          paddingBottom: 20,
        }}
      >
        <View style={styles.contentDescription}>
          <Text
            semibold
            style={{
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 0,
            }}
            numberOfLines={100}
          >
            {item.shortDescription}
          </Text>
          <View style={styles.wrapContent}>
            {tags.map((elt) => {
              return (
                <Tag
                  status
                  key={elt.id}
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  {elt.name}
                </Tag>
              );
            })}
          </View>
          <Text
            footnote
            style={{
              lineHeight: 20,
              paddingTop: 5,
              paddingBottom: 20,
            }}
            numberOfLines={100}
          >
            {item.description}
          </Text>
        </View>
        {datatsetDocs && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <Icon name="download" color={BaseColor.primaryColor} size={14} />
            <Text caption3 grayColor style={{ marginLeft: 5 }}>
              Téléchargements :
            </Text>
            <Text headline darkPrimaryColor style={{ marginLeft: 5 }}>
              {datasetDownloadNumber}
            </Text>
            <Icon name="eye" color={BaseColor.primaryColor} size={14} style={{ marginLeft: 15 }} />
            <Text caption3 grayColor style={{ marginLeft: 5 }}>
              Vues :
            </Text>
            <Text headline darkPrimaryColor style={{ marginLeft: 5 }}>
              {item.viewsNumber}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginTop: 10,
          }}
        >
          
        </View>
        {/* <Text
          title3
          semibold
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {t('related_announcements')}
        </Text>
        <View style={{ paddingHorizontal: 20, marginBottom: 30, }}>
          {similarAnn.map((item, index) => (
            <NewsList
              key={index.toString()}
              image={item?.image ? item.image : Images.docIcon}
              date={item.createdDate}
              title={item.name}
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
          {t('plus_news')}
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {news.map((item, index) => (
            <CardSlideReview
              key={index.toString()}
              loading={loading}
              onPress={goPostDetail(item)}
              style={{
                marginRight: index === HomePopularData.length - 1 ? 0 : 15,
              }}
              imageUri={item?.image}
              date={item?.description?.slice(0, 90) + '...'}
              title={item.name}
              collection={item.collectionName}
            />
          ))}
        </ScrollView> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        // title={`${item.name}`}
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
                borderBottomColor: "#DDDDDD",
                borderBottomWidth: 1
              }}
            >
              <Icon name="angle-left" size={30} enableRTL={true} color={colors.text} style={{backgroundColor: colors.primary, padding: 5, borderRadius: 10}} />
              <Text
                title2
                bold
                style={{
                  marginTop: 8,
                  marginLeft: 10,
                  fontSize: 22,
                  fontWeight: "800",
                  paddingBottom: 10
                }}
              >
                {item.name.toUpperCase()}
              </Text>
            </View>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {renderContent()}
      <TabSlider navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
    </SafeAreaView>
  );
}
