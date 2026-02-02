import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { useAuth } from '../../Context/AuthProvider';


const RenderUserItem = ({ dataKey, users, expenseAmt, expenseData, loginUserId }) => {
    const user = users.find((u) => u.id === +dataKey);
    if (!user) return null;
    console.log(user)
    console.log(loginUserId)
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: "#fff",
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar.Text
                    label={user.name[0].toUpperCase()}
                    size={36}
                />

                <Text
                    style={{
                        marginLeft: 12,
                        fontSize: 16,
                        fontWeight: "500",
                    }}
                >
                    {loginUserId === user.id ? "Paid By you:" : `you owe ${user.name}:`}
                </Text>
            </View>

            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: expenseData[dataKey] >= 0 ? "green" : "red",
                }}
            >
                ₹{loginUserId === user.id ? expenseAmt : expenseAmt * (expenseData[dataKey] / 100)}
            </Text>
        </View>
    );
};

const ExpenseDetails = ({ expenseData, users, expenseAmt }) => {
    const Auth = useAuth()
  console.log("auth",Auth.user)
    return (
        <View>
            <FlatList
                data={Object.keys(expenseData)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <RenderUserItem
                        dataKey={item}
                        expenseData={expenseData}
                        users={users}
                        expenseAmt={expenseAmt}
                        loginUserId={Auth.user.id}
                    />
                )}
            />

        </View>
    )
}

export default ExpenseDetails

const styles = StyleSheet.create({})