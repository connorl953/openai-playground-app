import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Input} from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";



function ChatMessage(params){
    const {item} = params;
    const isAssistant = item.isAssistant;
    const message =  item.message;

    if(isAssistant){
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>ASSISTANT</Text>
                    <Ionicons name="remove-circle-outline" size={24} color="black" />
                </View>
                <Input value={(message && message)} placeholder={"Enter an assistant message here."} style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>USER</Text>
                    <Ionicons name="remove-circle-outline" size={24} color="black" />
                </View>
                <Input value={(message && message)} style={styles.textInputContainer} placeholder={"Enter a user message here."}  multiline={true} textStyle={styles.textInput}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white',

    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    textInputContainer:{
        backgroundColor: '#fff',
        borderColor: 'white',
        marginBottom: 10,
        borderBottomColor: '#e0e0e0',
        alignItems: 'flex-start',
        paddingHorizontal: 1,
    },
    textInput:{
        textAlignVertical: 'top',
        textAlign: 'left',

    },
    title:{
        marginVertical: 8,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ChatMessage;
