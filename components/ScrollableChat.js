import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Input} from "@ui-kitten/components";
import chatMessage from "./UI/ChatMessage";
import AddMessage from "./UI/AddMessage";


const data = [{
    key: '1',
    isAssistant: true,
    message: "You are a helpful assistant.",
},
    {
        key: '2',
        isAssistant: true,
        message: "You are a helpful assistant.",
    },
    {
        key: '3',
        isAssistant: false,
        message: "",
    },
    {
        key: '5',
        isAssistant: false,
        message: "",
    },
    {
        key: '6',
        isAssistant: false,
        message: "",
    },
    ]


function ScrollableChat({}) {
    return (
        <View style={styles.container}>
            <FlatList data={data} renderItem={chatMessage} ListFooterComponent={AddMessage} keyboardDismissMode="on-drag"
                      removeClippedSubviews={false}  keyboardShouldPersistTaps={'always'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#e0e0e0',
        width: '100%',
        flex: 1,
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
        minHeight: 100,

    },
    title: {
        marginVertical: 8,
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ScrollableChat;
