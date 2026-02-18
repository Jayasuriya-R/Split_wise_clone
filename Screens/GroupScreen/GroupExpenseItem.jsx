import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'

const GroupExpenseItem = () => {
  const { params: { expenseItem } } = useRoute()
  const nav = useNavigation()

  const date = new Date(expenseItem.created_at)
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isSettled = expenseItem.is_settled === 1 || expenseItem.is_settled === true

  return (
    <View style={styles.root}>
      <Appbar.Header statusBarHeight={0} style={styles.appbar}>
        <Appbar.BackAction onPress={() => nav.goBack()} color="#fff" />
        <Appbar.Content title={expenseItem.description} titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>

        {/* Amount hero */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Total Amount</Text>
          <Text style={styles.heroAmount}>₹{expenseItem.amount.toLocaleString()}</Text>
          <View style={[styles.badge, isSettled ? styles.badgeSettled : styles.badgeUnsettled]}>
            <Text style={[styles.badgeText, isSettled ? styles.badgeTextSettled : styles.badgeTextUnsettled]}>
              {isSettled ? '✓ Settled' : 'Unsettled'}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Paid by</Text>
            <View style={styles.avatarRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{expenseItem.name?.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={styles.rowValue}>{expenseItem.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Date</Text>
            <View style={styles.dateCol}>
              <Text style={styles.rowValue}>{formattedDate}</Text>
              <Text style={styles.rowSub}>{formattedTime}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Group</Text>
            <Text style={styles.rowValue}>Group #{expenseItem.group_id}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Expense ID</Text>
            <Text style={styles.rowSub}>#{expenseItem.id}</Text>
          </View>

        </View>

      </ScrollView>
    </View>
  )
}

export default GroupExpenseItem

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  appbar: {
    backgroundColor: '#1a1a2e',
    elevation: 0,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  container: {
    padding: 16,
    gap: 14,
  },

  // Hero card
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1c1c1e',
    letterSpacing: -1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  badgeSettled: { backgroundColor: '#e6f9ec' },
  badgeUnsettled: { backgroundColor: '#fff0f0' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  badgeTextSettled: { color: '#2a9d4e' },
  badgeTextUnsettled: { color: '#e53935' },

  // Details card
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLabel: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  rowSub: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 2,
    textAlign: 'right',
  },
  dateCol: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#f2f2f7',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
})