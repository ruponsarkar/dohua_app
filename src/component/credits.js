import React from "react";
import { View, Text, Image } from "react-native";

export default function Credits() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 30 }}>
      <Text>Design and developed by -</Text>
      <Image
        source={require("../assets/image/skaplink.png")}
        style={{ height: 20, width: 150 }}
        resizeMode="contain"
      />
    </View>
  );
}
