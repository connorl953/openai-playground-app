import React, {createContext, useState} from 'react';

export const SettingsContext = createContext({
    settings:{
        token: "",
        temperature: 0.7,
        max_length: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        setToken: () => {},
        setTemperature: () => {},
        setMaxLength: () => {},
        setTopP: () => {},
        setFrequencyPenalty: () => {},
        setPresencePenalty: () => {},
    }
});
/**
 * SettingsContextProvider
 * This component provides a context for the settings of the application.
 * It initializes the settings state with default values.
 *
 * This component is unused for now.
 *
 * @param props The props passed to the component.
 * @return A JSX element that provides the settings context.
 */
const SettingsContextProvider = (props) => {
    const [settings, setSettings] = useState({
        token: "",
        temperature: 0.7,
        max_length: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });


    return (
        <SettingsContext.Provider
            value={{settings}}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
