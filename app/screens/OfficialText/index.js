import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, ScrollView, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { PTasks, CategoryData } from '@/data';
import { Header, Icon, PSelectOption, SafeAreaView, Tag, Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import TicketOfficialText from '@/components/TicketOfficialText';
import { getDocumentTypes, getDocuments, getPublications, getResources } from '../../selectors';
import styles from './styles';

const OfficialText = ({ props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(PTasks);
  const publicationTypes = useSelector(getPublications);
  const resourcesData = useSelector(getResources);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
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
    if (resourcesData.length > 0) {
      const arrayList = [];
      resourcesData.map((item) => {
        item.resourcesDTO.forEach((elt) => {
          arrayList.push(elt);
        });
      });
      setResources(arrayList);
      setFilteredResources(arrayList);
    }
  }, [resourcesData]);

  useEffect(() => {
    const arrayList = [];
    resourcesData.map((item) => {
      item.resourcesDTO.forEach((elt) => {
        arrayList.push(elt);
      });
    });
    setResources(arrayList);
    setFilteredResources(arrayList);
    const ptypes = resourcesData.map((item) => {
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

    if (resources?.length > 0) {
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
  }, [resources, route.params?.format, route.params?.type]);

  const onChangeText = (text) => {
    setSearch(text);
    setFilteredResources(
      text ? resources.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())) : resources
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
    const resourcesInline = [...resources];
    resourcesInline.sort((a, b) => {
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
    return resourcesInline;
  };

  const onSort = () => {
    Utils.enableExperimental();
    switch (sort) {
      case 'sort':
        setFilteredResources(handleSort());
        setSort('caret-down');
        break;
      case 'caret-down':
        setFilteredResources(handleSort());
        setSort('caret-up');
        break;
      case 'caret-up':
        setFilteredResources(resources);
        setSort('sort');
        break;
      default:
        setFilteredResources(resources);
        setSort('sort');
        break;
    }
  };

  const goTaskDetail = (item) => {
    navigation.navigate('ResourceView', { item: item });
  };

  const onFilter = (data) => {
    if (data.id !== 0) {
      // setTasks(PTasks.filter((item) => item.id <= data.length));
      setFilteredResources(resources.filter((item) => item.resourceTypeId === data.id));
      //console.log(filteredPublications);
    } else {
      setFilteredResources(resources);
    }
  };

  const onAllFilter = (format, typeFilter) => {
    if (format.id !== 0 && typeFilter.id !== 0) {
      setFilteredResources(
        resources.filter(
          (item) => item.resourceTypeId === typeFilter.id && item.documentsDTO[0]?.documentTypeId === format.id
        )
      );
    } else {
      setFilteredResources(resources);
    }
  };

  const onFilterType = (data) => {
    if (data.id !== 0) {
      // setTasks(PTasks.filter((item) => item.id <= data.length));
      setFilteredResources(resources.filter((item) => item.documentsDTO[0]?.documentTypeId === data.id));
    } else {
      setFilteredResources(resources);
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

  const sumOfDownloadNumber = (items) => {
    if (items?.length > 0) {
      let number = 0;

      items.map((elt) => {
        number += elt.downloadNumber;
      });

      return number;
    }
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
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View style={BaseStyle.container}>
        <Header
          style={{ marginBottom: 20, borderBottomColor: '#DDDDDD', borderBottomWidth: 1 }}
          renderLeft={() => (
            <Text title1 bold style={{ fontSize: 22, fontWeight: '800' }}>
              {t('official_text').toUpperCase()}
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
        {/* <Header
          style={{ marginBottom: 20 }}
          renderLeft={() => (
            <Text header bold>
              {t('publications')}
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
        /> */}
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
          placeholder={t('search_official_text')}
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
          onPress={() => navigation.navigate('ResourceFilter')}
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
        data={filteredResources}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {
              setFilteredResources(resources);
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
          <TicketOfficialText
            title={item.name.toUpperCase()}
            description={item.description.slice(0, 120).concat('...')}
            priority={item.documentTypeName}
            date={timeAgo(item.updatedDate)}
            comments={sumOfDownloadNumber(item.documentsDTO)}
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

export default OfficialText;
