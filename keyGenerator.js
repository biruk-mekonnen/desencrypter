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

function keyGenerator(text) {
  textToHEX(text);

  function textToHEX(S_key) {
    let S_key_HEX = '';

    for (let i = 0; i < S_key.length; i++) {
      let charCode = S_key.charCodeAt(i);
      let HEXChar = charCode.toString(16);
      S_key_HEX += HEXChar;
    }

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

    Binarykeyto56bitkey(S_key_binary);
  }

  function Binarykeyto56bitkey(S_key_binary) {
    let S_key_56bit = '';
    for (let i = 0; i < PC_1_TABLE.length; i++) {
      S_key_56bit += S_key_binary[PC_1_TABLE[i] - 1];
    }

    SPlitandshit(S_key_56bit);
  }

  function SPlitandshit(S_key_56bit) {
    S_key_28bit_left = S_key_56bit.slice(0, 28);
    S_key_28bit_right = S_key_56bit.slice(28, 56);
    S_key_shifted = [];

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

    for (let i = 1; i <= 16; i++) {}

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
        finalkeys[`index${j}`] += keyToBeProcessed[PC_2_TABLE[i] - 1];
      }
    }
  }
  console.log(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  );

  return finalkeys;
}

export {keyGenerator};
