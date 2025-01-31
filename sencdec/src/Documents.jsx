import React, { useState } from 'react';
import "./VideoCiphering.css";

function Documents() {
  const [hexContent, setHexContent] = useState(''); // Hexadecimal content
  const [encryptedContent, setEncryptedContent] = useState(''); // Encrypted content
  const chars = '0123456789ABCDEF';
  const [shuffledKeys, setShuffledKeys] = useState([...chars]);

  // Shuffle the array for encryption
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Handle file upload and convert to hexadecimal
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result; // Get file content as ArrayBuffer
        const byteArray = new Uint8Array(arrayBuffer); // Convert to byte array
        const hexString = Array.from(byteArray)
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join(''); // Convert to hex
        setHexContent(hexString); // Update hex content
        console.log('Hexadecimal Data:', hexString);
      };
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

  // Encrypt hexadecimal content
  const handleContentEncryption = () => {
    shuffleArray(shuffledKeys); // Shuffle the keys for encryption
    const encryptionKey = shuffledKeys.join(''); // Save shuffled keys
    let encryptedText = '';

    for (let i = 0; i < hexContent.length; i++) {
      const char = hexContent[i];
      const charIndex = chars.indexOf(char);
      if (charIndex !== -1) {
        encryptedText += shuffledKeys[charIndex];
      } else {
        encryptedText += char;
      }
    }
    encryptedText += encryptionKey; // Append encryption key
    setEncryptedContent(encryptedText);
    downloadTextFile(encryptedText, 'encrypted-document.txt');
  };

  // Download content as a text file
  const downloadTextFile = (content, fileName) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle text upload for decryption
  const handleTextUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = e.target.result; // Read the text content
        setEncryptedContent(textContent);
      };
      reader.onerror = (err) => {
        console.error('Error reading text file:', err);
      };
      reader.readAsText(file); // Read the file as plain text
    }
  };

  // Decrypt content
  const handleContentDecryption = () => {
    const encryptedData = encryptedContent.slice(0, -16); // Extract content
    const decryptionKey = encryptedContent.slice(-16); // Extract the last 16 characters as the key
    const decryptionKeys = decryptionKey.split(''); // Convert to array
    let decryptedText = '';

    for (let i = 0; i < encryptedData.length; i++) {
      const char = encryptedData[i];
      const charIndex = decryptionKeys.indexOf(char);
      if (charIndex !== -1) {
        decryptedText += chars[charIndex];
      } else {
        decryptedText += char;
      }
    }

    setHexContent(decryptedText); // Restore hexadecimal content
    downloadFileFromHex(decryptedText, 'decrypted-document.docx'); // Download as DOCX file
  };

  // Convert hex content back to original file and download
  const downloadFileFromHex = (hexContent, fileName) => {
    const byteArray = new Uint8Array(
      hexContent.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    ); // Convert hex to byte array
    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }); // Set MIME type for DOCX
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='BodyCip'>
      <div className="OverlayEncDec">
        <div className="EncryptionMainBox">
          <div className="EncMainTitle">
            <h2>SENCDECX</h2>
            <h3>Document Ciphering</h3>
          </div>

          <div className="EncDecBoxes">
            {/* Encryption Section */}
            <div className="EncBox">
              <div className="EncBoxTitle">
                <h2>ENCRYPTION</h2>
              </div>
              <div className="EncBoxFoot">
                <label htmlFor="imageUpload">Upload Document</label>
                <input
                  id="imageUpload"
                  type="file"
                  accept=".docx, .pdf"
                  onChange={handleFileUpload}
                />
                {hexContent && (
                  <button onClick={handleContentEncryption}>
                    Download Encrypted Document File
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
                    Download Decrypted Document
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Documents;
