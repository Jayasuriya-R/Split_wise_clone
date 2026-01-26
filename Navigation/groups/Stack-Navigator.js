import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGroups from "../../Screens/GroupScreen/AllGroups";
import AddGroups from "../../Screens/GroupScreen/AddGroups";
import GroupItem from "../../Screens/GroupScreen/GroupItem";
import GroupMembers from "../../Screens/GroupScreen/AddGroupMembers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupItemPersons from "../../Screens/GroupScreen/GroupItemPersons";
import GroupItemMain from "../../Screens/GroupScreen/GroupItemMain";
import AddGroupMembers from "../../Screens/GroupScreen/AddGroupMembers";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const GroupItemNavigator = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen options={{title:"SPLITS"}} name="GroupItemMain" component={GroupItemMain}/>
            <Tab.Screen options={{title:"MEMBERS"}} name="GroupItemPersons" component={GroupItemPersons}/>
        </Tab.Navigator>
    )
}
 
const GroupStackNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="AllGroups" component={AllGroups} />
            <Stack.Screen name="AddGroup"  component={AddGroups}/>
            <Stack.Screen  name="GroupItem" component={GroupItemNavigator}/>
            <Stack.Screen  name="AddGroupMembers" component={AddGroupMembers}/>
        </Stack.Navigator>
    )
}

export default GroupStackNavigator