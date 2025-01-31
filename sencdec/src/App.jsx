import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './Home.jsx';
import TextFiles from './TextFiles.jsx';
import Images from './Images.jsx';
import Videos from './Videos.jsx';
import Audios from './Audios.jsx';
import Documents from './Documents.jsx';


function App() {
  
  const [isBelowMinWidth, setIsBelowMinWidth] = useState(false);

  useEffect(() => {
    const enforceMinWidth = () => {
      const minWidth = 1000; // Set your minimum width
      setIsBelowMinWidth(window.innerWidth < minWidth);
    };

    // Add the resize event listener
    window.addEventListener('resize', enforceMinWidth);

    // Call it once to set the initial state
    enforceMinWidth();

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', enforceMinWidth);
    };
  }, []);

  return (
    <Router>
      {isBelowMinWidth ? (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <h1>Screen width is too small</h1>
          <p>Please resize your browser window to use this app.</p>
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/success-TextFiles' element={<TextFiles />} />
          <Route path='/success-Images' element={<Images />} />
          <Route path='/success-Videos' element={<Videos />} />
          <Route path='/success-Audios' element={<Audios />} />
          <Route path='/success-Documents' element={<Documents />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
 