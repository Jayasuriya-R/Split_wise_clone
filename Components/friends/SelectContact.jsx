import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import MultiSelect from "react-native-multiple-select";

const SelectContact = ({ onSelectedContacts = () => {} }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  // -----------------------
  // Permission handler
  // -----------------------
  const getContactPermission = async () => {
    try {
      const permission = await Contacts.getPermissionsAsync();

      if (permission.status === "granted") return true;

      if (!permission.canAskAgain) return false;

      const request = await Contacts.requestPermissionsAsync();

      return request.status === "granted";
    } catch (err) {
      console.log("Permission error:", err);
      return false;
    }
  };

  // -----------------------
  // Fetch contacts safely
  // -----------------------
  const loadContacts = async () => {
    try {
      const hasPermission = await getContactPermission();

      if (!hasPermission) {
        console.log("Contacts permission denied");
        setLoading(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
        ],
      });

      // Clean + format contacts
      const formattedContacts = data
        .filter(c => c?.id && c?.name)
        .map(c => ({
          id: c.id,
          name: c.name,
        }));

      setContacts(formattedContacts);
    } catch (err) {
      console.log("Contact fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Selection handler
  // -----------------------
  const handleSelection = (selectedIds) => {
  setSelectedContacts(selectedIds);

  // Convert IDs → full contact objects
  const selectedFullContacts = contacts.filter(contact =>
    selectedIds.includes(contact.id)
  );

  onSelectedContacts(selectedFullContacts);
};

  // -----------------------
  // UI
  // -----------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Contacts</Text>

      {loading ? (
        <Text style={styles.loading}>Loading contacts...</Text>
      ) : (
        <MultiSelect
          uniqueKey="id"
          items={contacts}
          displayKey="name"
          selectedItems={selectedContacts}
          onSelectedItemsChange={handleSelection}
          searchInputPlaceholderText="Search contacts..."
          selectText="Choose contacts"
          styleDropdownMenuSubsection={styles.dropdown}
        />
      )}
    </View>
  );
};

export default SelectContact;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },

  loading: {
    color: "#777",
  },

  dropdown: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});