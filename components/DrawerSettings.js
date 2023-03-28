import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Slider from "@react-native-community/slider";
import {Button, IndexPath, Select, SelectItem} from "@ui-kitten/components";
import SavedChatsBox from "./SavedChatsBox";
import SettingChunk from "./UI/settingChunk";


function DrawerSettings({}) {
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [temperature, setTemperature] = useState(0.7);
    const [maxLength, setMaxLength] = useState(256);
    const [topP, setTopP] = useState(1);
    const [freqPenalty, setFreqPenalty] = useState(0);
    const [presencePenalty, setPresencePenalty] = useState(0);


    function getLength(number) {
        return number.toString().length;
    }
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <View style={styles.settingChunk}>
                    <SavedChatsBox/>
                </View>

                <View style={styles.settingChunk}>
                    <Text style={styles.title}>Model</Text>
                    <Select style={styles.settingsDropdown} placeholder={"Select a model..."}
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}>
                        <SelectItem title={"gpt-3.5-turbo"}/>
                        <SelectItem title={"gpt-4"}/>

                    </Select>
                </View>

                <SettingChunk title={"Temperature"} value={temperature}>
                    <Slider
                        value={temperature}
                        minimumValue={0}
                        maximumValue={1}
                        onValueChange={(value) => setTemperature(getLength(value) > 1 ? value.toFixed(2) : value)}
                    />
                </SettingChunk>
                <SettingChunk title={"Max length"} value={maxLength}>
                    <Slider
                        value={maxLength}
                        minimumValue={0}
                        maximumValue={2048}
                        onValueChange={(value) => setMaxLength(value.toFixed(0))}
                    />
                </SettingChunk>
                <SettingChunk title={"Top P"} value={topP}>
                    <Slider
                        value={topP}
                        minimumValue={0}
                        maximumValue={1}
                        onValueChange={(value) => setTopP(getLength(value) > 1 ? value.toFixed(2) : value)}
                    />
                </SettingChunk>
                <SettingChunk title={"Frequency penalty"} value={freqPenalty}>
                    <Slider
                        value={freqPenalty}
                        minimumValue={0}
                        maximumValue={2}
                        onValueChange={(value) => setFreqPenalty(getLength(value) > 1 ? value.toFixed(2) : value)}
                    />
                </SettingChunk>
                <SettingChunk title={"Presence penalty"} value={presencePenalty}>
                    <Slider
                        value={presencePenalty}
                        minimumValue={0}
                        maximumValue={2}
                        onValueChange={(value) => setPresencePenalty(getLength(value) > 1 ? value.toFixed(2) : value)}
                    />
                </SettingChunk>
                <Button size={"small"} status={"danger"} style={styles.tokenChangeButton}>Change OpenAI Token</Button>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollContainer: {
        width: '100%',
    },
    settingTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "7%",
        marginBottom: "5%",
    },
    title: {
        marginVertical: 10,
        fontSize: 17,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    value: {
        marginVertical: 10,
        fontSize: 15,
        alignSelf: 'flex-start',
    },
    settingText: {
        fontSize: 15,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    settingChunk: {
        width: '80%',
    },
    settingsDropdown: {
        alignSelf: 'center',
        width: '85%',
    },
    tokenChangeButton: {
        width: '80%',
        marginTop: 30,
        justifyContent: 'center',
    }
});

export default DrawerSettings;
