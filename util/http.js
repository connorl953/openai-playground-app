import EventSource from "react-native-sse";


let es;

/**
 * openAiCompletion()
 * This function initializes a connection to the OpenAI API for text completion.
 *
 * @param token The API token to use for authentication.
 * @param settings An object containing settings for the completion.
 * @param messages An array of messages to use as context for the completion.
 * @param handleText A callback function to handle the completed text.
 * @param onCompletion A callback function to handle completion of the text.
 * @param onError A callback function to handle errors that occur during the completion process.
 */
export const openAiCompletion = (token, settings, messages, handleText, onCompletion, onError) => {
    let fullText = "";



    const params = {
        'messages': messages,
        'model': settings.model,
        'temperature': parseFloat(settings.temperature),
        'max_tokens': parseInt(settings.max_length),
        'top_p': parseFloat(settings.top_p),
        'frequency_penalty': parseFloat(settings.frequency_penalty),
        'presence_penalty': parseFloat(settings.presence_penalty),
        'stream': true,
    }
    es = new EventSource("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: {
                toString: function () {
                    return "Bearer " + token;
                }
            }
        },
        body: JSON.stringify(params),
        method: "POST",

    });
    console.log("Starting completion with params: " + JSON.stringify(params))
    const url = new URL("https://api.openai.com/v1/chat/completions");
    let tokens = 0;
    let cachedText = "";
    es.addEventListener("open", (event) => {

    });
    es.addEventListener("close", (event) => {
    });
    es.addEventListener("error", (event) => {
        onError(event);
        es.removeAllEventListeners();
        es.close();
    });
    es.addEventListener("message", (event) => {
        if (event.data.includes("[DONE]")) {
            console.log("Closing...");
            if (cachedText.length > 0) {
                handleText(cachedText);
                cachedText = "";
            }
            onCompletion();
            es.removeAllEventListeners();
            es.close();
        } else {
            if (isValidJson(event.data)) {
                let json = JSON.parse(event.data);
                if (!!json.choices[0].delta && !!json.choices[0].delta.content) {
                    fullText += json.choices[0].delta.content;
                    tokens++;
                    cachedText += json.choices[0].delta.content;
                    if (tokens % 1 === 0) {
                        handleText(cachedText);
                        cachedText = "";
                    }
                }
            }
        }
    });

    function isValidJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}
export const cancelCompletion = () => {
    es.removeAllEventListeners();
    es.close();
}
