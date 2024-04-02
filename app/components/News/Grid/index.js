import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';
import Loading from './Loading';

const NewsGrid = (props) => {
  let { title, style, image = null, onPress, loading, imageStyle, componentTitle, shortDescription } = props;
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {image ? (
          <ImageBackground source={{ uri: image }} style={[styles.imageBackground, imageStyle]} borderRadius={8} />
        ) : (
          <ImageBackground source={Images.main_doc} style={[styles.imageBackground, imageStyle]} borderRadius={8} />
        )}
        {componentTitle ? (
          componentTitle
        ) : (
          <>
            <Text body2 bold style={styles.title} numberOfLines={3}>
              {title}
            </Text>
            <Text footnote light style={styles.title} numberOfLines={3}>
              {shortDescription}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

NewsGrid.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

NewsGrid.defaultProps = {
  style: {},
  image: Images.news,
  title: '',
  onPress: () => {},
  imageStyle: {},
};

export default NewsGrid;
