import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseColor, Images } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import { getDocuments } from '@/selectors';
import { scaleWithPixel } from '@/utils';
import Loading from './Loading';
import styles from './styles';
import { upperCase } from 'lodash';

const NewsList = (props) => {
  const documents = useSelector(getDocuments);
  const { style, onPress, image, imageUrl, title, subtitle, date, loading, documentId, author } = props;
  const document = documents.find((doc) => doc.id === documentId);
  let documentTypeColor = BaseColor.primaryColor;

  if (loading) {
    return <Loading style={style} />;
  }
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image source={image} style={styles.image} />
      )}
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            width: scaleWithPixel(40),
            backgroundColor: documentTypeColor,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scaleWithPixel(2),
          }}
        >
          {document && (
            <Text
              whiteColor
              semibold
              grayColor
              style={{
                fontSize: scaleWithPixel(10),
              }}
            >
              {document.documentTypeId === 1 ? 'PDF' : 'WORD'}
            </Text>
          )}
        </View>
        <Text headline bold style={{ fontSize: 15, marginTop: 5 }} numberOfLines={2}>
          {title}
        </Text>
        <Text
          regular
          light
          grayColor
          style={{
            fontSize: 12,
            marginTop: 5
          }}
        >
          DATE : {date}
        </Text>
        <Text
          regular
          light
          grayColor
          style={{
            marginTop: scaleWithPixel(3),
            fontSize: 12
          }}
        >
          AUTEUR : {author.toUpperCase()}
        </Text>
        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

NewsList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
};

NewsList.defaultProps = {
  style: {},
  onPress: () => {},
  image: Images.news,
  title: '',
  subtitle: '',
  date: '',
};

export default NewsList;
