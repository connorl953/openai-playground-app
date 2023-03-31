import React, {useContext, useState} from 'react';
import {ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Button} from "@ui-kitten/components";
import {ChatContext} from "../../store/chat-context";
import {cancelCompletion, openAiCompletion} from "../../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChatButtons({onTextChange}) {

    const chatCtx = useContext(ChatContext);
    const [isCompleting, setIsCompleting] = useState(false);


    async function submitChat() {


        setTimeout(async () => {
            Keyboard.dismiss();
            setIsCompleting(true);

            let token = await AsyncStorage.getItem("token");
            if (!!!token || (token && token.length === 0)) {
                console.log("No token found");
                return;
            }

            let preparedChatContent = [];

            if (chatCtx.messages.length > 0) {
                preparedChatContent = chatCtx.messages.map((message) => {
                    return {
                        role: message.isAssistant ? "assistant" : "user",
                        content: message.message
                    };
                });
            }
            if (chatCtx.systemMessage.length > 0) {
                preparedChatContent.unshift({
                    role: "system",
                    content: chatCtx.systemMessage
                })
            }
            let targetID;
            if (chatCtx.messages.length > 0) {
                let lastMessage = chatCtx.messages[chatCtx.messages.length - 1]
                if (lastMessage.message.length === 0 && lastMessage.isAssistant) {
                    targetID = lastMessage.id;
                    console.log("Existing message, id: " + targetID);
                } else {
                    targetID = chatCtx.addMessage(true);
                    console.log("Add message, id: " + targetID);

                }
            } else {
                targetID = Math.random().toString();

                chatCtx.setMessageList({
                    id: targetID,
                    message: returnedText,
                    isAssistant: true
                });
                console.log("Add message, id: " + targetID);
            }
            let returnedText = ""

            function handleText(text) {

                setTimeout(() => {
                    returnedText = returnedText + text;
                    console.log("Handle text: " + text);
                    if (chatCtx.messages.length > 0) {
                        chatCtx.setMessageList([...chatCtx.messages, {
                            id: targetID,
                            message: returnedText,
                            isAssistant: true
                        }]);
                    } else {
                        chatCtx.setMessageList([{
                            id: targetID,
                            message: returnedText,
                            isAssistant: true
                        }]);
                    }
                    onTextChange();
                })

            }

            if (preparedChatContent.length === 0) {
                Alert.alert("Error", "Please enter a message to complete.");
                setIsCompleting(false)
                return;
            }
            let settings = JSON.parse(await AsyncStorage.getItem("settings"));
            if (!!settings) {
                openAiCompletion(token, settings, preparedChatContent, handleText, onCompletion, handleError)
            } else {
                settings = {
                    temperature: 0.7,
                    max_length: 256,
                    model: "gpt-3.5-turbo",
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                }
                openAiCompletion(token, settings, preparedChatContent, handleText, onCompletion, handleError)
            }

        }, 15)

        console.log("Submit chat");
    }

    function handleError(error) {
        console.log("Error in completion");
        console.log(error);
        chatCtx.setMessageList(chatCtx.messages.slice(0, chatCtx.messages.length - 1));
        setIsCompleting(false);
        Alert.alert("Error", "An error occurred while completing the message. Please try again later.");
    }

    function stopCompletion() {
        cancelCompletion();
        setIsCompleting(false);
    }

    function onCompletion() {

        setIsCompleting(false);
    }

    function handleBack() {
        if (isCompleting) {
            stopCompletion();
            console.log("Cancel completion");
        } else {
            Keyboard.dismiss();
        }
    }

    if(Platform.OS === 'ios'){
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "position": "padding"}
                                  keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                                  contentContainerStyle={styles.keyboardAvoidingButtonContainer}
                                  style={styles.IOSKeyboardAvoidingButtonContainer}>

                <Button style={styles.clearButton} status={"danger"}
                        onPress={handleBack}>{isCompleting ? "Stop" : "Back"}</Button>
                <Button style={styles.submitButton} onPress={submitChat} status={"success"}>{isCompleting ? (
                    <ActivityIndicator/>) : "Submit"}</Button>
            </KeyboardAvoidingView>
        );
    } else {
        return (
            <KeyboardAvoidingView style={styles.keyboardAvoidingButtonContainer}>
                <Button style={styles.clearButton} status={"danger"}
                        onPress={handleBack}>{isCompleting ? "Stop" : "Back"}</Button>
                <Button style={styles.submitButton} onPress={submitChat} status={"success"}>{isCompleting ? (
                    <ActivityIndicator/>) : "Submit"}</Button>
            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    submitButton: {
        flex: 4,
        borderRadius: 0,
        borderWidth: 0,
        alignSelf: 'flex-end',
        backgroundColor: '#10a37f',
        height: '100%',

    },
    clearButton: {
        flex: 1,
        height: '100%',
        borderRadius: 0,
        borderWidth: 0,
    },
    keyboardAvoidingButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    IOSKeyboardAvoidingButtonContainer:{
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    IOSKeyboardAvoidingButtonContentContainer:{
        height: '0%',
    }
});

export default ChatButtons;
