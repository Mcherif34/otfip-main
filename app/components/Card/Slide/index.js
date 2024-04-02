import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { BaseColor, Images, useTheme } from '@/config';
import Text from '@/components/Text';
import { scaleWithPixel } from '@/utils';
import styles from './styles';
import Loading from './Loading';

const CardSlide = (props) => {
  let { date, title, image, style, onPress, loading, collection, imageUri } = props;
  const { colors } = useTheme();
  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          position: 'relative',
          marginTop: -10
        },
        style,
      ]}
      onPress={onPress}
    >
      {imageUri ? (
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.imageBackground}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
        />
      ) : (
        <ImageBackground
          source={image}
          style={styles.imageBackground}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
        />
      )}

      <Text headline bold style={{ fontSize: 15, padding: 7, paddingLeft: 12 }} numberOfLines={2}>
        {title}
      </Text>
      <Text subhead grayColor style={{ fontSize: 12, margin: 5, marginTop: 0, padding: 7, paddingTop: 0 }}>
        {date}
      </Text>
      {collection ? (
        <View
          style={{
            position: 'absolute',
            top: scaleWithPixel(5),
            right: scaleWithPixel(5),
            paddingHorizontal: scaleWithPixel(10),
            paddingVertical: scaleWithPixel(3),
            backgroundColor: BaseColor.primaryColor,
            borderRadius: scaleWithPixel(10)
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: scaleWithPixel(8),
            }}
          >
            {collection?.toUpperCase()}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

CardSlide.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  collection: PropTypes.string,
  onPress: PropTypes.func,
};

CardSlide.defaultProps = {
  style: {},
  image: Images.news,
  date: '',
  title: '',
  onPress: () => {},
};

export default CardSlide;
