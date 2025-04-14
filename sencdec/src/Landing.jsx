import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Landing() {

    const navigate = useNavigate();
    const Home = async () => {
        try{
            navigate('/success-home');
        }catch(err){
            console.error("Error: ", err);
        }
    };
    return (
            <div className="min-h-screen bg-gray-950 text-white font-sans">
              {/* Header */}
              <header className="text-center py-12 px-4 bg-gradient-to-r from-blue-900 via-gray-900 to-black">
                <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg">Sencdec</h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                  A multi-format encryption and decryption software powered by <strong>Firebase</strong> and secure <strong>client-side cryptography</strong>.
                </p>
                <p className="mt-2 text-sm text-gray-400">Built entirely with React.js and Firebase</p>
              </header>
        
              {/* About Section */}
              <section className="max-w-5xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">🔍 Project Overview</h2>
                <p className="text-gray-300 text-md mb-4">
                  <strong>Sencdec</strong> is an all-in-one encryption/decryption tool that allows users to securely protect and unlock data across various formats—ranging from simple text to complex media files.
                </p>
                <ul className="list-disc list-inside text-gray-400 pl-2">
                  <li>Real-time encryption & decryption using Firebase backend</li>
                  <li>Client-side encryption with hidden, randomized keys for each session</li>
                  <li>Cross-format compatibility: Text, PDF, Word Docs, Images, Audio, and Video</li>
                </ul>
              </section>
        
              {/* Technology Stack */}
              <section className="bg-gray-900 py-12 px-6">
                <h2 className="text-2xl font-semibold text-center text-blue-400 mb-8">🧠 Built With</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-white">⚛️ React.js</h3>
                    <p>
                      The entire frontend is built in React, offering a responsive and modular experience. Users can interact with the UI in real-time while working with encrypted data.
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-white">🔥 Firebase</h3>
                    <p>
                      Firebase handles real-time database integration, user authentication (optional), and dynamic encryption sessions. Data is encrypted before it's sent—so Firebase never sees the raw content.
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-white">🔑 Custom Encryption Logic</h3>
                    <p>
                      Sencdec generates random encryption keys for each operation, which are never exposed to the user or database. Decryption only works with the correct, session-specific key.
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold mb-2 text-white">📦 File Handling & Type Detection</h3>
                    <p>
                      File uploads are automatically categorized and processed using proper enc/dec logic for their type—supporting text, DOCX, PDFs, media, and more.
                    </p>
                  </div>
                </div>
              </section>
        
              {/* Features Section */}
              <section className="max-w-6xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-blue-300 mb-6">✨ Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-200">
                  {[
                    {
                      title: "Live Text Encryption",
                      desc: "Secure, Firebase-based text encryption system directly in the browser."
                    },
                    {
                      title: "Text File (.txt) Enc/Dec",
                      desc: "Upload any .txt file to encrypt or decrypt it securely on the client."
                    },
                    {
                      title: "Document Support (.doc/.docx/.pdf)",
                      desc: "Document handling with safe client-side processing and format recognition."
                    },
                    {
                      title: "Image Encryption",
                      desc: "Encrypt image files and decode them only through Sencdec’s viewer."
                    },
                    {
                      title: "Audio & Video Files",
                      desc: "Media file encryption to keep sound and visuals secure and tamper-proof."
                    },
                    {
                      title: "Hidden Encryption Keys",
                      desc: "Encryption keys are dynamically generated and hidden—adding an extra layer of security."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-6 shadow-md hover:scale-[1.02] transition-transform">
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
        
              {/* CTA */}
              <section className="text-center bg-blue-950 py-16 px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">🔐 Experience Sencdec Live</h2>
                <p className="text-gray-300 max-w-xl mx-auto mb-6">
                  Ready to protect your text, media, and documents with powerful encryption? Try it now.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all duration-200" onClick={Home}>
                  Launch the App
                </button>
              </section>
        
              {/* Footer */}
              <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-800 mt-10">
                © {new Date().getFullYear()} Sencdec • Built with React & Firebase by Abdullah Younas <a href="https://github.com/Abdullah-Younas">Github</a>
              </footer>
            </div>
          );
}

export default Landing;