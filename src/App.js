import './App.css';
import React, {useState} from 'react';
import Alert from './Components/Alert';
import Navbar from './Components/Navbar';
import Textform from './Components/Textform';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  const [mode, changeMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if(mode === 'light'){
      changeMode('dark');
      document.body.style.backgroundColor = '	#282828';
      showAlert("Dark mode Enabled successfully","success");
    }
    else{
      changeMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode Enabled successfully","info");
    }
  }

  return (
    <>
      <Router>
        <Navbar title="Wordic" mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert}/>
        <div className="container my-3">
          
            <Routes>
              <Route exact path="/about" element={<About mode={mode}/>} />
                
              <Route exact path="/" element={<Textform heading = "Enter Text to Analyze" mode={mode} showAlert={showAlert}/>} />
                
            </Routes>
           
        </div>
      </Router> 
    </>
  );
}

export default App;
