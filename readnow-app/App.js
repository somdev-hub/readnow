import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./components/navigators/StackNavigator";
import { registerRootComponent } from "expo";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {

  return (
    <AuthProvider>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);
