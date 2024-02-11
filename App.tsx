import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {keyGenerator} from './keyGenerator';
import {chiperGenerator} from './chiperGenerator';
// import {useNavigation} from '@react-navigation/native';
const DesApp = () => {
  const [K_msg, setalert] = useState('');
  const [keyflag, setflag] = useState(0);
  const [inputHeight, setInputHeight] = useState(40);
  const [text, setText] = useState('');
  const [keyinput, setKeyinput] = useState('');
  const [key, setKey] = useState('');
  let Generatedkeys = null;
  const handleKeyChange = () => {
    if (keyinput.length < 8) {
      setalert('you need 8 characters for your key ');
      setflag(0);
    }
    if (text.length == 0) {
      setalert('their is no text to encrypt');
    }
    if (keyinput.length == 8) {
      setalert('');
      setKey(keyinput);
      Generatedkeys = keyGenerator(keyinput);
      chiperGenerator(text, Generatedkeys);
    }
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

      <TextInput
        placeholder="Enter Text"
        value={text}
        onChangeText={setText}
        onContentSizeChange={handleContentSizeChange}
        style={{height: inputHeight, borderColor: 'gray', borderWidth: 1}}
        multiline={true}
      />

      <TextInput
        placeholder="Enter secret key"
        value={keyinput}
        onChangeText={keyinput => setKeyinput(keyinput)}
        maxLength={8}
      />

      <Text>{K_msg}</Text>
      <Button title="Generate Chiper" onPress={handleKeyChange} />
    </View>
  );
};

export default DesApp;
