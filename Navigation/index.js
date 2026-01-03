import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import GroupStackNavigator from "../Navigation/groups/Stack-Navigator";
import FriendsStackNavigator from "./friends/Stack-Navigator";
import ActivityStackNavigator from "./activity/Stack-Navigator";
import AccountStackNavigator from "./account/Stack-Navigator";
import AuthStackNavigator from "./auth/Stack-Navigator";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
 const isLoggedIn = false

 if(!isLoggedIn){
  return(
    <NavigationContainer>
      <AuthStackNavigator/>
    </NavigationContainer>
  )
 }


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: () => null,   
          tabBarStyle: { height: 60, paddingBottom: 6 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      >
        <Tab.Screen
          name="Groups"
          component={GroupStackNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesome
                name="user"
                size={20}
                focused={focused}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Friends"
          component={FriendsStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name="users" size={20} color={color} />,
          }}
        />

        <Tab.Screen
          name="Activity"
          component={ActivityStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name="bell" size={20} color={color} />,
          }}
        />

        <Tab.Screen
          name="Account"
          component={AccountStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name="cog" size={20} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
