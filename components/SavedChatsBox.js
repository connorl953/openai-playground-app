import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, IndexPath, Select, SelectItem} from "@ui-kitten/components";



function SavedChatsBox({}) {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Chats</Text>
            <Select style={styles.dropdown} placeholder={"Load a chat..."}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}>
                <SelectItem title={"Preset 1"}/>
                <SelectItem title={"Preset 2"}/>

            </Select>
            <View style={styles.buttonContainer}>
                <Button size={"small"} style={styles.button}>New Chat</Button>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        minWidth: 100,
        width: '100%',
        paddingVertical: 5,
    }
});

export default SavedChatsBox;
