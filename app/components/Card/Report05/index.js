import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { parseHexTransparency } from '@/utils';
import { useTheme, BaseColor } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const CardReport05 = ({ title = '', price = '', icon = '', style = {}, onPress = () => {}, disabled = false, currency }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity disabled={disabled} style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.primaryLight,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: parseHexTransparency(BaseColor.whiteColor, 30),
              },
            ]}
          >
            <Icon name={icon} size={12} style={{ color: BaseColor.whiteColor }} solid />
          </View>
        </View>
        <Text title3 whiteColor style={{ fontSize: 14, marginTop: 15 }}>
          {title}
        </Text>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
        }}>
          <Text title2 whiteColor style={{ marginTop: 10, marginRight:5 }}>
            {price}
          </Text>
          <Text footer whiteColor style={{ marginTop: 15, }}>
            {currency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CardReport05.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
};

export default CardReport05;
