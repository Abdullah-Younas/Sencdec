import { useState } from 'react';
import "./VideoCiphering.css";

function TextFiles() {
  // Separate states for Encryption and Decryption
  const [encFileContent, setEncFileContent] = useState('');
  const [decFileContent, setDecFileContent] = useState('');
  const [mFile, setmFile] = useState('');
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  const [shuffledKeys, setShuffledKeys] = useState([...chars]);

  // Shuffle the array for encryption
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Handle file upload for Encryption
  const handleEncFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setEncFileContent(content);
      };
      reader.onerror = (err) => {
        console.error('Error reading file: ', err);
      };
      reader.readAsText(file);
    }
  };

  // Handle file upload for Decryption
  const handleDecFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setDecFileContent(content);
      };
      reader.onerror = (err) => {
        console.error('Error reading file: ', err);
      };
      reader.readAsText(file);
    }
  };

  // Encryption logic
  const handleContentEncryption = () => {
    shuffleArray(shuffledKeys);
    let encryptedText = '';
    for (let i = 0; i < encFileContent.length; i++) {
      const char = encFileContent[i];
      const charIndex = chars.indexOf(char);
      encryptedText += charIndex !== -1 ? shuffledKeys[charIndex] : char;
    }
    encryptedText += shuffledKeys.join('');
    setmFile(encryptedText);
    downloadFile(encryptedText, 'encrypted-file');
  };

  // Decryption logic
  const handleContentDecryption = () => {
    const encryptedContent = decFileContent.slice(0, -63);
    const encryptionKey = decFileContent.slice(-63);
    const decryptionKeys = encryptionKey.split('');
    let decryptedText = '';
    for (let i = 0; i < encryptedContent.length; i++) {
      const char = encryptedContent[i];
      const charIndex = decryptionKeys.indexOf(char);
      decryptedText += charIndex !== -1 ? chars[charIndex] : char;
    }
    setmFile(decryptedText);
    downloadFile(decryptedText, 'decrypted-file.txt');
  };

  // File download logic
  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className='BodyCip'>
        <div className="OverlayEncDec">
          <div className="EncryptionMainBox">
            <div className="EncMainTitle">
              <h2>SENCDECX</h2>
              <h3>Text Ciphering</h3>
            </div>
            <div className="EncDecBoxes">
              <div className='EncBox'>   
              <div className='EncBoxTitle'>
                <h2>ENCRYPTION</h2>
              </div>
              <div className='EncBoxFoot'>
                <label htmlFor="encFileUpload">Upload Text</label>
                <input 
                  id="encFileUpload" 
                  type="file" 
                  onChange={handleEncFileUpload} 
                />
                {encFileContent && (
                  <button onClick={handleContentEncryption}>
                    Download Encrypted Text File
                  </button>
                )}
              </div>       
            </div>

            <div className='DecBox'>
              <div className='EncBoxTitle'> {/* Same class as EncBoxTitle for consistent styling */}
                <h2>DECRYPTION</h2>
              </div>
              <div className='EncBoxFoot'> {/* Same class as EncBoxFoot for consistent styling */}
                <label htmlFor="decFileUpload">Upload Cipher</label>
                <input 
                  id="decFileUpload" 
                  type="file" 
                  onChange={handleDecFileUpload} 
                />
                {decFileContent && (
                  <button onClick={handleContentDecryption}>
                    Download Decrypted Text
                  </button>
                )}
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextFiles;
