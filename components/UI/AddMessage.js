import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Input} from "@ui-kitten/components";
import Ionicons from 'react-native-vector-icons/Ionicons';

function AddMessage({}){

  return (
      <View style={styles.overallContainer}>
      <View style={styles.addContainer}>
        <Ionicons style={styles.icon} name={"add-circle-outline"} size={30} color={"#000"}/>
          <Text style={styles.title}>Add message</Text>
      </View>

          <View style={styles.removeContainer}>
              <Text style={styles.title}>Clear chat</Text>
              <Ionicons style={styles.icon} name={"trash-outline"} size={30} color={"#000"}/>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    addContainer:{
        flex: 16,
        marginTop: 10,
        width: '100%',

        flexDirection: 'row',
        paddingVertical: 7,
        marginVertical: 7,
        alignContent: 'center',
        alignItems: 'center',

    },
    removeContainer:{
        flex: 7,
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 7,
        marginVertical: 7,
        alignContent: 'center',
        alignItems: 'center',

    },
    overallContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon:{
      marginHorizontal: 10,
    },
    title:{
        marginVertical: 8,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default AddMessage;
