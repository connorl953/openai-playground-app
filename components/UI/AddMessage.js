import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * AddMessage()
 * This component renders a container with two pressable buttons: one to add a message and one to clear the chat.
 *
 * @param onAddMessage A function to be called when the "Add message" button is pressed.
 * @param onClearChat A function to be called when the "Clear chat" button is pressed.
 * @param style An optional style object to be applied to the overall container.
 * @returns A JSX element containing the two pressable buttons.
 */
function AddMessage({onAddMessage, onClearChat, style}) {
    return (
        <View style={[styles.overallContainer, {...style}]}>
            <Pressable style={styles.addContainer} onPress={onAddMessage}>
                <Ionicons style={styles.icon} name={"add-circle-outline"} size={30} color={"#000"}/>
                <Text style={styles.title}>Add message</Text>
            </Pressable>

            <Pressable style={styles.removeContainer} onPress={onClearChat}>

                <Text style={styles.title}>Clear chat</Text>
                <Ionicons style={styles.icon} name={"trash-outline"} size={30} color={"#000"}/>

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    addContainer: {
        flex: 16,
        marginTop: 10,
        width: '100%',

        flexDirection: 'row',
        paddingVertical: 7,
        marginVertical: 7,
        alignContent: 'center',
        alignItems: 'center',

    },
    removeContainer: {
        flex: 7,
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 7,
        marginVertical: 7,
        alignContent: 'center',
        alignItems: 'center',

    },
    overallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginHorizontal: 10,
    },
    title: {
        marginVertical: 8,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default AddMessage;
