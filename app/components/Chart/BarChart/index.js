import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { BaseColor, useTheme } from '@/config';
import { formatAmount } from '@/utils';

const ChartBarChart = ({ data = {} }) => {
  const { colors } = useTheme();
  return (
    <BarChart
      data={data}
      width={Dimensions.get('window').width - 30} // from react-native
      height={300}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        // barPercentage: 1,
        propsForBackgroundLines: {
          strokeWidth: 0.5,
          stroke: colors.border,
          x: 50,
        },
        propsForLabels: {
          color: 'red',
          // marginLeft: 10,
        },
        backgroundGradientToOpacity: 0.5,
        color: () => BaseColor.primaryColor,
        fillShadowGradient: BaseColor.primaryColor,
        fillShadowGradientOpacity: 1,
        labelColor: (_opacity = 1) => colors.text,
        barPercentage: 0.5,
        // decimalPlaces: 0,
        // formatYLabel={(value) => formatAmount(value)}
        formatYLabel: (yLabel) => {
          return formatAmount(yLabel);
        },
        // useShadowColorFromDataset: true, // optional
      }}
      // verticalLabelRotation={20}
      style={{
        marginHorizontal: 0,
        marginVertical: 8,
        paddingHorizontal: 0,
        // borderRadius: 16,
        // borderColor: '#EBEBEB',
        // borderWidth: 1,
      }}
      yAxisLabel=""
      showBarTops={true}
      showValuesOnTopOfBars={false}
      withVerticalLabels
      withInnerLines
      fromZero

      // horizontalLabelRotation={20}
    />
  );
};

ChartBarChart.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

export default ChartBarChart;
