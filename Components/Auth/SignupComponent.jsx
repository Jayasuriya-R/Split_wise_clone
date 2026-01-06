import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthProvider';

const SignupComponent = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const navigation = useNavigation()
  const auth = useAuth()
  const handleSignUp = async() => {
    try{
        auth.signup(name, email, phone, password)
    }catch(error){
      console.log(error)
    }
    
  }

  const handleNavigate = () => {
    navigation.navigate("login")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>Welcome! Register</Text>
      <TextInput
        style={styles.input}
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        mode='flat'
      />
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode='flat'
      />
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        label="Phone"
        value={phone}
        onChangeText={text => setPhone(text)}
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
      <Button mode='contained-tonal' onPress={handleSignUp} style={{ marginVertical: 10 }}>Register</Button>
      <Button onPress={handleNavigate}>Already registered User? Login</Button>
    </View>
  )
}

export default SignupComponent

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