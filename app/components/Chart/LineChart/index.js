import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatAmount, parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';
import Loading from './Loading';

const ChartLineChart = ({ data, chartConfig = {} }) => {
  const { colors } = useTheme();
  if (!data) {
    return <Loading />;
  }

  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width + 90} // from react-native
      height={220}
      //yAxisLabel="$"
      //  yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      formatYLabel={(yLabel) => {
        return formatAmount(yLabel);
      }}
      chartConfig={{
        style: {
          borderRadius: 16,
        },
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.background,
        backgroundGradientTo: colors.background,
        color: (_opacity = 1) => parseHexTransparency(colors.text, 10),
        labelColor: (_opacity = 1) => colors.text,
        decimalPlaces: 0,
        paddingLeft: 0,
        ...chartConfig,
      }}
      // bezier
      style={{
        paddingRight: 80,
        paddingLeft: 0,
        marginHorizontal: 0,
        marginVertical: 8,
        marginLeft: 0,
      }}
      withVerticalLines={false}
      withDots={true}
      paddingLeft={'0'}
      fromZero={true}
      withInnerLines={true}
      bezier={true}
      yLabelsOffset={30}
      segments={4}
    />
  );
};

ChartLineChart.propTypes = {
  data: PropTypes.object,
  chartConfig: PropTypes.object,
};

export default ChartLineChart;
