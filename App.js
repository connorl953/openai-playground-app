import {createDrawerNavigator, DrawerContentScrollView} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from "@ui-kitten/components";
import DrawerSettings from "./components/DrawerSettings";
import {StatusBar} from "expo-status-bar";


function CustomDrawerContent(props) {
    return (
        <>
            <DrawerContentScrollView {...props}>
                <DrawerSettings/>
            </DrawerContentScrollView>
        </>
    );
}

const Drawer = createDrawerNavigator();
/**
 * chatStack()
 * This function returns a JSX component that renders the chat application with a drawer navigation.
 *
 * @return A JSX component that renders the chat application.
 */
function chatStack() {
    return (

        <ApplicationProvider {...eva} theme={eva.light}>

            <NavigationContainer>
                <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={
                    {
                        drawerPosition: "right",
                        drawerType: "slide",
                        headerShown: false,
                        swipeEnabled: false,
                    }}
                >
                    <Drawer.Screen name={"Home"} component={HomeScreen} options={{
                        backgroundColor: "#f7f7f8",
                    }}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </ApplicationProvider>

    );
}

/**
 * App()
 * This is the main component of the application.
 * It renders the StatusBar and the chatStack component.
 *
 * @return The JSX code to render the StatusBar and chatStack.
 */
export default function App() {
    return (
        <>
            <StatusBar style="dark"/>
            {chatStack()}
        </>
    );
}

