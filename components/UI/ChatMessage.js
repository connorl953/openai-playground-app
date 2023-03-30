import React from 'react';
import {KeyboardAvoidingView, Pressable, StyleSheet, Text, View} from 'react-native';
import {Input} from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";


function ChatMessage({item, onSwap, onDelete, onEdit, onFocus, onBlur}) {

    const message = item.message;
    const isAssistant = item.isAssistant;


    function handleSwap() {
        onSwap(item.id)
    }

    function handleDelete() {
        onDelete(item.id)
    }
    function handleEdit(event){
        onEdit(item.id, event.nativeEvent.text)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.titleContainer}>
                <Pressable onPress={handleSwap}>
                    <View style={[styles.titleContainer, {paddingLeft: 0}]}>
                        <Text style={styles.title}>{isAssistant ? "ASSISTANT" : "USER"}</Text>
                        <Ionicons name="swap-horizontal" size={25} color="black"/>
                    </View>
                </Pressable>
                <Pressable onPress={handleDelete}>
                    <Ionicons name="remove-circle-outline" size={25} color="black"/>
                </Pressable>
            </View>
            <Input onFocus={onFocus} onBlur={onBlur} onChange={handleEdit} value={(message && message)} placeholder={`Enter ${isAssistant? "an assistant" : "a user"} message here. `}
                   style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
        </KeyboardAvoidingView>
    );


}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        width: '100%',
        backgroundColor: 'white',

    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    textInputContainer: {
        backgroundColor: '#fff',
        borderColor: 'white',
        borderBottomColor: '#e0e0e0',
        alignItems: 'flex-start',
        paddingHorizontal: 1,
        paddingBottom: 3,
    },
    textInput: {
        textAlignVertical: 'top',
        textAlign: 'left',

    },
    title: {
        marginRight: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ChatMessage;
