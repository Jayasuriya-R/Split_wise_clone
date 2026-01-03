import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllFriends from "../../Screens/FriendScreen/AllFriends";
import AddFriend from "../../Screens/FriendScreen/AddFriend";
import FriendPage from "../../Screens/FriendScreen/FriendPage";

const Stack = createNativeStackNavigator();

const FriendsStackNavigator = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="AllFriends" component={AllFriends} />
            <Stack.Screen name="AddFriend" component={AddFriend} />
            <Stack.Screen name="FriendPage" component={FriendPage} />
        </Stack.Navigator>
    )
}

export default FriendsStackNavigator