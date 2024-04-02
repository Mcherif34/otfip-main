import { Placeholder, PlaceholderLine } from '@/components/Placeholder';
import styles from './styles';

const Loading = (props) => {
  return (
    <Placeholder style={{
      width: 500,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      marginBottom: 0,
    }}>
      <PlaceholderLine style={{
        height: 120,
        width: 400
      }} />
      {/* <PlaceholderLine width={100} />
      <PlaceholderLine width={50} /> */}
    </Placeholder>
  );
};

export default Loading;
