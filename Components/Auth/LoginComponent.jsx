import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const LoginComponent = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
        const [showPassword, setShowPassword] = useState(true)
    const navigation = useNavigation()
    const handleLoginIn = ()=>{
        // console.log(email,password)
    }

    const handleNavigate = ()=>{
       navigation.navigate("singup")
    }
  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>Welcome Back,Login</Text>
      <TextInput 
      style={styles.input}
      label="Email"
      value={email}
      onChangeText={text => setEmail(text)}
      mode='flat'
    />
     <TextInput 
     secureTextEntry={showPassword}
      style={styles.input}
      label="Password"
      value={password}
      onChangeText={text => setPassword(text)}
      mode='flat'
      right={<TextInput.Icon icon={showPassword ? "eye-off" :"eye"} onPress={()=>setShowPassword(!showPassword)}/>}
    />
    <Button mode='contained-tonal' onPress={handleLoginIn} style={{marginVertical:10}}>Login</Button>
    <Button onPress={handleNavigate}>New User? Signup</Button>
    </View>
  )
}

export default LoginComponent

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    textInfo:{
        fontWeight:500,
        fontSize:30,
        padding:5
    },
    input:{
        width:300,
        height:50,
        marginVertical:10
    }
})