PC_1_TABLE = [
  53, 18, 45, 56, 31, 24, 14, 39, 28, 5, 21, 3, 38, 48, 40, 0, 52, 43, 35, 8,
  55, 19, 20, 2, 58, 29, 16, 4, 60, 47, 26, 7, 15, 30, 32, 10, 50, 61, 34, 37,
  11, 41, 63, 6, 51, 22, 27, 12, 25, 1, 17, 57, 42, 36, 46, 13,
];

PC_2_TABLE = [
  13, 16, 10, 23, 0, 4, 2, 27, 14, 5, 20, 9, 22, 18, 11, 3, 25, 7, 15, 6, 26,
  19, 12, 1, 40, 51, 30, 36, 46, 54, 29, 39, 50, 44, 32, 47, 43, 48, 38, 55, 33,
  52, 45, 41, 49, 35, 28, 31,
];

left_rotations = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

function keyGenerator(text) {
  // console.log('the key' + text);
  textToHEX(text);

  function textToHEX(S_key) {
    let S_key_HEX = '';

    for (let i = 0; i < S_key.length; i++) {
      let charCode = S_key.charCodeAt(i);
      let HEXChar = charCode.toString(16);
      S_key_HEX += HEXChar;
    }
    //  console.log('original key in hexadecimal ' + S_key_HEX);
    HEXToBinary(S_key_HEX);
  }

  function HEXToBinary(S_key_HEX) {
    let HEX_digit = S_key_HEX.split('');
    S_key_binary = '';
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

    //   console.log('original key in binary ' + S_key_binary);
    Binarykeyto56bitkey(S_key_binary);
  }

  function Binarykeyto56bitkey(S_key_binary) {
    let S_key_56bit = '';
    for (let i = 0; i < PC_1_TABLE.length; i++) {
      S_key_56bit += S_key_binary[PC_1_TABLE[i]];
    }

    //   console.log('56 bit key ' + S_key_56bit);
    SPlitandshit(S_key_56bit);
  }

  function SPlitandshit(S_key_56bit) {
    S_key_28bit_left = S_key_56bit.slice(0, 28);
    S_key_28bit_right = S_key_56bit.slice(28, 56);
    S_key_shifted = [];

    //   console.log('28 bit left key: ' + S_key_28bit_left);
    //  console.log('28 bit right key: ' + S_key_28bit_right);

    leftRotateString(S_key_28bit_left, S_key_28bit_right);
  }

  function leftRotateString(S_key_28bit_left, S_key_28bit_right) {
    const shiftedkeys = {};

    let i = 1;
    for (let r of left_rotations) {
      S_key_28bit_left =
        S_key_28bit_left.slice(r) + S_key_28bit_left.slice(0, r);
      S_key_28bit_right =
        S_key_28bit_right.slice(r) + S_key_28bit_right.slice(0, r);

      shiftedkeys[`index${i}`] = {
        left: S_key_28bit_left,
        right: S_key_28bit_right,
      };
      i++;
    }

    for (let i = 1; i <= 16; i++) {
      //   console.log(shiftedkeys[`index${i}`]);
    }

    subkeygenerator(shiftedkeys);
  }

  function subkeygenerator(shiftedkeys) {
    shiftedkeysconcat = {};
    finalkeys = {};
    //intiallize final key boject as empty strings

    for (let i = 1; i <= 16; i++) {
      finalkeys[`index${i}`] = '';
    }

    for (let i = 1; i <= 16; i++) {
      shiftedkeysconcat[`index${i}`] = shiftedkeys[`index${i}`]['left'].concat(
        shiftedkeys[`index${i}`]['right'],
      );
    }

    for (let j = 1; j <= 16; j++) {
      let keyToBeProcessed = shiftedkeysconcat[`index${j}`];

      for (let i = 0; i < PC_2_TABLE.length; i++) {
        finalkeys[`index${j}`] += keyToBeProcessed[PC_2_TABLE[i]];
      }
    }
  }

  return finalkeys;
}

export {keyGenerator};
