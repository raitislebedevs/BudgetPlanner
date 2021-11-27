import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text } from "react-native";
import { colors } from "../../config/colors";
import { VictoryPie } from "victory-native";
import { formatNumber, sumWithReduce } from "../../utils/standaloneFunctions";
import { connect } from "react-redux";

function BudgetPieChart(props) {
  const { chartData, colorCodes, currrency, color, income } = props;
  const [total, setTotal] = useState("0");
  const screenWidth = Dimensions.get("window").width;
  // const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (chartData) {
      setTotal(
        formatNumber(
          parseFloat(sumWithReduce(chartData, "y")).toFixed(2),
          currrency
        )
      );
    }
  }, [chartData]);

  // const fadeIn = () => {
  //   Animated.timing(fadeValue, {
  //     toValue: 1,
  //     duration: 100,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const fadeOut = () => {
  //   Animated.timing(fadeValue, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  return (
    <>
      <VictoryPie
        animate={{
          duration: 2000,
        }}
        width={screenWidth}
        height={screenWidth - 70}
        data={chartData}
        colorScale={colorCodes}
        padAngle={1.5}
        //endAngle={endAngle}
        labelPosition={"centroid"}
        labelPlacement={"parallel"}
        labelRadius={({ innerRadius }) => innerRadius + 30}
        style={{
          labels: {
            fill: colors.black,
            fontSize: 14,
            fontWeight: "bold",
          },
          data: {
            fillOpacity: 0.7,
          },
        }}
        cornerRadius={5}
        innerRadius={80}
      />
      <Text
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 135 : 150,
          fontSize: 24,
          fontWeight: "bold",
          justifyContent: "center",
          alignSelf: "center",
          color: colors[color],
        }}
      >
        {`${total}`}
      </Text>
    </>
  );
}

const mapStateToProps = (state) => ({
  currrency: state.user?.currrency || "$",
});

export default connect(mapStateToProps)(BudgetPieChart);

const styles = StyleSheet.create({
  loader: {
    marginTop: 25,
  },
  text: {
    color: "black",
  },
});
