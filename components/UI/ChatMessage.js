import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Input} from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";



function ChatMessage(params){
    const {item} = params;
    const message =  item.message;
    const isAssistant = item.isAssistant;



    if(isAssistant){
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Pressable>
                    <View style={[styles.titleContainer, {paddingLeft: 0}]}>

                        <Text style={styles.title}>ASSISTANT</Text>
                        <Ionicons name="swap-horizontal" size={24} color="black" />

                    </View>
                    </Pressable>
                    <Ionicons name="remove-circle-outline" size={20} color="black" />
                </View>
                <Input value={(message && message)} placeholder={"Enter an assistant message here."} style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={[styles.titleContainer, {paddingLeft: 0}]}>
                        <Text style={styles.title}>USER</Text>
                        <Ionicons name="swap-horizontal" size={24} color="black" />
                    </View>

                    <Ionicons name="remove-circle-outline" size={20} color="black" />
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
        marginRight: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ChatMessage;
