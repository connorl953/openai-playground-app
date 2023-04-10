import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from "../components/Header";
import ScrollableChat from "../components/ScrollableChat";

import ChatContextProvider from "../store/chat-context";


function isValidJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * HomeScreen()
 * This component represents the home screen of the chat app.
 *
 * @param navigation The navigation object used to navigate between screens.
 * @param route The route object containing the parameters passed to this screen.
 * @return A JSX element representing the home screen.
 */

function HomeScreen({navigation, route}) {
    const params = route.params;

    return (
        <View style={styles.container}>
            <Header style={styles.header} navigation={navigation}/>

            <ChatContextProvider>
                <ScrollableChat/>
            </ChatContextProvider>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        alignItems: 'center',
    },
    header: {
        height: '10%',
    },
    submitButton: {
        flex: 4,
        borderRadius: 0,
        borderWidth: 0,

        alignSelf: 'flex-end',
        backgroundColor: '#10a37f',
    },
    clearButton: {
        flex: 1,
        position: "relative",
        maxHeight: '100%',
        borderRadius: 0,
        borderWidth: 0,
    },
    keyboardAvoidingButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
});

export default HomeScreen;
