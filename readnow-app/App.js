import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./components/navigators/StackNavigator";
import { useEffect } from "react";
import { socket } from "./api/apis";

export default function App() {
  // const dispatch = useDispatch();
  
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
