import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from "@ui-kitten/components";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import DrawerSettings from "./components/DrawerSettings";


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

export default function App() {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});