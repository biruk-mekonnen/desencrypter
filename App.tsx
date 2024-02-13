import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {keyGenerator} from './keyGenerator';
import {cipherGenerator} from './cipherGenerator';
import {cipherDecryptor} from './cipherDecryptor';

// import {useNavigation} from '@react-navigation/native';
const DesApp = () => {
  const [K_msg, setalert] = useState('');
  const [keyflag, setflag] = useState(0);
  const [inputHeight, setInputHeight] = useState(40);
  const [text, setText] = useState('');
  const [keyinput, setKeyinput] = useState('');
  const [key, setKey] = useState('');
  const [E_msg, set_E_msg] = useState('');
  const [E_msg_copy, set_E_msg_copy] = useState('');
  const [keyforDEC, setketforDEC] = useState(null);
  const [pad, setpadding] = useState(0);
  const [decrypted_msg, setdecrypted_msg] = useState('');

  let Generatedkeys: null = null;
  let decrypted_text;
  const handleKeyChange = () => {
    if (key.length < 8) {
      setalert('you need 8 characters for your key ');
      setflag(0);
    } else if (key.length == 8) {
      if (text.length > 0) {
        setalert('');
        Generatedkeys = keyGenerator(key);
        setketforDEC(Generatedkeys);
        const {Encrypted, padding} = cipherGenerator(text, Generatedkeys);

        set_E_msg(Encrypted);
        setpadding(padding);
        set_E_msg_copy(E_msg);
      } else {
        setalert('you have to enter a text');
      }
      // setKey(key);

      //setText('');
      //setKey('');
    }
  };

  const handledecryptChange = () => {
    decrypted_text = cipherDecryptor(E_msg, keyforDEC, pad);
    setdecrypted_msg(decrypted_text);
  };

  const handleContentSizeChange = (event: {
    nativeEvent: {contentSize: {height: React.SetStateAction<number>}};
  }) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./wood.jpg')} style={styles.navBar}>
        <Text style={styles.navBarTitle}>DES Encryption / Decryption</Text>
      </ImageBackground>
      <ScrollView>
        <View style={styles.E_container}>
          <Text style={styles.title}>ENCRYPTION </Text>
          <Text>YOUR MESSAGE</Text>
          <TextInput
            placeholder="Enter Text"
            value={text}
            onChangeText={text => setText(text)}
            onContentSizeChange={handleContentSizeChange}
            style={{height: inputHeight, width: 400, fontWeight: 'bold'}}
            multiline={true}
          />
          <View style={styles.key}>
            <Text>YOUR SECRET KEY :</Text>
            <TextInput
              placeholder="Enter secret key"
              value={key}
              onChangeText={key => setKey(key)}
              maxLength={8}
              style={{fontWeight: 'bold', width: 250}}
            />
          </View>

          <Text style={{color: 'red'}}>{K_msg}</Text>
          <Button title="Generate Cipher" onPress={handleKeyChange} />
          <Text style={{width: 400}}>{E_msg}</Text>
        </View>
        <View style={styles.E_container}>
          <Text style={styles.title}>DECRYPTION </Text>
          <Text>YOUR MESSAGE</Text>
          <TextInput
            placeholder={E_msg}
            value={E_msg_copy}
            onChangeText={E_msg_copy => set_E_msg_copy(E_msg_copy)}
            onContentSizeChange={handleContentSizeChange}
            style={{height: inputHeight, width: 400, fontWeight: 'bold'}}
            multiline={true}
          />
          <Button title="Decrypt Cipher" onPress={handledecryptChange} />
          <Text style={{width: 400}}>{decrypted_msg}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  E_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBar: {
    height: 60,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: 'grey',
    fontSize: 25,
    padding: 5,
  },
});

export default DesApp;
