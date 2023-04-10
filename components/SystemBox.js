import React, {useContext} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {Input} from "@ui-kitten/components";
import {ChatContext} from "../store/chat-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const animatedValue = new Animated.Value(0);


/**
 * SystemBox()
 * This component renders a text box allowing the user to enter system messages.
 *
 * @return The rendered SystemBox component.
 */
function SystemBox({}) {

    const chatCtx = useContext(ChatContext);
    const [expanded, setExpanded] = React.useState(false);
    const [hidden, setHidden] = React.useState(true);

    const height = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [75, 250],
    });

    const [iconName, setIconName] = React.useState("resize-outline");

    function handleHiddenToggle() {
        setHidden(!hidden)
    }

    function handleExpandToggle() {

        if (expanded) {
            setIconName("resize-outline")

            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start(() => {
                setExpanded(!expanded);
            });
        } else {
            setIconName("remove-outline")

            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
            }).start(() => {
                setExpanded(!expanded);
            });
        }
    }

    function handleText(text) {
        chatCtx.updateSystemMessage(text);
    }

    function handleDelete() {
        chatCtx.updateSystemMessage("");
    }

    function renderTextBox() {
        if (!hidden) {
            return (
                <Animated.View style={[styles.animatedContainer, {height: height}]}>
                    <Input placeholder={"You are a helpful assistant."} value={chatCtx.systemMessage}
                           onChangeText={handleText}
                           style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
                </Animated.View>
            )
        } else {
            return null;
        }
    }

    function renderDeleteAndExpand() {
        if (!hidden) {
            return (
                <>
                    <Pressable onPress={handleExpandToggle}>
                        <Ionicons name={iconName} size={25} color="black"/>
                    </Pressable>

                    <Pressable onPress={handleDelete}>
                        <Ionicons name="trash-outline" size={25} color="black"/>
                    </Pressable>
                </>
            )
        } else {
            return null;
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Pressable onPress={handleHiddenToggle}>
                    <View style={[styles.titleContainer, {paddingLeft: 0}]}>
                        <Text style={styles.title}>SYSTEM</Text>
                        <Ionicons style={styles.icon} name={!hidden ? "eye-outline" : "eye-off-outline"} size={23}
                                  color={"#000"}/>
                    </View>
                </Pressable>

                {renderDeleteAndExpand()}
            </View>
            {renderTextBox()}
            {/*<Animated.View style={[styles.animatedContainer, {height: height}]}>*/}
            {/*<Input placeholder={"You are a helpful assistant."}  value={chatCtx.systemMessage} onChangeText={handleText}*/}
            {/*       style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>*/}
            {/*</Animated.View>*/}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
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

        alignItems: 'flex-start',
        paddingHorizontal: 1,
        flex: 1,
    },
    animatedContainer: {},
    textInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
        flex: 1,
        paddingTop: 0,
        marginTop: 0,
    },
    title: {

        fontSize: 16,
        fontWeight: 'bold',

    },
    icon: {
        paddingLeft: 10,
    }
});

export default SystemBox;
