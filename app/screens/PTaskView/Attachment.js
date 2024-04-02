import { Fragment } from 'react';
import { Linking } from 'react-native';
import { CardFileAttachment } from '@/components';

const Attachment = (props) => {
  const { item } = props;

  return (
    <Fragment>
      <CardFileAttachment
        style={{ paddingHorizontal: 0 }}
        icon={item.documentTypeIcon}
        name={item.name?.toUpperCase()}
        percent={item.percent}
        size={item.size}
        backgroundIcon={item.backgroundIcon}
        onPress={() => {
          Linking.openURL(item.url);
        }}
      />
    </Fragment>
  );
};

export default Attachment;
