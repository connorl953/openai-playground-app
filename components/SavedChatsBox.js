import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, IndexPath, Select, SelectItem} from "@ui-kitten/components";


function SavedChatsBox({}) {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Chats (W.I.P)</Text>
            <Select disabled={true} style={styles.dropdown} placeholder={"Load a chat..."}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}>
                <SelectItem title={"Preset 1"}/>
                <SelectItem title={"Preset 2"}/>

            </Select>
            <View style={styles.buttonContainer}>

                <View style={styles.innerButtonContainer}>
                    <Button size={"small"} status={"basic"} style={styles.button}>Rename</Button>
                    <Button size={"small"} status={"danger"} style={styles.button}>Delete Chat</Button>
                </View>
                <Button size={"small"}  style={[styles.button, {width: '100%'}]}>New Chat</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 0,
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'left',
    },
    dropdown: {
        width: '100%',
    },
    title: {
        marginBottom: 15,
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        width: '100%',
        paddingVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    innerButtonContainer: {
        flexDirection: 'row',
        marginBottom: 7,
    },
    button: {
        flex: 1,
        margin: 0,
        borderRadius: 0,
    }
});

export default SavedChatsBox;
