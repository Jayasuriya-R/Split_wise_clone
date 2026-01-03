import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../Screens/AuthScreen/LoginScreen";
import SignUpScreen from "../../Screens/AuthScreen/SignUpScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = ()=>{
    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="singup" component={SignUpScreen} />
    </Stack.Navigator>
    )
}

export default AuthStackNavigator;