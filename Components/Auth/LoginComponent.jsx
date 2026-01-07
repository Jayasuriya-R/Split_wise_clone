import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthProvider';

const LoginComponent = () => {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const navigation = useNavigation()
  const auth = useAuth()
  

  const handleLoginIn = () => {
    try {
      auth.login(userId,password)
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    navigation.navigate("singup")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>Welcome Back,Login</Text>
      <TextInput
        style={styles.input}
        label="userId"
        value={userId}
        onChangeText={text => setUserId(text)}
        mode='flat'
      />
      <TextInput
        secureTextEntry={showPassword}
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        mode='flat'
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
      />
      <Button mode='contained-tonal' onPress={handleLoginIn} style={{ marginVertical: 10 }}>Login</Button>
      <Button onPress={handleNavigate}>New User? Signup</Button>
    </View>
  )
}

export default LoginComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    fontWeight: 500,
    fontSize: 30,
    padding: 5
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 10
  }
})