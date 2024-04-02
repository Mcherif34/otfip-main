import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Share, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { BaseColor, useTheme } from '@/config';
import { getRandomColor } from '@/utils';
import { BarChart, LineChart, Text, PSelectOption, PieChart, Icon } from '@/components';
import LabelUpper2Row from '@/components/Label/Upper2Row';
import { getAttributes, getDatas } from '@/selectors';
import { PProject } from '@/data';

export const YearList = [
  {
    value: 2023,
    text: '2023',
  },
  {
    value: 2022,
    text: '2022',
  },
  {
    value: 2021,
    text: '2021',
  },
  {
    value: 2020,
    text: '2020',
  },
  {
    value: 2019,
    text: '2019',
  },
];

export const DataType = [
  {
    value: 1,
    text: 'Toutes les données',
  },
  {
    value: 2,
    text: 'Dépenses',
  },
  {
    value: 3,
    text: 'Recettes',
  },
];

const dataLine = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
    {
      data: [10, 35, 58, 70, 49, 93],
      color: (opacity = 1) => `#000`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days', 'pluie'], // optional
};

const Detail = ({ onUnWatch = () => { }, dataset }) => {
  const navigation = useNavigation();
  // console.error(dataset);
  const { colors } = useTheme();
  const [year, setYear] = useState({});
  const [type, setType] = useState({});
  const [projects, setProjects] = useState(PProject);
  const [showAction, setShowAction] = useState(false);
  const { t } = useTranslation();
  const datas = useSelector(getDatas);
  const attributes = useSelector(getAttributes);
  const datasetDatas = datas.filter((item) => item.datasetId === dataset.id);
  const [dataGraph, setDataGraph] = useState([]);
  const [dataPieChart, setDataPieChart] = useState([]);
  const [dataLineChart, setDataLineChart] = useState();
  const [dataDonutChart, setDataDonutChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(true);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://codecanyon.net/user/passionui/portfolio',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // useEffect(() => {
  //   const getDatasetData = () => {
  //     datasetDatas.map((item) => {
  //       getAllXAxisAttribute(item.id, new Date().getFullYear())
  //         .then((xAxisData) => {
  //           getAllYAxisAttribute(item.id, new Date().getFullYear())
  //             .then((yAxisData) => {
  //               setTimeout(() => {
  //                 var newDataGraph = [
  //                   ...dataGraph,
  //                   {
  //                     [item.id]: {
  //                       labels: xAxisData,
  //                       datasets: [
  //                         {
  //                           data: yAxisData,
  //                         },
  //                       ],
  //                     },
  //                   },
  //                 ];
  //                 setDataGraph(newDataGraph);
  //                 setLoading(false);
  //               }, 5000);
  //             })
  //             .catch((error) => {
  //               console.log('Error when fetch dataset data', error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.log('Error when fetch dataset data', error);
  //         });
  //     });
  //   };

  //   getDatasetData();
  // }, []);

  const filterDataGraph = (dataId, yearInline, typeInline) => {
    const updatedDataGraph = [...dataGraph];
    const typeFilter = typeInline;
    const yearFilter = yearInline;
    var xAxisData, xAxisCode, yAxisData;

    if (typeFilter === undefined) {
      xAxisData = attributes
        .filter((att) => att.dataId === dataId && att.axis === true && att.year === yearFilter)
        .map((att) => att.code);
      xAxisCode = attributes
        .filter((att) => att.dataId === dataId && att.axis === true && att.year === yearFilter)
        .map((att) => {
          const object = {
            name: att.value,
            code: att.code,
          };
          return object;
        });
      yAxisData = attributes
        .filter((att) => att.dataId === dataId && att.axis === false && att.year === yearFilter)
        .map((att) => att.value);
    } else {
      if (typeFilter === 1) {
        xAxisData = attributes
          .filter((att) => att.dataId === dataId && att.axis === true && att.year === yearFilter)
          .map((att) => att.code);
        xAxisCode = attributes
          .filter((att) => att.dataId === dataId && att.axis === true && att.year === yearFilter)
          .map((att) => {
            const object = {
              name: att.value,
              code: att.code,
            };
            return object;
          });
        yAxisData = attributes
          .filter((att) => att.dataId === dataId && att.axis === false && att.year === yearFilter)
          .map((att) => att.value);
      } else {
        xAxisData = attributes
          .filter(
            (att) =>
              att.dataId === dataId && att.axis === true && att.year === yearFilter && att.dataTypeId === typeFilter
          )
          .map((att) => att.code);
        xAxisCode = attributes
          .filter(
            (att) =>
              att.dataId === dataId && att.axis === true && att.year === yearFilter && att.dataTypeId === typeFilter
          )
          .map((att) => {
            const object = {
              name: att.value,
              code: att.code,
            };
            return object;
          });
        yAxisData = attributes
          .filter(
            (att) =>
              att.dataId === dataId && att.axis === false && att.year === yearFilter && att.dataTypeId === typeFilter
          )
          .map((att) => att.value);
      }
    }

    const updatedDataGraphItem = {
      labels: xAxisData,
      datasets: [
        {
          data: yAxisData,
        },
      ],
      code: xAxisCode,
    };

    const index = dataGraph.findIndex((item) => item[dataId] !== undefined);

    if (index !== -1) {
      updatedDataGraph[index] = {
        [dataId]: updatedDataGraphItem,
      };
    }
    // Mettez à jour l'élément du tableau en utilisant l'index
    //  updatedDataGraph[index] = updatedDataGraphItem;
    setDataGraph(updatedDataGraph);
  };

  const getDatasetDataBy = async (yearInline, typeInline) => {
    const newDataGraph = [];
    const dateYear = yearInline ? yearInline : new Date().getFullYear();
    // const typeId = typeInline || 3;
    for (const item of datasetDatas) {
      // setDataGraph([]);
      // setDataDonutChart([]);
      // setDataPieChart([]);
      // setDataLineChart([]);
      if (item.chart === 'bar') {
        setDataGraph([]);
        try {
          const xAxisData = attributes
            .filter((att) => att.dataId === item.id && att.axis === true && att.year === dateYear)
            .map((att) => att.code);

          const xAxisCode = attributes
            .filter((att) => att.dataId === item.id && att.axis === true && att.year === dateYear)
            .map((att) => {
              const object = {
                name: att.value,
                code: att.code,
              };
              return object;
            });

          const yAxisData = attributes
            .filter((att) => att.dataId === item.id && att.axis === false && att.year === dateYear)
            .map((att) => att.value);

          newDataGraph.push({
            [item.id]: {
              labels: xAxisData,
              datasets: [
                {
                  data: yAxisData,
                },
              ],
              code: xAxisCode,
            },
          });
        } catch (error) {
          console.error('Error when fetch dataset data', error);
        }
        setDataGraph(newDataGraph);
      }

      if (item.chart === 'donut') {
        setDataDonutChart([]);
        var donutData = [];
        // console.warn(dateYear);
        const xAxisData = attributes
          .filter((att) => att.dataId === item.id && att.axis === true && att.year === dateYear)
          .map((att) => att.value);
        // console.warn(xAxisData);
        const yAxisData = attributes
          .filter((att) => att.dataId === item.id && att.axis === false && att.year === dateYear)
          .map((att) => parseFloat(att.value));
        // console.error(yAxisData);

        let prev = [];
        for (var i = 0; i < xAxisData.length; i++) {
          var dataColor = getRandomColor(prev);
          donutData.push({
            name: xAxisData[i],
            valeur: yAxisData[i],
            color: dataColor,
            legendFontColor: dataColor,
            legendFontSize: 15,
          });
          prev.push(dataColor);
        }
        setDataDonutChart(donutData);
      }
      if (item.chart === 'pie') {
        setDataPieChart([]);
        var pieData = [];
        const xAxisData = attributes
          .filter((att) => att.dataId === item.id && att.axis === true && att.year === dateYear)
          .map((att) => att.value);

        const yAxisData = attributes
          .filter((att) => att.dataId === item.id && att.axis === false && att.year === dateYear)
          .map((att) => parseFloat(att.value));
        let prev = [];
        for (var j = 0; j < xAxisData.length; j++) {
          var dataColorLine = getRandomColor(prev);
          pieData.push({
            name: xAxisData[j],
            valeur: yAxisData[j],
            color: dataColorLine,
            legendFontColor: dataColorLine,
            legendFontSize: 15,
          });
        }
        prev.push(dataColorLine);
        setDataPieChart(pieData);
      }

      if (item.chart === 'line') {
        setDataLineChart([]);
        var lineData = {};
        const series = attributes
          .filter((att) => att.dataId === item.id && att.parentId === null && att.year === dateYear)
          .map((att) => {
            return { id: att.id, value: att.value, axis: att.axis, code: att.code };
          });
        // console.log('1');
        var xAxisArray = [];

        for (var s = 0; s < series.length; s++) {
          var xAxis = attributes
            .filter(
              (att) =>
                att.dataId === item.id && att.parentId === series[s].id && att.axis === true && att.year === dateYear
            )
            .map((att) => {
              return { id: att.id, value: att.value };
            });

          xAxisArray.push(xAxis);
        }
        var dataY = [];
        // console.log(xAxisArray);
        for (var x = 0; x < xAxisArray.length; x++) {
          var currentDataY = [];
          // console.warn(xAxisArray[x]);
          for (var j = 0; j < xAxisArray[x]?.length; j++) {
            var tab = attributes
              .filter((att) => att.parentId === xAxisArray[x][j]?.id && att.axis === false && att.year === dateYear)
              .map((att) => parseFloat(att.value));
            currentDataY.push(tab[0]);
            // console.error(tab);
          }
          dataY.push(currentDataY);
        }
        // console.log(dataY);
        // console.log('3');
        var uniqueValues = [];

        for (var i = 0; i < xAxisArray.length; i++) {
          for (var j = 0; j < xAxisArray[i].length; j++) {
            uniqueValues.push(xAxisArray[i][j].value);
          }
        }
        // Utiliser un Set pour éliminer les doublons
        var distinctValues = [...new Set(uniqueValues)];

        var datasets = [];
        var legend = [];
        var xAxisCode = [];
        var prev = [];
        for (var k = 0; k < series.length; k++) {
          var c = getRandomColor(prev);
          console.log(c);
          var obj = {
            data: dataY[k],
            color: (c) => {
              c = getRandomColor(prev);
              return c;
            },
            strokeWidth: 2,
          };
          legend.push(series[k].code);
          datasets.push(obj);
          xAxisCode.push({
            code: series[k].code,
            name: series[k].value,
          });
          prev.push(c);
        }

        lineData = {
          labels: distinctValues,
          datasets: datasets,
          // legend: legend,
        };

        newDataGraph.push({
          [item.id]: {
            code: xAxisCode,
          },
        });
        setDataLineChart(lineData);
      }
    }
  };

  useEffect(() => {
    getDatasetDataBy();
  }, []);

  useEffect(() => {
    if (dataGraph?.length > 0 && dataPieChart?.length > 0) {
      setLoading(false);
    } else {
      setDataAvailable(false);
      setLoading(false);
    }
  }, [dataGraph, dataPieChart]);

  const onChangeYear = async (dataId, yearInline) => {
    setYear(yearInline);
    filterDataGraph(dataId, yearInline.value, type.value);
    await getDatasetDataBy(yearInline.value, type.value);
  };

  const onChangeType = async (dataId, typeInline) => {
    setType(typeInline);
    filterDataGraph(dataId, year.value, typeInline.value);
    await getDatasetDataBy(year.value, type.value);
  };

  // console.warn(dataset.id);

  return dataset?.id !== 2 ? (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {datasetDatas.map((item, index) => (
            <View
              style={{
                marginBottom: 50,
              }}
              key={`${item.name}_${index}_${Math.random()}`}
            >
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: '50%',
                  }}
                >
                  <Text title3>{item.name}</Text>
                </View>
                {item.chart !== 'donut' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <PSelectOption
                      title={type?.value ? type.text : t('Type de donnée')}
                      options={DataType}
                      value={type}
                      onPress={(typeItem) => onChangeType(item.id, typeItem)}
                    />
                    <PSelectOption
                      title={year?.value ? year.value : t('Année')}
                      options={YearList}
                      value={year}
                      onPress={(yearItem) => onChangeYear(item.id, yearItem)}
                    />
                  </View>
                )}
              </View>

              {loading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <ActivityIndicator large />
                  <Text footnote>Chargement...</Text>
                </View>
              ) : (
                <ScrollView horizontal>
                  {item.chart === 'bar' && (
                    <BarChart
                      data={dataGraph.find((obj) => obj[item.id])?.[item.id]}
                      chartConfig={{
                        color: BaseColor.primaryColor,
                      }}
                    />
                  )}
                  {item.chart === 'donut' && (
                    <PieChart
                      data={dataDonutChart}
                      chartConfig={{
                        color: BaseColor.primaryColor,
                      }}
                    />
                  )}
                  {item.chart === 'pie' && (
                    <PieChart
                      data={dataPieChart}
                      chartConfig={{
                        color: BaseColor.primaryColor,
                      }}
                    />
                  )}
                  {item.chart === 'line' && dataLineChart ? <LineChart data={dataLineChart} /> : null}

                  {dataGraph &&
                    dataGraph.length > 0 &&
                    dataGraph.every((obj) => obj[item.id] && obj[item.id].length > 0) &&
                    dataDonutChart &&
                    dataDonutChart.length > 0 &&
                    dataPieChart &&
                    dataPieChart.length > 0 &&
                    dataLineChart &&
                    dataLineChart.length > 0 && (
                      <Text
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Aucune donnée disponible pour le graphique
                      </Text>
                    )}
                </ScrollView>
              )}
              <Text body style={{ marginTop: 20 }}>
                {item.description}
              </Text>
              {dataGraph?.find((obj) => obj[item.id])?.[item.id]?.code ? (
                <Text semibold style={{ marginTop: 20 }}>
                  {t('Description du graph')}
                </Text>
              ) : null}
              <View
                style={{
                  marginTop: 20,
                }}
              >
                {dataGraph
                  ?.find((obj) => obj[item.id])
                  ?.[item.id].code?.map((at, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'start',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                      }}
                      key={`${at.name}_${index}_${Math.random()}`}
                    >
                      <View
                        style={{
                          width: 7,
                          height: 10,
                          borderRadius: 8,
                          backgroundColor: BaseColor.primaryColor,
                          marginRight: 5,
                        }}
                      />
                      <LabelUpper2Row style={{ flex: 1 }} label={at?.name} value={at?.code} />
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <ModalOption
        //value={{}}
        //options={PProjectAction}
        isVisible={showAction}
        isMulti={false}
        onSwipeCompvare={() => {
          setShowAction(false);
        }}
        onPress={() => {
          setShowAction(false);
        }}
      /> */}
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View
          style={{
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: 100,
            backgroundColor: '#0284c7',
            borderRadius: 10,
            width: '100%',
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            padding: 10,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              // height: 80,
              width: '100%',
            }}
          >
            <Text
              style={{
                color: BaseColor.whiteColor,
                width: '70%',
                fontSize: 18,
              }}
            >
              Ministère de l'Education Nationale et de la Promotion Civique
            </Text>
            <TouchableOpacity>
              <Text
                whiteColor
                style={{
                  fontSize: 20,
                }}
              >
                ...
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              // height: 80,
              width: '100%',
            }}
          >
            <Icon name="chart-bar" size={24} style={{ color: BaseColor.whiteColor }} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text
                bold
                style={{
                  color: BaseColor.whiteColor,
                  alignSelf: 'flex-end',
                  fontSize: 28,
                }}
              >
                123456789
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 5 }} whiteColor>
                Fcfa
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: 100,
            backgroundColor: '#9d174d',
            borderRadius: 10,
            width: '100%',
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              // height: 80,
              width: '100%',
            }}
          >
            <Text
              style={{
                color: BaseColor.whiteColor,
                width: '70%',
                fontSize: 18,
              }}
            >
              Ministère de la Santé Publique
            </Text>
            <TouchableOpacity>
              <Text
                whiteColor
                style={{
                  fontSize: 20,
                }}
              >
                ...
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              // height: 80,
              width: '100%',
            }}
          >
            <Icon name="chart-bar" size={24} style={{ color: BaseColor.whiteColor }} />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text
                bold
                style={{
                  color: BaseColor.whiteColor,
                  alignSelf: 'flex-end',
                  fontSize: 28,
                }}
              >
                123456789
              </Text>
              <Text style={{ fontSize: 15, paddingLeft: 5 }} whiteColor>
                Fcfa
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;