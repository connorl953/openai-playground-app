import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from "@react-native-community/slider";

function settingChunk({children, title, value}){
  return (
      <View style={styles.settingChunk}>
          <View style={styles.settingTextRow}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.value}>{value}</Text>
          </View>
          {children}
      </View>
  );
}

const styles = StyleSheet.create({

    settingTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "7%",
        marginBottom: "5%",
    },
    title: {
        marginVertical: 10,
        fontSize: 17,
        alignSelf: 'flex-start',
    },
    value: {
        marginVertical: 10,
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    settingChunk: {
        width: '80%',
    },

});

export default settingChunk;
