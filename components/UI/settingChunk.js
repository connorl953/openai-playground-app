import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * settingChunk()
 * This function returns a JSX component that displays a setting chunk with a title, value, and optional children.
 *
 * @param children Optional JSX elements to be displayed below the title and value.
 * @param title The title of the setting chunk.
 * @param value The value of the setting chunk.
 * @return A JSX component displaying the setting chunk.
 */
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
