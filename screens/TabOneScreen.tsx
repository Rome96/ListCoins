import { StyleSheet, ActivityIndicator, Dimensions, FlatList, Image } from "react-native";

import useFetch from "../hooks/useFetch";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const { width, height } = Dimensions.get("window");
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const Item = (item: object) => {
  const { name, symbol, image, current_price, price_change_percentage_24h } = item;
  // const colorScheme = useColorScheme();
  // const shadowColor = { shadowColor: Colors[colorScheme].background };

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: image }} style={styles.icon} />
        <View>
          <Text style={styles.titleItem}>{name}</Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.titleItem}>{current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
          ]}
        >
          {price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export default function TabOneScreen() {
  const { fetchData: data, loading, error } = useFetch(url);

  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rome marketCap</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: "15%",
    alignSelf: "center",
  },

  titleItem: {
    fontSize: 14,
    fontWeight: "bold",
  },
  symbol: {
    fontSize: 12,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 8,
    width: 30,
    height: 30,
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  pricePercentage: {
    textAlign: "right",
  },
});
