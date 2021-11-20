import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Animated,
  LayoutAnimation,
  View,
} from "react-native";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    paddingHorizontal: 20,
  };

  const [progressTime, setProgressTime] = useState(0);

  // Define a initial value for chart
  const animationValue = useRef(new Animated.Value(0)).current;

  const chartConfig = {
    backgroundGradientFrom: "#556379",
    backgroundGradientTo: "#556379",
    color: (opacity = 1) => `rgba(96, 207, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    style: {
      borderRadius: 16,
    },
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Define animation for chart
    Animated.timing(animationValue, {
      toValue: 0.65, // Value to graph
      duration: 2500, // Duration for animation
      useNativeDriver: true,
    }).start();

    // Listen the animation variable and update chart variable
    animationValue.addListener(({ value }) => {
      console.log("🚀 ~ animationValue.addListener ~ value", value);
      setProgressTime(value);
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: 20,
        }}
        style={backgroundStyle}
      >
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                // data: [
                //   25.22 * progressTime,
                //   56.22 * progressTime,
                //   34.22 * progressTime,
                //   23.4 * progressTime,
                //   34.22 * progressTime,
                //   20.23 * progressTime,
                // ],
                data: [
                  Math.random() * 100 * progressTime,
                  Math.random() * 100 * progressTime,
                  Math.random() * 100 * progressTime,
                  Math.random() * 100 * progressTime,
                  Math.random() * 100 * progressTime,
                  Math.random() * 100 * progressTime,
                ],
              },
            ],
          }}
          formatYLabel={(yLabel) => {
            return (
              Math.round((yLabel / progressTime + Number.EPSILON) * 100) / 100
            );
          }}
          hideLegend={true}
          width={Dimensions.get("window").width - 20}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <ProgressChart
          data={{ data: [progressTime] }}
          width={Dimensions.get("window").width - 20}
          height={250}
          strokeWidth={22}
          radius={100}
          chartConfig={chartConfig}
          hideLegend={false}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
