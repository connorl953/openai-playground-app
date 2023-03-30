import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChangeToken({}) {

    const [activated, setActivated] = useState(false);

    const [token, setToken] = useState("");

    function handlePress() {
        if (activated) {
            AsyncStorage.setItem('token', token).catch((err) => {
                console.log(err);
            });
        } else {
            if(!!AsyncStorage.getItem('token')){
                AsyncStorage.getItem('token').then((token) => {
                    setToken(token);
                })
            }
        }
        setActivated(!activated);
    }

    function handleChangeText(text){
        setToken(text);
    }
    function renderInput() {
        if (activated) {
            return (
                <Input style={styles.input} value={token} onChangeText={handleChangeText} placeholder={"Input your token"}/>
            )
        }
    }

    return (
        <View style={styles.container}>
            {renderInput()}
            <Button status={"danger"} style={styles.tokenChangeButton}
                    onPress={handlePress}>{activated ? "Save Token" : "Change OpenAI Token"}</Button>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        flex:1,
        alignContent: 'center',
        justifyContent: 'center',

    },
    tokenChangeButton: {
        marginTop: 30,
        justifyContent: 'center',
    },
    input: {
        marginTop: 30,
        borderWidth: 0,
    }
});

export default ChangeToken;
