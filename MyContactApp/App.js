import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CreateNewContactScreen from "./screens/CreateNewContactScreen";
import UpdateContactScreen from "./screens/UpdateContactScreen";
import ContactListScreen from "./screens/ContactListScreen";
import FavouriteListScreen from "./screens/FavouriteListScreen";
import store from "./store/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ContactListScreen">
      <Drawer.Screen
        name="ContactListScreen"
        component={ContactListScreen}
        options={{ title: "Contact List" }}
      />
      <Drawer.Screen
        name="FavouriteListScreen"
        component={FavouriteListScreen}
        options={{ title: "Favourite Contacts" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainDrawer">
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateNewContactScreen"
            component={CreateNewContactScreen}
            options={{ title: "Create Contact" }}
          />
          <Stack.Screen
            name="UpdateContactScreen"
            component={UpdateContactScreen}
            options={{ title: "Update Contact" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}