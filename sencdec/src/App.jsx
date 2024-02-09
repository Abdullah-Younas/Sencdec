import { useState } from 'react';

function App() {
  const [tte, settte] = useState("");
  const [ttd, setttd] = useState("");
  const [enctext, setenctext] = useState("");
  const [dectext, setdectext] = useState("");
  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  const [shuffledKeys, setShuffledKeys] = useState([...chars]); // Initialize with the original keys
  const handleSubmitenc = (e) => {
    e.preventDefault();

    // Shuffle keys array
    shuffleArray(shuffledKeys);

    // Encryption
    let encryptedText = "";
    for (let i = 0; i < tte.length; i++) {
      const char = tte[i];
      const charIndex = chars.indexOf(char);

      if (charIndex !== -1) {
        encryptedText += shuffledKeys[charIndex];
      } else {
        // Handle spaces or characters not in chars array
        encryptedText += char;
      }
    }

    console.log("Original Text: ", tte);
    console.log("Cipher Text: ", encryptedText);

    setenctext(encryptedText);
    settte("");
    setShuffledKeys([...shuffledKeys]); // Store the shuffled keys for decryption
  };

  const handleSubmitdec = (e) => {
    e.preventDefault();

    // Decryption
    let decryptedText = "";
    for (let i = 0; i < ttd.length; i++) {
      const char = ttd[i];
      const keyIndex = shuffledKeys.indexOf(char);

      if (keyIndex !== -1) {
        decryptedText += chars[keyIndex];
      } else {
        // Handle spaces or characters not in keys array
        decryptedText += char;
      }
    }

    console.log("Cipher Text: ", ttd);
    console.log("Decrypted Text: ", decryptedText);

    setdectext(decryptedText);
    setttd("");
  };

  return (
    <>
      <h1>SENCDEC</h1><br />
      <div className='encryptionbox'>
        <h2>Encryption:</h2>
        <form onSubmit={handleSubmitenc} className='texttoencform'>
          <div className='form-row'>
            <label htmlFor="tte">Text to Encrypt:</label><br />
            <input value={tte} onChange={(e) => settte(e.target.value)} type="text" id="tte" />
          </div><br />
          <button className='subbtn'>Submit</button>
        </form>
        <h3>Encrypted Text: </h3>
        <h4>{enctext}</h4><br />
      </div>
      <div className='decryptionbox'>
        <h2>Decryption:</h2>
        <form onSubmit={handleSubmitdec} className='texttodecform'>
          <div className='form-row'>
            <label htmlFor='ttd'>Text to Decrypt:</label><br />
            <input value={ttd} onChange={(e) => setttd(e.target.value)} type='text' id='ttd'/>
          </div><br />
          <button className='subbtn'>Submit</button>
        </form>
        <h3>Decrypted Text: </h3>
        <h4>{dectext}</h4>
      </div>
    </>
  );
}

export default App;