import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { ScreenProps } from "../types";
import Title from "../components/Title";
import { Colors } from "../assets/colors";
import Subtitle from "../components/Subtitle";

import Chip from "../components/Chip";
import HeroImage from "../assets/HeroImage.png";
import ListItem from "../components/ListItem";
import { Repositories } from "../services/database";
import { delay, useForm } from "../utils";
import TextInputComponent from "../components/TextInput";
import LoadingScreen from "../components/LoadingScreen";
import Screen from "../components/Screen";

type HomeScreenProps = ScreenProps["onboarding"];

export default function HomeScreen(props: HomeScreenProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [itemCategories, setItemCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<"LOADING" | "IDLE">("LOADING");
  const [search, setSearch] = useState("");

  const { values: categories, setValue } = useForm<{
    [key: string]: boolean;
  }>();

  useEffect(() => {
    async function init() {
      await Repositories.menu.init();

      let _items = await Repositories.menu.all();

      if (_items.length === 0) {
        const req = await fetch(
          "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
        );
        const response: { menu: MenuItem[] } = await req.json();

        _items = response.menu;
        await Repositories.menu.insert(response.menu);
      }

      setStatus("IDLE");
      setItems(_items);
      const _itemCategories = {};
      _items.forEach(
        (item) => (_itemCategories[item.category] = item.category)
      );
      setItemCategories(Object.keys(_itemCategories));
    }

    init();
  }, []);

  async function queryItems() {
    setStatus("LOADING");

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });

    const _categories: string[] = [];
    Object.keys(categories).forEach((category) => {
      const val = categories[category];
      if (val) {
        _categories.push(category);
      }
    });

    let _items = await Repositories.menu.all({
      categories: _categories,
      search,
    });
    setItems(_items);

    setStatus("IDLE");
  }

  useEffect(() => {
    queryItems();
  }, [categories, search]);

  function onCategoryChange(input: string) {
    return (value: boolean) => setValue(input, value);
  }

  return (
    <Screen padding={false}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 22,
          paddingVertical: 24,
        }}
      >
        <Title>Little Lemon</Title>
        <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Subtitle size="large" theme="light" serif>
              Chicago
            </Subtitle>
            <Text style={{ fontSize: 16, color: Colors.light }}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modem twist.
            </Text>
          </View>
          <View>
            <Image
              source={HeroImage}
              style={{
                width: 136,
                height: 136,
                borderRadius: 16,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <TextInputComponent
            placeholder="Search"
            onChange={delay(setSearch, 500)}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 22,
          paddingBottom: 16,
          borderBottomColor: Colors.gray,
          borderBottomWidth: 1,
        }}
      >
        <Subtitle>ORDER FOR DELIVERY!</Subtitle>
        <ScrollView horizontal>
          {itemCategories.map((category) => (
            <View key={category} style={{ marginRight: 8 }}>
              <Chip onChange={onCategoryChange(category)}>
                {category.toUpperCase()}
              </Chip>
            </View>
          ))}
        </ScrollView>
      </View>
      {status === "LOADING" ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={items}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: 30, alignItems: "center" }}>
                <Text>No results</Text>
              </View>
            );
          }}
          renderItem={({ item }) => (
            <ListItem
              {...item}
              image={`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}
            />
          )}
        />
      )}
    </Screen>
  );
}
