import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Autocomplete, AutocompleteItem, Button} from "@ui-kitten/components";
import SavedChatsBox from "./SavedChatsBox";
import SettingChunk from "./UI/settingChunk";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeToken from "./UI/ChangeToken";
import Ionicons from "react-native-vector-icons/Ionicons";

const models = [
    { name: 'gpt-3.5-turbo' },
    { name: 'gpt-4' },

];


function DrawerSettings({}) {


    const [model, setModel] = useState("");
    const [temperature, setTemperature] = useState(0.7);
    const [maxLength, setMaxLength] = useState(256);
    const [topP, setTopP] = useState(1);
    const [freqPenalty, setFreqPenalty] = useState(0);
    const [presencePenalty, setPresencePenalty] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);


    async function initialLoader(){
        if(!!await AsyncStorage.getItem('settings') && initialLoad){
            await AsyncStorage.getItem('settings').then((settings) => {
                settings = JSON.parse(settings);
                setModel(settings.model);
                setTemperature(parseFloat(settings.temperature));
                setMaxLength(parseInt(settings.max_length));
                setTopP(parseFloat(settings.top_p));
                setFreqPenalty(parseFloat(settings.frequency_penalty));
                setPresencePenalty(parseFloat(settings.presence_penalty));
            })
            setInitialLoad(false);
        }
    }

    initialLoader();



    function getLength(number) {
        return number.toString().length;
    }

    function saveSettings(modelName) {
        // Check if settings are the same
        AsyncStorage.setItem('settings', JSON.stringify({
            model: modelName,
            temperature: temperature,
            max_length: maxLength,
            top_p: topP,
            frequency_penalty: freqPenalty,
            presence_penalty: presencePenalty,
        })).catch((err) => {
            console.log(err);
        });
    }

    function resetSettings(){
        setModel("gpt-3.5-turbo");
        setTemperature(0.7);
        setMaxLength(256);
        setTopP(1);
        setFreqPenalty(0);
        setPresencePenalty(0);
    }

    useEffect(() => {
        if(!initialLoad){
            saveSettings(model);
        }
    }, [temperature, maxLength, topP, freqPenalty, presencePenalty])

    const renderOption = (item, index) => {
        return (
            <AutocompleteItem key={index} title={item.name}/>
        );
    };
    const onSelect = async (query) => {
        handleModelChange(models[query].name)
    }
    const clearInput = ()=>{
        setModel("");
    }
    const renderCloseIcon = () => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <View style={{padding: 2}}>
            <Ionicons name="close-circle-outline" size={25} color="black"/>
            </View>
        </TouchableWithoutFeedback>
    );
    const handleModelChange = (text) =>{
        setModel(text);
        saveSettings(text);
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                <View style={styles.settingChunk}>
                    <SavedChatsBox/>
                </View>

                <View style={styles.settingChunk}>
                    <Text style={styles.title}>Model</Text>

                    <Autocomplete placeholder={"Select a model..."}
                                  value={model}
                                  onChangeText={handleModelChange}
                                  onSelect={onSelect}
                                  accessoryRight={renderCloseIcon}
                    >
                        {models.map(renderOption)}
                    </Autocomplete>
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
                        maximumValue={8192}
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


                <Button status={"basic"} style={styles.tokenChangeButton} onPress={resetSettings}>Reset Settings</Button>
                <ChangeToken/>
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
        paddingBottom: "10%",
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
