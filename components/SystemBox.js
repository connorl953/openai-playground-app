import React, {useContext} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {Input} from "@ui-kitten/components";
import {ChatContext} from "../store/chat-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const animatedValue = new Animated.Value(0);
function SystemBox({}) {

    const chatCtx = useContext(ChatContext);
    const [expanded, setExpanded] = React.useState(false);

    const height = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [75, 250],
    });

    const [iconName, setIconName] = React.useState("resize-outline");
    function handlePress(){
        if(expanded){
            setIconName("resize-outline")

            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start(()=> {
                setExpanded(!expanded);
            });
        } else {
            setIconName("remove-outline")

            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
            }).start(()=> {
                setExpanded(!expanded);
            });
        }
    }
    function handleText(text) {
        chatCtx.updateSystemMessage(text);
    }

    function handleDelete(){
        chatCtx.updateSystemMessage("");
    }
    return (

        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Pressable onPress={handlePress}>
                    <View style={[styles.titleContainer, {paddingLeft: 0}]}>
                        <Text style={styles.title}>SYSTEM</Text>
                        <Ionicons style={styles.icon} name={iconName} size={23} color={"#000"}/>
                    </View>
                </Pressable>
                <Pressable onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={25} color="black"/>
                </Pressable>
            </View>

            <Animated.View style={[styles.animatedContainer, {height: height}]}>
            <Input placeholder={"You are a helpful assistant."}  value={chatCtx.systemMessage} onChangeText={handleText}
                   style={styles.textInputContainer} multiline={true} textStyle={styles.textInput}/>
            </Animated.View>

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
        marginTop: 10,
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
        flex:1,
    },
    animatedContainer: {

    },
    textInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
        flex:1,
        paddingTop: 0,
        marginTop: 0,
    },
    title: {

        fontSize: 16,
        fontWeight: 'bold',

    },
});

export default SystemBox;
