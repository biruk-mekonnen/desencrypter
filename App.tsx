/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {keyGenerator} from './keyGenerator';
import Buffer from 'react-native-buffer';
export default function App() {
  const [K_msg, setalert] = useState('');
  const [keyflag, setflag] = useState();
  const [text, setText] = useState('');
  const [message, setmessage] = useState('');
  let Generatedkeys = null;

  function handelkey(text) {
    if (text.length < 8) {
      setalert('add more characters ');
      setflag(0);
    }
    if (text.length == 8) {
      setalert('');
      Generatedkeys = keyGenerator(text);
      setflag(1);
    }
  }

  function handelencrypt(keyflag) {
    if (keyflag !== 1) {
      setalert('you have to generate the key first');
    }
  }

  const userInput = 'Your input text here';
  const buffer = Buffer.from(userInput, 'utf8');

  const chunkSize = 8;
  for (let i = 0; i < buffer.length; i += chunkSize) {
    const chunk = buffer.slice(i, i + chunkSize);
    // Process the chunk of 8 characters here
    console.log(chunk.toString('utf8'));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        minLength={8}
        maxLength={8}
        placeholder="Enter secret key"
        onChangeText={text => setText(text)} // Update the state variable with the onChangeText event
        value={text}
      />
      <Button title="Generate Keys" onPress={() => handelkey(text)} />
      <Text style={styles.msg}>{K_msg}</Text>
      <TextInput
        style={styles.input}
        minLength={8}
        maxLength={8}
        placeholder="Enter alert"
        onChangeText={message => setmessage(message)} // Update the state variable with the onChangeText event
        value={message}
      />
      <Button title="encrypt message" onPress={() => handelencrypt(keyflag)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  msg: {
    color: 'red',
  },
});







