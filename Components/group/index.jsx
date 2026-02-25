import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import GroupLayout from './GroupLayout'
import GroupList from './GroupList'

const GroupContent = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const handleSearchPress = () => {
      setShowSearch(prev => {
        if (prev) setSearchQuery('')
        return !prev
      })
    }

    return (
        <GroupLayout onSearch={handleSearchPress}>
            <GroupList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSearch={showSearch}
            />
        </GroupLayout>
    )
}

export default GroupContent

const styles = StyleSheet.create({})