import React from 'react';
import {Animated, Easing, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from "@react-navigation/native";

function Header({style}){
    const navigation = useNavigation();
    const animatedValue = new Animated.Value(0);


    function handlePressed(){
        Animated.timing(animatedValue, {
            toValue: 1,
            easing: Easing.bounce,
            duration: 1500,
            useNativeDriver: true,
        }).start(()=>animatedValue.setValue(0));

        if(Keyboard.isVisible()) {
            Keyboard.dismiss();
        }

        navigation.openDrawer()
    }
    const spin = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });


    return (
    <View style={[styles.container, {...style}]}>
        <View style={styles.subContainer}>
        <Ionicons style={styles.logo} name={"logo-react"} size={40} color={"#000"}/>
        <Text style={styles.title}>Playground</Text>
        </View>
        <Pressable onPress={handlePressed}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
        <Ionicons style={[styles.button]} name={"settings-outline"} size={32} color={"#000"}/>
            </Animated.View>
            </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        minHeight: 30,
        transform: [{rotate: "0deg"}],
    },
    subContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo:{
      paddingRight: 10,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default Header;
