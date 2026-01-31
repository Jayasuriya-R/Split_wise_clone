import { StyleSheet, Text, View } from 'react-native'
import React, { useActionState, useLayoutEffect, useState } from 'react'
import { Appbar, Chip, PaperProvider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import SplitByPercentage from '../../Components/expense/SplitByPercentage'
import { GET_MEMBERS_OF_GROUP } from '../../sql/group-member/get'
import { useAppState } from '../../Context/AppStateProvider'

const GroupAddExpense = () => {
    const nav = useNavigation()
    const SplitType = { percentage: "percentage", equally: "equally" }
    const [splitType, setSplitType] = useState(SplitType.equally)
    const [modalVisible, setModalVisible] = useState(false)
    const [users, setUsers] = useState([])
    const groupId = useAppState().selectedGroup?.id

    useLayoutEffect(() => { GET_MEMBERS_OF_GROUP(groupId).then(setUsers).catch(err => console.log(err)) }, [])
    const splitByPercentage = () => {
        setSplitType(SplitType.percentage)
        setModalVisible(true)
    }
    return (
        <PaperProvider>
            <View>
                <Appbar.Header statusBarHeight={0}>
                    <Appbar.BackAction onPress={() => nav.goBack()} />
                    <Appbar.Content title="GroupAddExpense" />
                </Appbar.Header>
                <View style={styles.selectionContainer}>
                    <Chip icon={splitType === 'equally' ? "check" : ''} onPress={() => setSplitType(SplitType.equally)}>Equally</Chip>
                    <Chip icon={splitType === 'percentage' ? "check" : ''} onPress={splitByPercentage}>Percentage</Chip>
                </View>
                <SplitByPercentage visible={modalVisible} close={() => setModalVisible(false)} users={users} />
            </View>
        </PaperProvider>
    )
}

export default GroupAddExpense

const styles = StyleSheet.create({
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10
    }
})