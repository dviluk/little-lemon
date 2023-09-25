import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../assets/colors";

type Props = {
  name: string;
  description: string;
  price: number;
  image: string;
};
export default function ListItem(props: Props) {
  const { name, description, price, image } = props;
  return (
    <View style={style.container}>
      <View style={style.info}>
        <Text style={style.title}>{name}</Text>
        <Text style={style.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={style.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={style.imageContainer}>
        <Image style={style.image} source={{ uri: image }} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 22,
    alignItems: "flex-end",
  },
  info: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.dark,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },
  image: {
    width: 66,
    height: 66,
  },
});
