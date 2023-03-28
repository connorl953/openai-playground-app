import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Animated} from 'react-native';
import Header from "../components/Header";
import SavedChatsBox from "../components/SavedChatsBox";
import SystemBox from "../components/SystemBox";
import ScrollableChat from "../components/ScrollableChat";
import {Button} from "@ui-kitten/components";

function HomeScreen({navigation, route}) {
    const params = route.params;





    return (
        <View style={styles.container}>
            <Header style={styles.header} navigation={navigation}/>
            <SystemBox/>
            <ScrollableChat/>

            <KeyboardAvoidingView style={styles.keyboardAvoidingButtonContainer}>
                <Button style={styles.clearButton} status={"danger"} onPress={() => {
                    Keyboard.dismiss()
                }}>Back</Button>
                <Button style={styles.submitButton} status={"success"}>Submit</Button>
            </KeyboardAvoidingView>
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
