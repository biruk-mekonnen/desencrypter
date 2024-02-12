import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
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

  let Generatedkeys: null = null;
  let encrypted_text;
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
    cipherDecryptor(E_msg, keyforDEC, pad);
  };

  const handleContentSizeChange = (event: {
    nativeEvent: {contentSize: {height: React.SetStateAction<number>}};
  }) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <View>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>
        DES Encryption / Decryption
      </Text>

      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Encryption </Text>

      <TextInput
        placeholder="Enter Text"
        value={text}
        onChangeText={text => setText(text)}
        onContentSizeChange={handleContentSizeChange}
        style={{height: inputHeight, borderColor: 'gray', borderWidth: 1}}
        multiline={true}
      />

      <TextInput
        placeholder="Enter secret key"
        value={key}
        onChangeText={key => setKey(key)}
        maxLength={8}
      />

      <Text>{K_msg}</Text>
      <Button title="Generate Cipher" onPress={handleKeyChange} />
      <Text>{E_msg}</Text>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Decryption </Text>
      <TextInput
        placeholder={E_msg}
        value={E_msg_copy}
        onChangeText={E_msg_copy => set_E_msg_copy(E_msg_copy)}
        onContentSizeChange={handleContentSizeChange}
        style={{height: inputHeight, borderColor: 'gray', borderWidth: 1}}
      />
      <Button title="Decrypt Cipher" onPress={handledecryptChange} />
    </View>
  );
};

export default DesApp;
