import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from './config/firebase'
import {getDocs,collection, addDoc} from 'firebase/firestore'

function Home() {
    
    const navigate = useNavigate();
    const [tte, settte] = useState("");
      const [ttd, setttd] = useState("");
      const [enctext, setenctext] = useState("");
      const [dectext, setdectext] = useState("");
      //const [UIKeys, setUIKeys] = useState([]);
      const UIKeysCollectionRef = collection(db,"UIKeys");
      const [shuffledUkey, setSuffledUkey] = useState("");
      const [ranIkeydb, setranIkey] = useState("");
      //const [tempranIkeysliced,settempranIkeysliced] = useState("");
      const [fdata,setfdata] = useState([]);
      const [ctime,setctime] = useState(0);
      
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
      
        //console.log("Original Text: ", tte);
        //console.log("Cipher Text: ", encryptedText);
      
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
        
        let TempIkey = Number(ttd.slice(-6)); // Extract the last 6 characters as the key
        let TempEncText = ttd.slice(0, -6);   // The rest is the encrypted text
      
        setttd("");  // Clear the input after submission
      
        let DecryptedText = "";
      
        try {
          const data = await getDocs(UIKeysCollectionRef);
          const filtereddata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setfdata(filtereddata);
      
          const matchingItem = filtereddata.find(item => item.Ikeys === TempIkey);
      
          if (matchingItem && matchingItem.Ukeys !== undefined) {
            const UkeyValue = matchingItem.Ukeys;
            
            for(let i = 0; i < TempEncText.length; i++) {
              const char = TempEncText[i];
              const keyIndex = UkeyValue.indexOf(char);
              
              if(keyIndex !== -1) {
                DecryptedText += chars[keyIndex];
              } else {
                DecryptedText += char;
              }
            }
          } else {
            console.log("Matching Ukey not found.");
          }
        } catch (err) {
          console.error(err);
        }
      
        setdectext(DecryptedText);  // Update the state with the decrypted text
      };
      
      const TxtED = async () => {
        try{
            navigate('/success-TextFiles');
        }catch(err){
            console.error("Error: ", err);
        }
        };
        const ImgED = async () => {
            try{
                navigate('/success-Images');
            }catch(err){
                console.error("Error: ", err);
            }
        };
        const AudED = async () => {
            try{
                navigate('/success-Audios');
            }catch(err){
                console.error("Error: ", err);
            }
        };
        const VidED = async () => {
            try{
                navigate('/success-Videos');
            }catch(err){
                console.error("Error: ", err);
            }
        };
        const DocED = async () => {
            try{
                navigate('/success-Documents');
            }catch(err){
                console.error("Error: ", err);
            }
        };

      return (
        <>
          <h1>SENCDEC</h1>
          <div className='AllBox'>        
            <div className='overallbox'>
            <div className='encryptionbox'>
              <h2 className='encryptiontitle'>Encryption:</h2>
              <form onSubmit={handleSubmitenc} className='texttoencform'>
                <div className='form-row'>
                  <textarea 
                    value={tte} 
                    onChange={(e) => { settte(e.target.value);}} 
                    id="tte" 
                    rows="5"
                    className="text-area"
                    maxLength="50"
                  />
                </div>
                <button className='subbtn'>Submit</button>
              </form>
              <h2 className='encryptedtitle'>Encrypted Text: </h2>
              <h4 className='encryptedtext'>{enctext}</h4>
            </div>
            <div className='decryptionbox'>
              <h2 className='decryptiontitle'>Decryption:</h2>
              <form onSubmit={handleSubmitdec} className='texttodecform'>
                <div className='form-row'>
                  <textarea 
                    value={ttd} 
                    onChange={(e) => setttd(e.target.value)} 
                    id='ttd'
                    rows="5"
                    className="text-area"
                    maxLength="100"
                  />
                </div>
                <button className='subbtn'>Submit</button>
              </form>
              <h2 className='decryptedtitle'>Decrypted Text: </h2>
              <h4 className='decryptedtext'>{dectext}</h4>
            </div>
            </div>
            <div className="otherFormatbox">
                <h2>Want to Encrypt Image or Other Stuff?</h2>
                <div className="FormatScrollBox">
                    <button onClick={AudED}>Audio</button>
                    <button onClick={TxtED}>Text</button>
                    <button onClick={VidED}>Video</button>
                    <button onClick={ImgED}>Image</button>
                    <button onClick={DocED}>Document</button>
                </div>
            </div>
          </div>
        </>
    );
}

export default Home;