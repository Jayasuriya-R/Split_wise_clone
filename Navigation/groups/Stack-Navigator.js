import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGroups from "../../Screens/GroupScreen/AllGroups";
import AddGroups from "../../Screens/GroupScreen/AddGroups";
import GroupItem from "../../Screens/GroupScreen/GroupItem";
import GroupMembers from "../../Screens/GroupScreen/AddGroupMembers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupItemPersons from "../../Screens/GroupScreen/GroupItemPersons";
import GroupItemMain from "../../Screens/GroupScreen/GroupItemMain";
import AddGroupMembers from "../../Screens/GroupScreen/AddGroupMembers";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import GroupAddExpense from "../../Screens/GroupScreen/GroupAddExpense";
import GroupExpenseItem from "../../Screens/GroupScreen/GroupExpenseItem";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const GroupItemNavigator = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Group Details" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen
            name="GroupItemMain"
            component={GroupItemMain}
            options={{ title: "SPLITS" }}
          />
          <Tab.Screen
            name="GroupItemPersons"
            component={GroupItemPersons}
            options={{ title: "MEMBERS" }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export const GroupStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AllGroups" component={AllGroups} />
            <Stack.Screen name="AddGroup" component={AddGroups} />
            <Stack.Screen name="GroupItem" component={GroupItemNavigator} />
            <Stack.Screen  name="AddGroupMembers" component={AddGroupMembers} />
            <Stack.Screen  name="GroupAddExpense" component={GroupAddExpense} />
            <Stack.Screen  name="GroupExpenseItem" component={GroupExpenseItem} />
        </Stack.Navigator>
    )
}

export default GroupStackNavigator