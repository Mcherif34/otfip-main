import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, ScrollView, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PTasks, CategoryData } from '@/data';
import { Header, Icon, Ticket, PSelectOption, SafeAreaView, Tag, Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { getDocumentTypes, getDocuments, getPublications } from '../../selectors';
import styles from './styles';

const PTask = ({ props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(PTasks);
  const publicationTypes = useSelector(getPublications);
  const documents = useSelector(getDocuments);
  const documentTypes = useSelector(getDocumentTypes);
  const [publications, setPublications] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [sort, setSort] = useState('sort');
  const [type, setType] = useState([]);
  const [types, setTypes] = useState([]);
  const [status, setStatus] = useState([]);
  const [documentType, setDocumentType] = useState([]);
  const [category, setCategory] = useState(CategoryData);
  const [search, setSearch] = useState('');
  const [refreshing] = useState(false);

  useEffect(() => {
    const tabs = documents.filter((item) => item?.publicationTypeId !== 0);
    setPublications(tabs);
    setFilteredPublications(tabs);
    const ptypes = publicationTypes.map((item) => {
      return {
        id: item.id,
        value: item.name,
        iconName: '',
        iconColor: '#FF5E80',
        text: item.name,
        image: '',
      };
    });
    setTypes(ptypes);
    const array = documentTypes.map((item) => {
      return {
        id: item.id,
        value: item.name,
        iconName: '',
        text: item.name,
      };
    });
    setDocTypes(array);
  }, [publicationTypes, documents]);

  useEffect(() => {
    const formatFiltered = route.params?.format;
    const typeFiltered = route.params?.type;

    if (publications?.length > 0) {
      if (formatFiltered?.id || typeFiltered?.id) {
        if (formatFiltered?.id && typeFiltered?.id) {
          onAllFilter(formatFiltered, typeFiltered);
        } else if (formatFiltered?.id !== undefined && typeFiltered?.id === undefined) {
          onFilterType(formatFiltered);
        } else if (typeFiltered?.id !== undefined && formatFiltered?.id === undefined) {
          onFilter(typeFiltered);
        } else {
          setFilteredPublications(publications);
        }
      }
    }
  }, [publications, route.params?.format, route.params?.type]);

  const onChangeText = (text) => {
    setSearch(text);
    setFilteredPublications(
      text ? publications.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())) : publications
    );
  };

  // const handleSort = () => {
  //   const tasksInline = [...PTasks];
  //   tasksInline.sort((a, b) => {
  //     var priorityA = a.priorityID;
  //     var priorityB = b.priorityID;
  //     if (priorityB < priorityA) {
  //       return sort === 'caret-down' ? -1 : 1;
  //     }
  //     if (priorityB > priorityA) {
  //       return sort === 'caret-down' ? 1 : -1;
  //     }

  //     return 0;
  //   });
  //   return tasksInline;
  // };

  const handleSort = () => {
    const publicationsInline = [...publications];
    publicationsInline.sort((a, b) => {
      var A = a.name[0];
      var B = b.name[0];
      if (B < A) {
        return sort === 'caret-down' ? -1 : 1;
      }
      if (B > A) {
        return sort === 'caret-down' ? 1 : -1;
      }

      return 0;
    });
    return publicationsInline;
  };

  const onSort = () => {
    Utils.enableExperimental();
    switch (sort) {
      case 'sort':
        setFilteredPublications(handleSort());
        setSort('caret-down');
        break;
      case 'caret-down':
        setFilteredPublications(handleSort());
        setSort('caret-up');
        break;
      case 'caret-up':
        setFilteredPublications(publications);
        setSort('sort');
        break;
      default:
        setFilteredPublications(publications);
        setSort('sort');
        break;
    }
  };

  const goTaskDetail = (item) => {
    navigation.navigate('PublicationView', { item: item });
  };

  const onFilter = (data) => {
    if (data.id !== 0) {
      // setTasks(PTasks.filter((item) => item.id <= data.length));
      setFilteredPublications(publications.filter((item) => item.publicationTypeId === data.id));
      //console.log(filteredPublications);
    } else {
      setFilteredPublications(publications);
    }
  };

  const onAllFilter = (format, typeFilter) => {
    if (format.id !== 0 && typeFilter.id !== 0) {
      setFilteredPublications(
        publications.filter((item) => item.publicationTypeId === typeFilter.id && item.documentTypeId === format.id)
      );
    } else {
      setFilteredPublications(publications);
    }
  };

  const onFilterType = (data) => {
    if (data.id !== 0) {
      // setTasks(PTasks.filter((item) => item.id <= data.length));
      setFilteredPublications(publications.filter((item) => item.documentTypeId === data.id));
    } else {
      setFilteredPublications(publications);
    }
  };

  const onChangeType = (typeInline) => {
    onFilter(typeInline);
    setType(typeInline);
  };
  const onChangeDocumentType = (typeInline) => {
    onFilterType(typeInline);
    setDocumentType(typeInline);
  };
  const onChangeStatus = (typeInline) => {
    onFilter(typeInline);
    setStatus(typeInline);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View style={BaseStyle.container}>
        <Header
          style={{ marginBottom: 20, borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}
          renderLeft={() => (
            <Text title1 bold style={{ fontSize: 22, fontWeight: '800' }}>
              {t('publications').toUpperCase()}
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
        />
        <TextInput
          style={{
            height: 46,
            borderRadius: 5,
            paddingHorizontal: 10,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#F5F5F4',
          }}
          onChangeText={onChangeText}
          autoCorrect={false}
          placeholder={t('search_publication')}
          placeholderTextColor={BaseColor.grayColor}
          value={search}
          selectionColor={colors.primary}
          onSubmitEditing={() => {}}
        />
      </View>
      <View style={[styles.filter, { borderColor: colors.border }]}>
        <Tag
          gray
          style={{
            borderRadius: 3,
            backgroundColor: BaseColor.kashmir,
            marginHorizontal: 5,
            paddingVertical: 3,
          }}
          textStyle={{
            paddingHorizontal: 4,
            color: BaseColor.whiteColor,
          }}
          icon={<Icon name={sort} color={BaseColor.whiteColor} size={10} />}
          onPress={onSort}
        >
          {t('sort')}
        </Tag>
        <Tag
          gray
          style={{
            borderRadius: 3,
            backgroundColor: BaseColor.kashmir,
            marginHorizontal: 5,
            paddingVertical: 3,
          }}
          textStyle={{
            paddingHorizontal: 4,
            color: BaseColor.whiteColor,
          }}
          icon={<Icon name="sliders-h" color={BaseColor.whiteColor} size={10} />}
          onPress={() => navigation.navigate('PublicationFilter')}
        >
          {t('filter')}
        </Tag>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {types.length > 0 && (
            <PSelectOption title={t('type')} options={types} value={type} onPress={(item) => onChangeType(item)} />
          )}
          {docTypes.length > 0 && (
            <PSelectOption
              title={t('Formats de documents')}
              options={docTypes}
              value={documentType}
              onPress={(item) => onChangeDocumentType(item)}
            />
          )}
          {/* <PSelectOption
            title={t('status')}
            options={PTaskStatus}
            value={status}
            onPress={(item) => onChangeStatus(item)}
          /> */}
        </ScrollView>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={filteredPublications}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {
              setFilteredPublications(publications);
            }}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <Text>{t('empty_data')}</Text>
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <Ticket
            title={item.name.toUpperCase()}
            description={item.description}
            priority={item.documentTypeName}
            date={item.updatedDate}
            comments={item.downloadNumber}
            members={item.members}
            onPress={() => goTaskDetail(item)}
            style={{
              marginBottom: 20,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default PTask;
