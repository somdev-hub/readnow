import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
// import { Provider, useDispatch, useSelector } from "react-redux";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./components/navigators/StackNavigator";
import { registerRootComponent } from "expo";
import { AuthProvider } from "./contexts/AuthContext";
import NavigationService from "./services/NavigationService";
// import { useEffect, useState } from "react";
// import NetInfo from "@react-native-community/netinfo";
// import * as SecureStorage from "expo-secure-store";
// import AuthStackNavigator from "./components/navigators/AuthStackNavigator";
// import { updateIsLoggedIn } from "./redux/authSlice";
import Navigation from "./components/navigators/Navigation";
import { Provider } from "react-redux";

export default function App() {
  // // const [loggedIn, setLoggedIn] = useState(true);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const dispatch = useDispatch();
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   const decodeToken = async () => {
  //     const token = await SecureStorage.getItemAsync("token");

  //     if (token) {
  //       setToken(token);
  //       decodeUser(token)
  //         .then((response) => {
  //           console.log(response);
  //           if (response.status != 200) {
  //             SecureStorage.deleteItemAsync("token");
  //             SecureStorage.deleteItemAsync("email");
  //             // setLoggedIn(false);
  //             dispatch(updateIsLoggedIn(false));
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       dispatch(updateIsLoggedIn(false));
  //     }
  //   };
  //   decodeToken();
  // }, [token]);
  return (
    <AuthProvider>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          >
            <Navigation />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);
