import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, FAB, Text, Card, Divider, Chip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppState } from "../../Context/AppStateProvider"
import { getExpensesOfGroup } from '../../sql/expense/get'

const GroupItemMain = () => {
  const [loading, setLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const { selectedGroup } = useAppState()
  const nav = useNavigation()
   
  useLayoutEffect(() => {
    getExpensesOfGroup(selectedGroup?.id)
      .then((data) => {
        setExpenses(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleExpenseItemClick = (expenseItem)=>{
    nav.navigate("GroupExpenseItem",{expenseItem})
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={40} />
      </View>
    )
  }

 const renderExpenseItem = ({ item }) => (

  <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={()=>handleExpenseItemClick(item)}>
    {/* Left: date block */}
    <View style={styles.dateBlock}>
      <Text style={styles.dateMonth}>
        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
      </Text>
      <Text style={styles.dateDay}>
        {new Date(item.created_at).getDate()}
      </Text>
    </View>

    {/* Center: description + paid by */}
    <View style={styles.infoBlock}>
      
      <Text style={styles.description} numberOfLines={1}>📑 {item.description}</Text>
      <Text style={styles.paidBy}>Paid by: {item.name}</Text>
    </View>

    {/* Right: amount + settled */}
    <View style={styles.amountBlock}>
      <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
      <View style={[styles.badge, item.is_settled ? styles.badgeSettled : styles.badgeUnsettled]}>
        <Text style={[styles.badgeText, item.is_settled ? styles.badgeTextSettled : styles.badgeTextUnsettled]}>
          {item.is_settled ? '✓ Settled' : 'Unsettled'}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      {expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="titleMedium">No expenses yet</Text>
          <Text style={styles.emptySubtext}>
            Add your first expense to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
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

  emptySubtext: {
    opacity: 0.6,
    marginTop: 8,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },

card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 14,
    marginVertical: 5,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  // Date
  dateBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    minWidth: 32,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8e8e93',
    letterSpacing: 0.4,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1c1c1e',
    lineHeight: 24,
  },

  // Info
  infoBlock: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1c1c1e',
    marginBottom: 3,
  },
  paidBy: {
    fontSize: 12,
    color: '#8e8e93',
    fontWeight: '400',
  },

  // Amount
  amountBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c1c1e',
    letterSpacing: -0.3,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeSettled: {
    backgroundColor: '#e6f9ec',
  },
  badgeUnsettled: {
    backgroundColor: '#fff0f0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextSettled: {
    color: '#2a9d4e',
  },
  badgeTextUnsettled: {
    color: '#e53935',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    borderRadius: 16,
  },
})