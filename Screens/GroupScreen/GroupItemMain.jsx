import { StyleSheet, View, FlatList } from 'react-native'
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={40} />
      </View>
    )
  }

  const renderExpenseItem = ({ item }) => (
    <Card style={styles.expenseCard}>
      <Card.Content>
        <View style={styles.expenseHeader}>
          <View style={styles.expenseInfo}>
            <Text variant="titleMedium" style={styles.expenseDescription}>
              {item.description}
            </Text>
            <Text variant="bodySmall" style={styles.expenseDate}>
              {new Date(item.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text variant="titleLarge" style={styles.amount}>
              ₹{item.amount.toLocaleString()}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.paidByContainer}>
          <Text variant="bodyMedium" style={styles.paidByLabel}>
            Paid by:
          </Text>
          <Chip mode="flat" style={styles.paidByChip}>
            {item.name}
          </Chip>
        </View>

        <View style={styles.statusContainer}>
          <Chip
            mode="outlined"
            style={[
              styles.statusChip,
              item.is_settled ? styles.settledChip : styles.unsettledChip
            ]}
            textStyle={item.is_settled ? styles.settledText : styles.unsettledText}
          >
            {item.is_settled ? '✓ Settled' : 'Unsettled'}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  )

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

  expenseCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },

  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  expenseInfo: {
    flex: 1,
    marginRight: 12,
  },

  expenseDescription: {
    fontWeight: '600',
    marginBottom: 4,
  },

  expenseDate: {
    opacity: 0.6,
  },

  amountContainer: {
    alignItems: 'flex-end',
  },

  amount: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },

  divider: {
    marginVertical: 12,
  },

  paidByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  paidByLabel: {
    marginRight: 8,
    opacity: 0.7,
  },

  paidByChip: {
    backgroundColor: '#e3f2fd',
  },

  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  statusChip: {
    borderRadius: 16,
  },

  settledChip: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },

  unsettledChip: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },

  settledText: {
    color: '#2e7d32',
  },

  unsettledText: {
    color: '#e65100',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    borderRadius: 16,
  },
})