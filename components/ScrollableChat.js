import React, {useContext, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import ChatMessage from "./UI/ChatMessage";
import AddMessage from "./UI/AddMessage";
import {ChatContext} from "../store/chat-context";
import ChatButtons from "./UI/ChatButtons";
import SystemBox from "./SystemBox";


function ScrollableChat({}) {


    const animatedValue = new Animated.Value(1);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });



    const chatCtx = useContext(ChatContext);

    const chatRef = React.useRef(null);

    const [isTyping, setIsTyping] = useState(false);

    async function onAddMessage() {
        let id = await chatCtx.addMessage();
        console.log("Add message, id: " + id);
        chatCtx.messages.forEach((message) => {
            console.log(message)
        })
        console.log("Last message: " + chatCtx.messages[chatCtx.messages.length - 1]);
        try {
            chatRef.current.scrollToEnd({animated: true});
        } catch (ignored) {

        }
        return id
    }

    function handleClearChat() {
        console.log("Clear chat");
        chatRef.current.scrollToOffset({offset: 0})
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            chatCtx.clearMessages()
            animatedValue.setValue(1);
        });
    }

    function handleChatEdit(id, event) {
        console.log("Edit message: " + id + " to " + event)
        chatCtx.updateMessage(id, {message: event});
    }

    function renderFooter(isInChat) {
                return (
                    <AddMessage style={styles.footer} onAddMessage={onAddMessage} onClearChat={handleClearChat}/>
                )
        //
        // if (chatCtx.messages.length > 2) {
        //     if (isInChat) {
        //         return <View/>
        //     } else {
        //         if(!isTyping){
        //             return (
        //                 <AddMessage style={styles.footer} onAddMessage={onAddMessage} onClearChat={handleClearChat}/>
        //             )
        //         } else {
        //             return <View/>
        //         }
        //     }
        // } else {
        //     if (!isInChat) {
        //         return <View/>
        //     } else {
        //         return (
        //             <AddMessage style={styles.footer} onAddMessage={onAddMessage} onClearChat={handleClearChat}/>
        //         )
        //     }
        // }


    }

    function handleSwap(id) {
        console.log("Swap message: " + id)
        chatCtx.swapMessage(id);
    }

    function handleDelete(id) {
        console.log("Delete message: " + id)
        chatCtx.deleteMessage(id);
    }

    function handleFocus() {
        setIsTyping(true);
    }

    function handleBlur() {
        setIsTyping(false);
    }

    function renderChatMessage(data) {
        return (
            <ChatMessage
                onEdit={handleChatEdit}
                item={data.item}
                onSwap={handleSwap}
                onDelete={handleDelete}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        )
    }

    function handleCompletion() {
        chatRef.current.scrollToEnd({animated: true});
    }

    function handleTextChange() {
        chatRef.current.getNativeScrollRef().scrollToEnd({animated: false});
    }


    return (
        <>
            <SystemBox/>
            <View style={styles.container}>
                <Animated.FlatList style={{opacity: opacity}} ref={chatRef}
                                   ListFooterComponent={renderFooter.bind(this, true)} data={chatCtx.messages}
                                   renderItem={renderChatMessage} keyboardDismissMode="none"
                                   removeClippedSubviews={false} keyboardShouldPersistTaps={'always'}/>
                {/*{renderFooter(false)}*/}
                <ChatButtons onComplete={handleCompletion} onTextChange={handleTextChange}/>
            </View>

        </>
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
    footer: {

    },

});

export default ScrollableChat;
