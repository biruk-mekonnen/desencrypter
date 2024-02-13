//this code takes in 8 char key and creates 16 subkeys are returns them in a final keys variable
//
//
PC_1_TABLE = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];

PC_2_TABLE = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];

left_rotations = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

//main funciton
function keyGenerator(text) {
  //call function to convert text to hex format
  textToHEX(text);
  //function that converts text to hex
  function textToHEX(S_key) {
    let S_key_HEX = ''; //variable to hold hex key

    for (let i = 0; i < S_key.length; i++) {
      let charCode = S_key.charCodeAt(i); //convert to ascii
      let HEXChar = charCode.toString(16); //convert to hex
      S_key_HEX += HEXChar; //save to variable
    }
    //call function to convert Hex to binary format
    HEXToBinary(S_key_HEX);
  }
  //function that converts Hex to binary
  function HEXToBinary(S_key_HEX) {
    let HEX_digit = S_key_HEX.split(''); //spilt the hex string to process one at at time
    S_key_binary = ''; //variable to save binary key
    //converts to binary
    HEX_digit.forEach(digit => {
      switch (digit) {
        case '0':
          S_key_binary += '0000';
          break;
        case '1':
          S_key_binary += '0001';
          break;
        case '2':
          S_key_binary += '0010';
          break;
        case '3':
          S_key_binary += '0011';
          break;
        case '4':
          S_key_binary += '0100';
          break;
        case '5':
          S_key_binary += '0101';
          break;
        case '6':
          S_key_binary += '0110';
          break;
        case '7':
          S_key_binary += '0111';
          break;
        case '8':
          S_key_binary += '1000';
          break;
        case '9':
          S_key_binary += '1001';
          break;
        case 'a':
          S_key_binary += '1010';
          break;
        case 'b':
          S_key_binary += '1011';
          break;
        case 'c':
          S_key_binary += '1100';
          break;
        case 'd':
          S_key_binary += '1101';
          break;
        case 'e':
          S_key_binary += '1110';
          break;
        case 'f':
          S_key_binary += '1111';
          break;
      }
    });
    //call function to do 64bit to 56bit converstion
    Binarykeyto56bitkey(S_key_binary);
  }
  // funciton that permutates and create a 56bit key
  function Binarykeyto56bitkey(S_key_binary) {
    let S_key_56bit = ''; //variable to save 56 bit key
    for (let i = 0; i < PC_1_TABLE.length; i++) {
      S_key_56bit += S_key_binary[PC_1_TABLE[i] - 1]; //permutate using the PC1 table and save it in variable
    }
    //call function that splits 56 bit to 32 left and right
    SPlitandshit(S_key_56bit);
  }

  function SPlitandshit(S_key_56bit) {
    S_key_28bit_left = S_key_56bit.slice(0, 28); //variable to save left
    S_key_28bit_right = S_key_56bit.slice(28, 56); //variable to save right

    //call funciton to do left rotations
    leftRotateString(S_key_28bit_left, S_key_28bit_right);
  }
  //funciton that does left rotation
  function leftRotateString(S_key_28bit_left, S_key_28bit_right) {
    const shiftedkeys = {}; //variable to hold shifted keys

    let i = 1;
    //perform left shit based on the left rotation variable at the top
    for (let r of left_rotations) {
      S_key_28bit_left =
        S_key_28bit_left.slice(r) + S_key_28bit_left.slice(0, r);
      S_key_28bit_right =
        S_key_28bit_right.slice(r) + S_key_28bit_right.slice(0, r);
      //save rotated keys into shiftedkeys variable with an index name
      shiftedkeys[`index${i}`] = {
        left: S_key_28bit_left,
        right: S_key_28bit_right,
      };
      i++;
    }

    //call sub key generator function
    subkeygenerator(shiftedkeys);
  }
  //function that generates subkeys
  function subkeygenerator(shiftedkeys) {
    shiftedkeysconcat = {}; //varible to hold left and right concated keys
    finalkeys = {}; //variable to hold subkeys
    //intiallize final key boject as empty strings
    for (let i = 1; i <= 16; i++) {
      finalkeys[`index${i}`] = '';
    }
    //forloop to concat shifted keys into one string
    for (let i = 1; i <= 16; i++) {
      shiftedkeysconcat[`index${i}`] = shiftedkeys[`index${i}`]['left'].concat(
        shiftedkeys[`index${i}`]['right'],
      );
    }
    //loop to create subkeys
    for (let j = 1; j <= 16; j++) {
      let keyToBeProcessed = shiftedkeysconcat[`index${j}`]; //select the concated and  shifted keys to be permuted with pc_2 table

      for (let i = 0; i < PC_2_TABLE.length; i++) {
        finalkeys[`index${j}`] += keyToBeProcessed[PC_2_TABLE[i] - 1]; //permute and save onto final keys variable
      }
    }
  }

  return finalkeys; //return final keys
}

export {keyGenerator};
