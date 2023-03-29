import React, {useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Button} from "@ui-kitten/components";
import {ChatContext} from "../../store/chat-context";
import {cancelCompletion, openAiCompletion} from "../../util/http";

function ChatButtons({onComplete, onTextChange}) {

    const chatCtx = useContext(ChatContext);
    const [isCompleting, setIsCompleting] = useState(false);
    const [cancelled, setCancelled] = useState(false);


    async function submitChat() {


        setCancelled(false);
        setTimeout(() => {


            Keyboard.dismiss();
            setIsCompleting(true);
            let preparedChatContent = [];

            if(chatCtx.messages.length > 0) {
                preparedChatContent.push(chatCtx.messages.map((message) => {
                    return {
                        role: message.isAssistant ? "assistant" : "user",
                        content: message.message
                    };
                }));
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
                targetID = chatCtx.addMessage(true);
                console.log("Add message, id: " + targetID);
            }
            let returnedText = ""

            function handleText(text) {

                setTimeout(() => {
                    returnedText = returnedText + text;
                    console.log("Handle text: " + text);
                    chatCtx.setMessageList([...chatCtx.messages, {
                        id: targetID,
                        message: returnedText,
                        isAssistant: true
                    }]);
                    onTextChange();
                })

            }

            openAiCompletion(preparedChatContent, handleText, onCompletion)
        }, 15)

        console.log("Submit chat");
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

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingButtonContainer}>
            <Button style={styles.clearButton} status={"danger"}
                    onPress={handleBack}>{isCompleting ? "Stop" : "Back"}</Button>
            <Button style={styles.submitButton} onPress={submitChat} status={"success"}>Submit</Button>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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

export default ChatButtons;
