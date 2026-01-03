import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGroups from "../../Screens/GroupScreen/AllGroups";
import AddGroups from "../../Screens/GroupScreen/AddGroups";
import GroupItem from "../../Screens/GroupScreen/GroupItem";
import GroupMembers from "../../Screens/GroupScreen/GroupMembers";

const Stack = createNativeStackNavigator();

const GroupStackNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="AllGroups" component={AllGroups} />
            <Stack.Screen name="AddGroup"  component={AddGroups}/>
            <Stack.Screen name="GroupItem" component={GroupItem}/>
            <Stack.Screen name="GroupMembers" component={GroupMembers}/>
        </Stack.Navigator>
    )
}

export default GroupStackNavigator