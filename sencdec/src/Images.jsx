import React, { useState } from 'react';
import "./VideoCiphering.css";

function Images() {
  const [base64Content, setBase64Content] = useState('');
  const [encryptedContent, setEncryptedContent] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const [shuffledKeys, setShuffledKeys] = useState([...chars]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result.split(',')[1];
        setBase64Content(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentEncryption = () => {
    shuffleArray(shuffledKeys);
    const encryptionKey = shuffledKeys.join('');
    let encryptedText = '';
    for (let i = 0; i < base64Content.length; i++) {
      const char = base64Content[i];
      const charIndex = chars.indexOf(char);
      encryptedText += charIndex !== -1 ? shuffledKeys[charIndex] : char;
    }
    encryptedText += encryptionKey;
    setEncryptedContent(encryptedText);
    downloadTextFile(encryptedText, 'encrypted-image.txt');
  };

  const handleTextUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEncryptedContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleContentDecryption = () => {
    const encryptedData = encryptedContent.slice(0, -64);
    const decryptionKey = encryptedContent.slice(-64);
    const decryptionKeys = decryptionKey.split('');
    let decryptedText = '';
    for (let i = 0; i < encryptedData.length; i++) {
      const char = encryptedData[i];
      const charIndex = decryptionKeys.indexOf(char);
      decryptedText += charIndex !== -1 ? chars[charIndex] : char;
    }
    setBase64Content(decryptedText);
    downloadBase64Image(decryptedText, 'decrypted-image.png');
  };

  const downloadTextFile = (content, fileName) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadBase64Image = (base64Content, fileName) => {
    const blob = new Blob(
      [Uint8Array.from(atob(base64Content), (c) => c.charCodeAt(0))],
      { type: 'image/png' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className='BodyCip'>

      <div className="OverlayEncDec">
        <div className="EncryptionMainBox">
          <div className="EncMainTitle">
            <h2>SENCDECX</h2>
            <h3>Image Ciphering</h3>
          </div>

          <div className="EncDecBoxes">
            {/* Encryption Section */}
            <div className="EncBox">
              <div className="EncBoxTitle">
                <h2>ENCRYPTION</h2>
              </div>
              <div className="EncBoxFoot">
                <label htmlFor="imageUpload">Upload Image</label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {base64Content && (
                  <button onClick={handleContentEncryption}>
                    Download Encrypted Text File
                  </button>
                )}
              </div>
            </div>

            {/* Decryption Section */}
            <div className="DecBox">
              <div className="EncBoxTitle">
                <h2>DECRYPTION</h2>
              </div>
              <div className="EncBoxFoot">
                <label htmlFor="textUpload">Upload Cipher</label>
                <input
                  id="textUpload"
                  type="file"
                  accept=".txt"
                  onChange={handleTextUpload}
                />
                {encryptedContent && (
                  <button onClick={handleContentDecryption}>
                    Download Decrypted Image
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

export default Images;
