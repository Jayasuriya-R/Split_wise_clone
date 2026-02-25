import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
import { getActivitiesOfUser } from '../../sql/activity/get'
import { Card, List, useTheme, IconButton } from 'react-native-paper'

const ActivityPage = () => {
  const { user } = useAuth()
  const isFocused = useIsFocused()
  const [activities, setActivities] = useState([])
  const [expandedIds, setExpandedIds] = useState({})
  const { colors } = useTheme()

  const toggle = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    if (isFocused && user?.id) {
      getActivitiesOfUser(user.id).then(setActivities).catch(console.log)
    }
  }, [user?.id, isFocused])

  const getIconForActivity = (text) => {
    const lower = text?.toLowerCase() || ''
    if (lower.includes('group')) return 'account-group'
    if (lower.includes('expense')) return 'currency-usd'
    if (lower.includes('added')) return 'plus-circle'
    if (lower.includes('deleted') || lower.includes('removed')) return 'delete'
    return 'history'
  }

  const formatRelative = (dateString) => {
    if (!dateString) return ''
    const diff = Date.now() - new Date(dateString).getTime()
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

  const renderItem = ({ item }) => {
    const timeLabel = formatRelative(item.created_at)
    const isExpanded = !!expandedIds[item.id]
    return (
      <Card
        style={[styles.card, { backgroundColor: colors.surface }]}
        mode="outlined"
      >
        <List.Accordion
          title={item.activity}
          titleStyle={{ color: colors.text }}
          left={(props) => (
            <List.Icon
              {...props}
              icon={getIconForActivity(item.activity)}
              color={colors.primary}
            />
          )}
          expanded={isExpanded}
          onPress={() => toggle(item.id)}
          style={{ backgroundColor: colors.background }}
        >
          <View style={styles.detailsContent}>
            <Text style={[styles.detailText, { color: colors.text }]}>Timestamp: {new Date(item.created_at).toLocaleString()}</Text>
            <Text style={[styles.detailText, { color: colors.text }]}>Activity ID: {item.id}</Text>
          </View>
        </List.Accordion>
      </Card>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      {activities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconButton icon="history" size={48} color={colors.disabled} />
          <Text style={[styles.empty, { color: colors.disabled }]}>No activities yet</Text>
        </View>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  )
}

export default ActivityPage

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  card: { marginVertical: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', marginTop: 8, fontSize: 16 },
  detailsContent: { padding: 12, backgroundColor: '#f9f9f9' },
  detailText: { fontSize: 14, marginBottom: 4 },
})