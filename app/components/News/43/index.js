import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const News43 = (props) => {
  const { name, description, title, image, style, avatar, onPress, loading } = props;
  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground source={{ uri: image }} style={styles.imageBackground} borderRadius={8}>
        <View style={styles.viewBackground}>
          <View style={styles.viewItem}>
            {/* <ProfileAuthor
              styleThumb={styles.styleThumb}
              image={avatar}
              styleName={{ color: BaseColor.whiteColor }}
              styleDescription={{
                color: BaseColor.whiteColor,
              }}
              name={name}
              description={description}
            /> */}
          </View>
          <Text title1 whiteColor semibold>
            {name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

News43.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onPress: PropTypes.func,
};

News43.defaultProps = {
  style: {},
  image: Images.news,
  avatar: Images.profile2,
  name: '',
  description: '',
  title: '',
  onPress: () => {},
};

export default News43;
