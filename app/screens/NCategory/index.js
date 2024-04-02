import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CategoryData } from '@/data';
import {
  CategoryBlock,
  CategoryBoxColor,
  CategoryBoxColor2,
  CategoryGrid,
  CategoryIcon,
  CategoryList,
  Header,
  SafeAreaView,
  Text,
  TextInput,
} from '@/components';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { getCollections } from '@/selectors';

let timeoutChangeMode = null;

const NCategory = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [modeView, setModeView] = useState('th-list');
  const collections = useSelector(getCollections);
  const [category, setCategory] = useState(CategoryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // const onChangeView = () => {
  //   setLoading(true);
  //   clearTimeout(timeoutChangeMode);
  //   timeoutChangeMode = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   Utils.enableExperimental();
  //   let mode = 'columns';
  //   switch (modeView) {
  //     case 'columns':
  //       mode = 'th-large';
  //       break;
  //     case 'th-large':
  //       mode = 'list';
  //       break;
  //     case 'list':
  //       mode = 'grip-vertical';
  //       break;
  //     case 'grip-vertical':
  //       mode = 'th-list';
  //       break;
  //     case 'th-list':
  //       mode = 'bars';
  //       break;
  //     case 'bars':
  //       mode = 'columns';
  //       break;
  //     default:
  //       mode = 'columns';
  //       break;
  //   }
  //   setModeView(mode);
  // };

  const goToPost = (item) => {
    navigation.navigate('NPost', { collection: item });
  };

  const renderItem = ({ item, index }) => {
    if (item.id !== 8) {
      switch (modeView) {
        case 'columns':
          return (
            <CategoryBoxColor
              loading={loading}
              style={{
                paddingLeft: index % 2 === 0 ? 0 : 15,
                paddingBottom: 15,
              }}
              title={item?.name}
              icon={item?.logo}
              color={item?.color}
              onPress={() => goToPost(item)}
            />
          );
        case 'th-large':
          return (
            <CategoryBoxColor2
              loading={loading}
              style={{
                paddingLeft: index % 2 === 0 ? 0 : 15,
                paddingBottom: 15,
              }}
              title={item?.name}
              subtitle={item?.shortDescription}
              icon={item.logo}
              onPress={() => goToPost(item)}
            />
          );
        case 'list':
          return (
            <CategoryIcon
              loading={loading}
              style={{
                marginBottom: 10,
              }}
              title={item?.name.toUpperCase()}
              subtitle={item?.shortDescription}
              icon={item?.logo}
              color={item?.color}
              onPress={() => goToPost(item)}
            />
          );
        case 'grip-vertical':
          return (
            <CategoryGrid
              loading={loading}
              style={{
                paddingLeft: index % 2 === 0 ? 0 : 15,
                paddingBottom: 15,
              }}
              title={item?.name.toUpperCase()}
              subTitle={item?.shortDescription}
              icon={item?.logo}
              image={item?.logo}
              onPress={() => goToPost(item)}
            />
          );
        case 'th-list':
          return (
            <CategoryList
              loading={loading}
              style={{
                paddingBottom: 15,
              }}
              title={item?.name.toUpperCase()}
              subtitle={item?.description.slice(0, 90).concat('...')}
              icon={item?.logo}
              color={item?.color}
              image={item?.logo}
              onPress={() => goToPost(item)}
            />
          );
        case 'bars':
          return (
            <CategoryBlock
              loading={loading}
              style={{
                paddingBottom: loading ? 0 : 15,
              }}
              title={item?.name}
              subtitle={item?.shortDescription}
              icon={item?.logo}
              imageUri={item?.logo}
              onPress={() => goToPost(item)}
            />
          );

        default:
          return <CategoryBoxColor index={index} title={item.name} icon={item?.icon} color={item?.color} />;
      }
    } else {
      return null;
    }
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'columns':
        return 2;
      case 'th-large':
        return 2;
      case 'list':
        return 1;
      case 'grip-vertical':
        return 2;
      case 'th-list':
        return 1;
      case 'bars':
        return 1;
      default:
        return 1;
    }
  };

  const onChangeText = (text) => {
    setSearch(text);
    setCategory(text ? category.filter((item) => item.title.includes(text)) : CategoryData);
  };

  const renderContent = () => {
    return (
      <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
        <View style={BaseStyle.container}>
          <Header
            style={{ marginBottom: 20, borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}
            renderLeft={() => (
              <Text title1 bold style={{ fontSize: 22, fontWeight: '800' }}>
                {t('collections').toUpperCase()}
              </Text>
            )}
            title={''}
            styleLeft={{
              flex: 1,
            }}
            styleContentLeft={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 0,
              width: '100%',
            }}
            styleContentCenter={{
              flex: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            styleRight={{ flex: 0 }}
            // renderRight={() => {
            //   return <Icon name={modeView} size={20} color={BaseColor.grayColor} />;
            // }}
            // onPressRight={() => onChangeView()}
          />
          <TextInput
            style={[BaseStyle.textInput, Typography.body1]}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={t('search_collection')}
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={colors.primary}
            onSubmitEditing={() => {}}
          />
        </View>

        <FlatList
          key={getTotalCol()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          numColumns={getTotalCol()}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={collections}
          keyExtractor={(item) => item?.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default NCategory;
