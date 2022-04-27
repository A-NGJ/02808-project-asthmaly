import React, { Component } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { ContainerCenter } from '../styles/style';

export function RoundedButton(text, onPress, colors) {
  return (
    <View style={[ContainerCenter, {flex: 0.2}]}>
      <TouchableOpacity onPress={onPress} style={{
        paddingVertical: 10,
        backgroundColor: "gray",
        paddingHorizontal: 16,
        borderRadius: 10,
      }}
      >
        <Text style={{fontSize: 24, color: colors.primary}}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export class RadioButton extends Component {

  state = {
    value: null,
  }

  render() {
    // const { theme } = this.props;
    const { PROP, theme } = this.props;
    const { value } = this.state;
    return (
      <View>
        {PROP.map(res => {
          return (
            <View key={res.key} style={styles.container}>
              <Text style={[styles.radioText, {color: theme.primary}]}>{res.name}</Text>
              <TouchableOpacity
                style={[styles.radioCircle, {borderColor: theme.primary}]}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                }}
              >
                {value === res.key && <View style={[styles.selectedRb, {backgroundColor: theme.primary}]} />}
              </TouchableOpacity>
            </View>
          );
        })}
          {/* <Text> Selected: {this.state.value} </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    fontWeight: "700",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3BFE"
  },
})