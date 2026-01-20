import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const GroupListItem = ({groups}) => {
  return (
    <TouchableOpacity style={styles.conatiner}>
        <View style={styles.itemContainer}>
         <Text style={styles.text}>{groups.group_name}</Text>
         <Text style={styles.subText}>{ new Date(groups.created_at).toLocaleDateString()}</Text>
        </View>
      
    </TouchableOpacity>
  )
}

export default GroupListItem

const styles = StyleSheet.create({
    conatiner:{
        marginVertical:10,
        padding:7,
        borderWidth:1,
        borderRadius:10,
        width: Dimensions.get("window").width - 70,
        margin:'auto',
        backgroundColor:'#29293d',
        },
    text:{
        color:'white',
        fontSize:20,
        fontWeight:'500'
    },
    itemContainer:{
        height:100,
        maxHeight:100
    },
    subText:{
        color:'white',

    }
})