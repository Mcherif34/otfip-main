import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { PTaskPriority, PTaskStatus, PTaskType } from '@/data';
import { Button, Header, Icon, PaymentOption, SafeAreaView, Tag, Text } from '@/components';
import { getDocumentTypes, getPublications } from '@/selectors';
import styles from './styles';

const PFilter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [status, setStatus] = useState(PTaskStatus[0]);
  const [type, setType] = useState({});
  const [format, setFormat] = useState({});
  const documentTypes = useSelector(getDocumentTypes);
  const publications = useSelector(getPublications);
  const [docTypes, setDocTypes] = useState([]);
  const [pubTypes, setPubTypes] = useState([]);
  const [priority, setPriority] = useState(PTaskPriority[0]);
  const [loading, setLoading] = useState(false);
  // const authors = useSelector(getAuthors);

  useEffect(() => {
    const array = documentTypes.map((item) => {
      return {
        id: item.id,
        value: item.name,
        text: item.name,
      };
    });
    setDocTypes(array);

    const arrayType = publications.map((item) => {
      return {
        id: item.id,
        value: item.name,
        text: item.name,
      };
    });
    setPubTypes(arrayType);
  }, [documentTypes]);

  const onClear = () => {
    // setStatus(PTaskStatus[0]);
    setType({});
    setFormat({});
  };

  const renderItem = ({ item, checked, onPress }) => {
    return (
      <Tag
        key={item.id}
        icon={checked ? <Icon style={{ marginRight: 5 }} name="check" color={BaseColor.whiteColor} size={16} /> : null}
        primary={checked}
        outline={!checked}
        style={{
          marginTop: 8,
          marginRight: 8,
          height: 28,
          minWidth: 100,
        }}
        onPress={onPress}
      >
        {item.text}
      </Tag>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('filtering')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('clear')}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={onClear}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {/* <Text headline semibold>
            {t('status')}
          </Text>
          <View style={styles.wrapContent}>
            {PTaskStatus.map((item, index) => (
              <Fragment key={index}>
                {renderItem({
                  item,
                  index,
                  checked: item.value === status.value,
                  onPress: () => setStatus(item),
                })}
              </Fragment>
            ))}
          </View> */}
          <Text headline semibold style={{ marginTop: 20 }}>
            {t('format')}
          </Text>
          <View style={styles.wrapContent}>
            {docTypes.length > 0 &&
              docTypes.map((item, index) => (
                <Fragment key={index}>
                  {renderItem({
                    item,
                    index,
                    checked: item.value === format.value,
                    onPress: () => {
                      setFormat(item);
                    },
                  })}
                </Fragment>
              ))}
          </View>
          <Text headline semibold style={{ marginTop: 20, marginBottom: 5 }}>
            {t('type')}
          </Text>
          <View>
            {pubTypes.length > 0 &&
              pubTypes.map((item, index) => (
                <PaymentOption
                  key={index}
                  style={{}}
                  isIcon={false}
                  checked={item.value === type.value}
                  title={item.text}
                  onPress={() => {
                    setType(item);
                  }}
                />
              ))}
          </View>
          {/* <Text headline semibold style={{ marginTop: 20 }}>
            {t('assignee')}
          </Text>
          <View style={styles.wrapContent}>
            {authors.map((item, index) => {
              return (
                <Fragment key={index}>
                  <View
                    style={{
                      width: '25%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ProfileGridSmall image={item.image} name={item.name} onPress={() => {}} />
                  </View>
                  {index === PTeamMembersInCreate.length - 1 && (
                    <View
                      key={index}
                      style={{
                        width: '25%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PButtonAddUser
                        onPress={() =>
                          navigation.navigate('PSelectAssignee', {
                            members: PTeamMembersInCreate,
                          })
                        }
                      />
                    </View>
                  )}
                </Fragment>
              );
            })}
          </View> */}
          {/* <Text headline style={{ marginTop: 10, marginBottom: 5 }}>
            {t('schedule')}
          </Text>
          <FormDoubleSelectOption titleLeft={t('start_date')} titleRight={t('end_date')} /> */}
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.navigate('Publication', { format: format, type: type });
              setLoading(false);
            }, 300);
          }}
          loading={loading}
        >
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PFilter;
