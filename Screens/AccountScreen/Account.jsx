import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '../../Context/AuthProvider';
import {
  Button,
  Card,
  Avatar,
  Text,
  Divider,
  List,
  useTheme,
  IconButton,
  Chip,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Account = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  // Get initials from name
  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Card with Avatar */}
      <Card style={styles.headerCard} elevation={4}>
        <Card.Content style={styles.headerContent}>
          <Avatar.Text
            size={80}
            label={getInitials(user?.name)}
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          />
          <Text variant="headlineMedium" style={styles.userName}>
            {user?.name}
          </Text>
          <Text variant="bodyMedium" style={styles.userEmail}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>

      {/* Account Details Card */}
      <Card style={styles.detailsCard} elevation={2}>
        <Card.Title
          title="Account Details"
          titleVariant="titleLarge"
          left={(props) => <Avatar.Icon {...props} icon="account-details" />}
        />
        <Card.Content>
          <List.Item
            title="Email Address"
            description={user?.email}
            left={(props) => (
              <List.Icon {...props} icon="email" color={theme.colors.primary} />
            )}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Phone Number"
            description={user?.phone}
            left={(props) => (
              <List.Icon {...props} icon="phone" color={theme.colors.primary} />
            )}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="User ID"
            description={`#${user?.id}`}
            left={(props) => (
              <List.Icon {...props} icon="identifier" color={theme.colors.primary} />
            )}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Member Since"
            description={formatDate(user?.created_at)}
            left={(props) => (
              <List.Icon {...props} icon="calendar" color={theme.colors.primary} />
            )}
            style={styles.listItem}
          />
          <Divider />
          
          <List.Item
            title="Account Status"
            description={user?.isRegistered ? 'Registered' : 'Guest'}
            left={(props) => (
              <List.Icon
                {...props}
                icon={user?.isRegistered ? 'check-circle' : 'clock-outline'}
                color={user?.isRegistered ? '#4CAF50' : '#FF9800'}
              />
            )}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      

      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutButton}
        contentStyle={styles.buttonContent}
        onPress={logout}
      >
        Logout
      </Button>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 16,
    marginTop: 20,
    borderRadius: 16,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#666',
    marginBottom: 12,
  },
  registrationChip: {
    marginTop: 8,
  },
  chipText: {
    fontSize: 12,
  },
  detailsCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  listItem: {
    paddingVertical: 4,
  },
  actionsCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  actionButton: {
    marginVertical: 6,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  bottomSpacer: {
    height: 32,
  },
});