import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from "@ui-kitten/components";

function SystemBox({}) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>SYSTEM</Text>
            </View>
            <Input placeholder={"You are a helpful assistant."}
                   style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',

    },
    titleContainer: {
        paddingHorizontal: 20,
    },
    textInputContainer: {
        backgroundColor: '#fff',
        borderColor: 'white',
        borderBottomColor: '#e0e0e0',
        alignItems: 'flex-start',
        paddingHorizontal: 1,
    },
    textInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
        height: 100,
        paddingTop: 0,
        marginTop: 0,
    },
    title: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default SystemBox;
