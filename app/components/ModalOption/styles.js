import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 0,
    margin: 0,
  },
  contentFilterBottom: {
    paddingVertical: 16,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 20,
  },
  contentSwipeDown: {
    paddingTop: 10,
    alignItems: 'center',
  },
  lineSwipeDown: {
    width: 30,
    height: 2.5,
    backgroundColor: BaseColor.dividerColor,
  },
  contentActionModalBottom: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  image: {
    width: 18,
    height: 18,
    marginRight: 8,
    paddingTop: 2,
  },
});
