import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={'/(stack)/filters'} asChild>
      <Button title="go to filters"  />
      </Link>
      <Text  className=" text-red-500  font-poppins-bold">Edit app/index.tsx to edit this screenn.</Text>
    </View>
  );
}
