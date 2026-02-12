import { StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FAB, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppState } from "../../Context/AppStateProvider"
import { getExpensesOfGroup } from '../../sql/expense/get'

const GroupItemMain = () => {
  const [loading, setLoading] = useState(true)
  const [expense, setExpense] = useState([])
  const { selectedGroup } = useAppState()
  const nav = useNavigation()
   console.log(expense)
  useLayoutEffect(() => {
    getExpensesOfGroup(selectedGroup?.id).then(setExpense).then(setLoading(false)).catch((err) => console.log(err))
  }, [])

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={40} />
        {/* <Text style={{ marginTop: 10 }}>Loading expenses...</Text> */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {expense && (
        <View style={styles.emptyState}>
          <Text variant="titleMedium">No expenses yet</Text>
          <Text style={{ opacity: 0.6 }}>
            Tap the button below to add one
          </Text>
        </View>
      )}

      <FAB
        icon="wallet-plus-outline"
        label="Add Expense"
        onPress={() => nav.navigate('GroupAddExpense')}
        style={styles.fab}
      />
    </View>
  )
}

export default GroupItemMain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    borderRadius: 16,
  },
})
