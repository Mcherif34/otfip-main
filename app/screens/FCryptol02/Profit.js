import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from '@/components';
import { getDocuments } from '@/selectors';

export default ({ dataset }) => {
  const { t } = useTranslation();
  const documents = useSelector(getDocuments);
  const datasetDocuments = documents.filter((item) => item.datasetId === dataset.id);

  const navigation = useNavigation();

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     console.log(dataset);
  //   },1000)
  // },[]);

  const RenderDocument = ({ item }) => {
    return (
      <View
        style={{
          marginBottom: 20,
          paddingBottom: 10,
          borderColor: '#ECECEC',
          borderBottomWidth: 1,
        }}
      >
        <Text bold body2>
          {item.name}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text light>Dernière modification : </Text>
            <Text>{item.updatedDate} </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text light>Taille du fichier : </Text>
            <Text>{item.size} MB </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Text light>Nombre de téléchargements : </Text>
            <Text>{item.downloadNumber} </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#3498DB',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#3498DB',
              paddingHorizontal: 10,
              paddingVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
            onPress={() => {
              Linking.openURL(item.url);
            }}
          >
            <Icon name="download" color="white" />
            <Text
              style={{
                marginLeft: 5,
              }}
              whiteColor
            >
              Télécharger
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Visualization', { url: item.url });
            }}
            style={{
              marginLeft: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#3498DB',
              paddingHorizontal: 10,
              paddingVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Icon name="eye" color="#3498DB" />
            <Text
              style={{
                marginLeft: 5,
              }}
              primaryColor
            >
              Visualiser
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {datasetDocuments.map((item) => (
            <RenderDocument key={item.id} item={item} />
          ))}
          {/* <View
            style={{
              marginBottom: 15,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Text title3>{t('overview')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('market_value')} value="$997.39" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('holdings')} value="100B" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('net_cost')} value="$99739" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('avg_net_cost')} value="$5000" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('profit_lost')} value="-" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('percent_change')} value="-" />
            </View>
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};
