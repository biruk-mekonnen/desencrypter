import {Buffer} from '@craftzdog/react-native-buffer';

IP = [
  17, 54, 11, 37, 51, 58, 2, 60, 33, 41, 47, 35, 45, 52, 24, 5, 38, 21, 43, 42,
  3, 32, 18, 16, 63, 53, 0, 14, 34, 62, 23, 29, 9, 10, 50, 28, 36, 19, 61, 31,
  15, 40, 59, 8, 30, 49, 46, 48, 6, 1, 57, 4, 44, 12, 56, 7, 55, 22, 13, 27, 25,
  39, 26, 20,
];

E_bit = [
  31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9, 10, 11, 12, 11, 12, 13, 14, 15,
  16, 15, 16, 17, 18, 19, 20, 19, 20, 21, 22, 23, 24, 23, 24, 25, 26, 27, 28,
  27, 28, 29, 30, 31, 1,
];

const S1 = [
  [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
  [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
  [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
  [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
];

const S2 = [
  [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
  [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
  [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
  [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
];

S3 = [
  [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
  [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
  [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
  [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
];

S4 = [
  [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
  [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
  [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
  [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
];

S5 = [
  [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
  [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
  [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
  [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
];

S6 = function chiperGenerator(text, key) {
  let chunkinbinary = '';
  let Chunktext_IP = '';

  while (text.length % 8 !== 0) {
    text += 'X';
  }

  const buffertext = Buffer.from(text, 'utf8');

  const chunkSize = 8;
  for (let i = 0; i < buffertext.length; i += chunkSize) {
    const chunk = buffertext.slice(i, i + chunkSize);

    let chunkString = chunk.toString('utf8');

    for (let i = 0; i < chunkString.length; i++) {
      let charCode = chunkString.charCodeAt(i).toString(2);

      let paddedChar = '0'.repeat(8 - charCode.length) + charCode;
      chunkinbinary += paddedChar;
    }
    intialpermutation(chunkinbinary);
    function intialpermutation(chunkinbinary) {
      for (let i = 0; i < IP.length; i++) {
        Chunktext_IP += chunkinbinary[IP[i]];
      }
      SPlitChunk(Chunktext_IP);
    }

    function SPlitChunk(Chunktext_IP) {
      Chunktext_IP_left = Chunktext_IP.slice(0, 32);
      Chunktext_IP_right = Chunktext_IP.slice(32, 64);
      //console.log('32 bit left key: ' + Chunktext_IP_left);
      //console.log('32 bit right key: ' + Chunktext_IP_right);

      Rounds(Chunktext_IP_left, Chunktext_IP_right);
    }

    function Rounds(Chunktext_IP_left, Chunktext_IP_right) {
      let keynumber = 1;
      Ln = Chunktext_IP_left;
      Rn = Chunktext_IP_right;
      Rn_expanded = '';
      Rn_Xored = '';

      for (i = 1; i <= 1; i++) {
        Ln = Rn;
        for (let i = 0; i < E_bit.length; i++) {
          Rn_expanded += Rn[E_bit[i]];
        }
        //console.log(Rn_expanded);
        //console.log(key[`index${j}`]);

        for (let i = 0; i < 48; i++) {
          Rn_Xored +=
            (Rn_expanded[i] === '1') ^ (key[`index${keynumber}`][i] === '1')
              ? '1'
              : '0';
        }
        // console.log(Rn_Xored);
        keynumber++;
      }
    }

    // console.log(Chunktext_IP);
  }

  // Process the chunk of 8 characters here
};

export {chiperGenerator};
