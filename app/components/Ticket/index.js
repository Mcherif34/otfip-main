import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Avatars from '@/components/Avatars';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import FileType from '../FileType';
import styles from './styles';

const Ticket = ({
  style,
  onPress,
  title,
  description,
  onOption,
  members = [],
  limit = 3,
  date = 100,
  comments = 0,
  priority = '',
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { namePriority, priorityColor } = useMemo(() => {
    switch (priority) {
      case 'Adobe PDF':
        return {
          namePriority: t(priority),
          priorityColor: BaseColor.pdfColor,
        };
      case 'WORD':
        return {
          namePriority: t(priority),
          priorityColor: BaseColor.wordColor,
        };
      case 'Vidéo':
        return {
          namePriority: t(priority),
          priorityColor: BaseColor.youtubeColor,
        };
      default:
        return {
          namePriority: t(priority),
          priorityColor: BaseColor.greenColor,
        };
    }
  }, [priority]);

  const iconHandler = (priority) => {
    switch (priority) {
      case 'Adobe PDF':
        return 'file-pdf';

      case 'Word':
        return 'file-word';

      case 'Vidéo':
        return 'youtube';

      default:
        break;
    }
  };

  return (
    <View style={[styles.contain, style]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
            <Text
              headline
              medium
              numberOfLines={2}
              style={{
                fontSize: 15,
              }}
            >
              {title}
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'flex-end', paddingLeft: 5 }}>
            {/* <TouchableOpacity
              hitSlop={{ top: 10, right: 10, left: 10 }}
              style={{ paddingBottom: 5 }}
              onPress={onOption}
            >
              <Icon name="ellipsis-h" size={14} />
            </TouchableOpacity> */}
            {/* <FileType
              light
              textStyle={{
                color: BaseColor.whiteColor,
              }}
              style={{
                backgroundColor: priorityColor,
                paddingHorizontal: 10,
                minWidth: 0,
              }}
              icon={<Icon solid name={iconHandler(priority)} size={14} color={BaseColor.whiteColor} />}
            >
              {priority}
            </FileType> */}
          </View>
        </View>
        {/* 
        <Text
          caption2
          light
          style={{
            paddingTop: 10,
          }}
        >
          {description}
        </Text> */}
        <View
          style={[
            styles.footer,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.footerLeft}>
            <Icon solid name="calendar-alt" size={14} color={BaseColor.kashmir} />
            <Text
              light
              caption1
              style={{
                paddingLeft: 5,
                paddingRight: 20,
                color: BaseColor.kashmir,
              }}
            >
              {date}
            </Text>

            <Icon solid name="download" size={14} color={BaseColor.kashmir} />
            <Text
              light
              caption1
              style={{
                paddingHorizontal: 5,
                color: BaseColor.kashmir,
              }}
            >
              {comments} {t('downloads')}
            </Text>
          </View>
          <Avatars users={members} limit={limit} styleThumb={{ width: 30, height: 30 }} />
        </View>
      </View>
    </View>
  );
};

Ticket.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onOption: PropTypes.func,
};

export default Ticket;
