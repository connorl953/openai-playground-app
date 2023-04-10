import React, {createContext, useState} from 'react';

export const ChatContext = createContext({
    messages: [{
        id: "1",
        isAssistant: false,
        message: ""
    }],
    systemMessage: "",
    updateSystemMessage: () => {},
    setMessageList: () => {},
    addMessage: () => {},
    deleteMessage: () => {},
    updateMessage: () => {},
    clearMessages: () => {},
    swapMessage: () => {},
});

/**
 * ChatContextProvider
 * This component provides a context for the chat messages and system messages.
 * It also provides methods to add, delete, update, and clear messages.
 *
 * @param props The props passed to the component.
 * @return A ChatContext.Provider component with the necessary values and methods.
 */

const ChatContextProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [systemMessage, setSystemMessage] = useState("");
    const updateSystemMessage = (message) => {
        setSystemMessage(message);
    }
    const setMessageList = (messages) => {
        setMessages(messages);
    }

    const addMessage = (isAssistantVar) => {
        let isAssistant = false;
        if(isAssistant){
            isAssistant = isAssistantVar;
        } else {
            if(messages.length > 0){
                let lastMessage = messages[messages.length - 1];
                if(!lastMessage.isAssistant){
                    isAssistant = true;
                }
            }
        }

        let newMessage = {
            id: Math.random().toString(),
            isAssistant: isAssistant,
            message: "",
        }
        setMessages([...messages, newMessage]);
        return newMessage.id;
    };

    const clearMessages = () => {
        setMessages([]);
    }
    const deleteMessage = (id) => {
        setMessages(messages.filter((message) => message.id !== id));
    };


    const updateMessage = (id, updatedMessage) => {
        const updatedMessages = [...messages];
        for (let i = 0; i < updatedMessages.length; i++) {
            if (updatedMessages[i].id === id) {
                updatedMessages[i] = { ...updatedMessages[i], ...updatedMessage };
                break;
            }
        }
        setMessages(updatedMessages);
    };

    const swapMessage = (id) => {
        setMessages(
            messages.map((message) =>
                message.id === id ? { ...message, isAssistant: !message.isAssistant } : message
            )
        );
    }



    return (
        <ChatContext.Provider
            value={{messages, systemMessage, updateSystemMessage, setMessageList, addMessage, deleteMessage, updateMessage, clearMessages, swapMessage}}
        >
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
