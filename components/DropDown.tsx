import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ICountry, IState } from "country-state-city";

const DropdownComponent = ({
  data,
  setValue,
  value,
}: {
  value: ICountry | IState | null;
  setValue: React.Dispatch<React.SetStateAction<ICountry | IState | null>>;
  data: ICountry[] | IState[];
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#D17842" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {!value && renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "white" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField='name'
        valueField='name'
        placeholder={!isFocus ? "Select item" : ""}
        searchPlaceholder='Search...'
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#D17842" : "white"}
            name='Safety'
            size={20}
          />
        )}
        renderItem={(item, index) => (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    height: 50,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    color: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white", // White text for the placeholder
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white", // White text for the selected item
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white", // White text for the search input
  },
  item: {
    padding: 10,
    backgroundColor: "#0C0F14", // Red background for dropdown items
  },
  textItem: {
    color: "white", // White text for dropdown items
    fontSize: 16,
  },
  searchStyle: {
    backgroundColor: "#0C0F14", // Background color for search input
    color: "white", // Text color for search input
  },
});
