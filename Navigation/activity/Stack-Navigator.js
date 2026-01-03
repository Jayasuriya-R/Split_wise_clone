import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Activity from "../../Screens/ActivityScreen/ActivityPage";
import ActivityPage from "../../Screens/ActivityScreen/ActivityPage";

const Stack = createNativeStackNavigator();

const ActivityStackNavigator = ()=>{
    return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="ActivityPage" component={ActivityPage}/>
    </Stack.Navigator>
    )
}

export default ActivityStackNavigator;