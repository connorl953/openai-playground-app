import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from "@react-navigation/native";
function Header({style}){
    const navigation = useNavigation();
  return (
    <View style={[styles.container, {...style}]}>
        <Text style={styles.title}>Playground</Text>
        <Pressable onPress={() => navigation.openDrawer()}>
        <Ionicons style={styles.button} name={"settings-outline"} size={32} color={"#000"}/>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 30,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        minHeight: 100,

    },
    title:{
        marginVertical: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default Header;
