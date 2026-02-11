import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useActionState, useLayoutEffect, useState } from 'react'
import { Appbar, Button, Chip, PaperProvider, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import SplitByPercentage from '../../Components/expense/SplitByPercentage'
import { GET_MEMBERS_OF_GROUP } from '../../sql/group-member/get'
import { useAppState } from '../../Context/AppStateProvider'
import ExpenseDetails from '../../Components/expense/ExpenseDetails'
import { addNewExpense } from '../../sql/expense/add'
import { useAuth } from '../../Context/AuthProvider'

const GroupAddExpense = () => {
    const nav = useNavigation()
    const SplitType = { percentage: "percentage", equally: "equally" }
    const [splitType, setSplitType] = useState(SplitType.equally)
    const [modalVisible, setModalVisible] = useState(false)
    const [users, setUsers] = useState([])
    const [expenseDesc, setExpenseDesc] = useState('')
    const [expenseAmt, setExpenseAmt] = useState('')
    const [expenseData, setExpenseData] = useState(null)
    const groupId = useAppState().selectedGroup?.id
    const {user} = useAuth()

    useLayoutEffect(() => { GET_MEMBERS_OF_GROUP(groupId).then(setUsers).catch(err => console.log(err)) }, [])
    const splitByPercentage = () => {
        setSplitType(SplitType.percentage)
        setModalVisible(true)
    }
    const closeModal = (data) => {
        setExpenseData(data)
        setModalVisible(false)
    }
    const handleCreateSplit = async() => {
       try {
        await addNewExpense(expenseData,+expenseAmt,expenseDesc,user?.id,+groupId)
        alert("Success")
       } catch (error) {
        console.log("Failed")
       }
    }
    const splitEqually = () => {
        setSplitType(SplitType.equally)
        const equalShare = 100 / users.length
        const expData = {}
        users?.forEach((user) => expData[user.id] = equalShare)
        setExpenseData(expData)
    }

    return (
        <PaperProvider>
            <View>
                <Appbar.Header statusBarHeight={0}>
                    <Appbar.BackAction onPress={() => nav.goBack()} />
                    <Appbar.Content title="GroupAddExpense" />
                </Appbar.Header>
                <View style={styles.selectionContainer}>
                    <Chip icon={splitType === 'equally' ? "check" : ''} onPress={splitEqually}>Equally</Chip>
                    <Chip icon={splitType === 'percentage' ? "check" : ''} onPress={splitByPercentage}>Percentage</Chip>
                </View>
                <SplitByPercentage visible={modalVisible} close={closeModal} users={users} />
                <View style={styles.inputBox}>
                    <View style={{ alignItems: 'center' }} >
                        <TextInput
                            mode="outlined"
                            value={expenseDesc}
                            left={<TextInput.Icon icon="receipt" />}
                            style={styles.input}
                            placeholder='Receipt'
                            onChangeText={(text) => setExpenseDesc(text)}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TextInput
                            mode="outlined"
                            value={expenseAmt}
                            left={<TextInput.Icon icon="currency-rupee" />}
                            style={styles.input}
                            keyboardType='number-pad'
                            placeholder='Rupees'
                            onChangeText={(text) => setExpenseAmt(text)}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Button onPress={handleCreateSplit} mode='contained-tonal'>Create Split</Button>
                    </View>
                    {expenseData && users && <ExpenseDetails expenseData={expenseData} users={users} expenseAmt={expenseAmt} />}
                </View>
            </View>
        </PaperProvider>
    )
}

export default GroupAddExpense

const styles = StyleSheet.create({
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
        gap: 10
    },
    inputBox: {
        justifyContent: 'center',
        gap: 20,
        marginTop: 20
    },
    input: {
        width: 350
    }
})