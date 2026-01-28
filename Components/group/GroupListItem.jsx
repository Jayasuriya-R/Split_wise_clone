import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Chip, Icon, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useAppState } from '../../Context/AppStateProvider'


const GroupListItem = ({groups}) => {
    const nav = useNavigation()
    const {setSelectedGroup} = useAppState()
    const navigateToGroupItem = ()=>{
       setSelectedGroup(groups) 
     nav.navigate('GroupItem',{groups})
    }
  return (
    <TouchableOpacity style={styles.conatiner} onPress={navigateToGroupItem}>
    <View style={styles.itemContainer}>
        <View >
         <Text style={styles.text}>{groups.group_name}</Text>
         <Text style={styles.subText}>{ new Date(groups.created_at).toLocaleDateString()}</Text>
        </View>
        <View style={styles.iconContainer}>
         <Chip style={{ backgroundColor: 'white' }} icon="account">4</Chip>
        </View>
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
        maxHeight:100,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    subText:{
        color:'white',

    },
    iconContainer:{
        padding:3
    }
})