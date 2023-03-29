import EventSource from "react-native-sse";


let es;
export const openAiCompletion = (messages, handleText, onCompletion) => {
    let fullText = "";
    const params = {
        'messages': messages,
        'model': 'gpt-3.5-turbo',
        'max_tokens': 2048,
        'stream': true,
    }
    es = new EventSource("https://api.openai.com/v1/chat/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: {
                toString: function () {
                    return "Bearer "
                }
            }
        },
        body: JSON.stringify(params),
        method: "POST",

    });
    const url = new URL("https://api.openai.com/v1/chat/completions");
    let tokens = 0;
    let cachedText = "";
    es.addEventListener("open", (event) => {

    });
    es.addEventListener("close", (event) => {
    });
    es.addEventListener("error", (event) => {


    });
    es.addEventListener("message", (event) => {
        if (event.data.includes("[DONE]")) {
            console.log("Closing...");
            if(cachedText.length > 0){
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
                    fullText+=json.choices[0].delta.content;
                    tokens++;
                    cachedText+=json.choices[0].delta.content;
                    if(tokens % 1 === 0){
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
