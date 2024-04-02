import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import ProgressBar from '@/components/Progress/Bar';
import * as Utils from '@/utils';
import styles from './styles';

const FileAttachment = ({
  icon = '',
  style = {},
  name = '',
  size = '',
  onPress = () => {},
  percent = '0',
  backgroundIcon = '',
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { percentInt, isNormal, isLoading, isCompleted } = useMemo(() => {
    let data = {
      isNormal: true,
      isLoading: false,
      isCompleted: false,
      percentInt: 0,
    };

    try {
      const percentParsed = parseInt(percent, 10);
      data.percentInt = percentParsed;
      if (percentParsed > 0 && percentParsed < 100) {
        data.isNormal = false;
        data.isCompleted = false;
        data.isLoading = true;
      } else if (percentParsed >= 100) {
        data.isNormal = false;
        data.isCompleted = true;
        data.isLoading = false;
      }
      return data;
    } catch (error) {
      return data;
    }
  }, [percent]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: colors.card }]}>
        <Image height={Utils.scaleWithPixel(40)} width={Utils.scaleWithPixel(40)} source={{ uri: icon }} />
        {/* <Icon name={icon} size={18} style={{ color: BaseColor.whiteColor }} solid /> */}
      </View>
      <View
        style={{
          paddingLeft: 15,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              medium
              style={{
                // fontWeight: '600',
                marginTop: 10,
              }}
            >
              {name}
            </Text>
            <Text
              body2
              bold
              style={{
                fontSize: 12,
                marginTop: 8,
              }}
            >
              {t('file_size').toUpperCase()} : <Text>{size} MB</Text>
            </Text>
          </View>

          <TouchableOpacity disabled={!isLoading} style={{ paddingHorizontal: 10, marginTop: 10 }}>
            {/* {isLoading && <Icon name="times-circle" size={14} solid color={BaseColor.kashmir} />}
            {isCompleted && <Icon name="check" size={14} solid color={BaseColor.greenColor} />} */}
            {isNormal && <Icon name="download" size={24} solid color={BaseColor.kashmir} />}
          </TouchableOpacity>
        </View>
        {!isNormal && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ProgressBar style={{ flex: 1, paddingRight: 20 }} percent={percentInt} color={BaseColor.blueColor} />
            <Text footnote light style={{ paddingHorizontal: 10 }}>
              {`${percentInt}%`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

FileAttachment.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  backgroundIcon: PropTypes.string,
};

export default FileAttachment;
