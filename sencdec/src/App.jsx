import { useEffect, useState } from 'react';
import {db} from './config/firebase'
import {getDocs,collection, addDoc} from 'firebase/firestore'

function App() {
  const [tte, settte] = useState("");
  const [ttd, setttd] = useState("");
  const [enctext, setenctext] = useState("");
  const [dectext, setdectext] = useState("");
  const [UIKeys, setUIKeys] = useState([]);
  const UIKeysCollectionRef = collection(db,"UIKeys");
  const [shuffledUkey, setSuffledUkey] = useState("");
  const [ranIkeydb, setranIkey] = useState("");
  const [tempranIkeysliced,settempranIkeysliced] = useState("");
  const [fdata,setfdata] = useState([]);
  
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  
  useEffect(() => {
      const getUIKeys = async () => {
        //Read data
        //Set data
        try{
        const data = await getDocs(UIKeysCollectionRef);
        const filtereddata = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setfdata(filtereddata);
        } catch(err){
          console.error(err);
        }
      }

      getUIKeys();
  },[]);


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
    const ranIKey = Math.floor(100000 + Math.random() * 900000);
  
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
  
    encryptedText += ranIKey;
    setranIkey(ranIKey);
  
    console.log("Original Text: ", tte);
    console.log("Cipher Text: ", encryptedText);
  
    setenctext(encryptedText);
    setSuffledUkey(shuffledKeys);
    settte("");
    setShuffledKeys([...shuffledKeys]); // Store the shuffled keys for decryption
  
    const onSubmitEncKeys = async () => {
      try {
        await addDoc(UIKeysCollectionRef, { Ikeys: ranIKey, Ukeys: shuffledKeys }); // Use ranIKey instead of ranIkeydb
      } catch (err) {
        console.error(err);
      }
    };
  
    onSubmitEncKeys();
  };
  
  const handleSubmitdec = async (e) => {
    e.preventDefault();
    let TempIkey = Number(ttd.slice(-6)); // Convert TempIkey to a number
    let TempEncText = ttd.slice(0,-6);
    console.log("Entering the magical world of keys... 🗝️✨");
    setttd("");
    let DecryptedText = "";

    try {
      const data = await getDocs(UIKeysCollectionRef);
      const filtereddata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setfdata(filtereddata);
  
      // Assuming TempAllIkey is defined outside this block
      let TempAllIkey = filtereddata.map(item => item.Ikeys);
  
      console.log("Behold, the keys of power: ", TempAllIkey);
  
      const matchingItem = filtereddata.find(item => item.Ikeys === TempIkey);
  
      if (matchingItem && matchingItem.Ukeys !== undefined) {
        const UkeyValue = matchingItem.Ukeys;
        console.log("Hooray! The matching Ukey value is: ", UkeyValue);
        for(let i = 0; i < TempEncText.length; i++){
          const char = TempEncText[i];
          console.log(char);
          const keyIndex = shuffledKeys.indexOf(char);
          console.log(keyIndex);
          if(keyIndex !== -1){
            DecryptedText += chars[keyIndex];
            console.log(DecryptedText);
          }else{
            DecryptedText += char;
          }
        }
        console.log("Decrypted Text is So Magical: ", DecryptedText);
      } else {
        console.log("Alas! The Ukey value remains hidden, as the magic persists. 🔮🕰️");
      }
    } catch (err) {
      console.error("Oh no! An error occurred in the magical realm. 🧙‍♂️💫", err);
    }
    TempEncText = "";
    DecryptedText = "";
    console.log(DecryptedText);
  };
  
  
  
  
  
  
  
  
  
  
  
  
  


  return (
    <>
      <h1>SENCDEC</h1><br />
      <div className='encryptionbox'>
        <h2>Encryption:</h2>
        <form onSubmit={handleSubmitenc} className='texttoencform'>
          <div className='form-row'>
            <label htmlFor="tte">Text to Encrypt:</label><br />
            <input value={tte} onChange={(e) => { settte(e.target.value);}} type="text" id="tte" />
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
