// PickerButton.js

import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as colors from "../styles/colors";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dynamicStyle = this.props.disabled ? styles.disabled : styles.active;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={dynamicStyle}>
          <Text
            style={styles.textStyle}
          >
            {this.props.children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create(
  {
    textStyle: {
      color: "white",
      fontFamily: "Roboto-Bold",
      fontSize: 15
    },

    active: {
      justifyContent: "center",
      backgroundColor: colors.malibu,
      height: 50,
	  width: 200,
      margin: 5,
      padding: 5,
      alignItems: "center",
      elevation: 2,
      borderRadius: 4
    },

    disabled: {
      justifyContent: "center",
      backgroundColor: colors.heather,
      height: 50,
	  width: 100,
      margin: 5,
      padding: 5,
      alignItems: "center",
      elevation: 2,
      borderRadius: 4
    }
  },
);
