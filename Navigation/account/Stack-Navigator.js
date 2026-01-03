import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../../Screens/AccountScreen/Account";

const Stack = createNativeStackNavigator();

const AccountStackNavigator = ()=>{
    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Account" component={Account}/>
    </Stack.Navigator>
    )
}

export default AccountStackNavigator;