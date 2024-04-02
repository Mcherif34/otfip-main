import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/config';

const Visualization = ({ route }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { url } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            flex: 1,
            zIndex: 50,
            backgroundColor: '#ECECEC',
            borderRadius: 30,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>
        <WebView source={{ uri: url }} />

        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text title1>Bitcoin (BTC)</Text>
              <Text title3 style={{ marginTop: 10 }}>
                A peer-to-peer electric cash system
              </Text>
            </View>
            <Image source={Images.coinBitcon} style={{ width: 40, height: 40 }} />
          </View>
          <Text body2>
            Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be
            sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.
          </Text>
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 15,
              paddingBottom: 10,
            }}
          >
            <Text title3>{t('organization')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('incorporated_in')} value="Bitcoin" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('consensus_method')} value="Proof-of-Work" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <LabelUpper2Row style={{ flex: 1 }} label={t('token_type')} value="Native" />
              <LabelUpper2Row style={{ flex: 1 }} label={t('token_use')} value="Payments" />
            </View>
          </View>
          <Text title3>{t('links')}</Text>
          {FLinks.map((item) => (
            <ListMenuIcon key={item.id} icon={item.icon} title={item.title} />
          ))}
        </ScrollView> */}
      </View>
    </View>
  );
};

export default Visualization;
