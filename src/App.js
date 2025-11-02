import './App.css';
import { useState } from 'react';
import ReactSwitch from 'react-switch';
import { useThemeContext } from './components/ThemeContext';
import Layout from './components/Layout';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  const {contextTheme, setContextTheme} = useThemeContext()
  const [checked, setChecked] = useState(false);
  const navEstilo = {
    top: 0,
    width: '100%',
    zIndex: 1020, 
  }
  const navEs = {
    width: '100%',
    zIndex: 1020, 
  }
  const TAMAÑO_NAV_FIJA = '80px';
  const handleSwitch = (nextChecked) => {       
    setContextTheme((state) => (state === 'Light' ? 'Dark':'Light'))       
    setChecked(nextChecked);
  }
   
  return (
    <div className="App">
      <header className="App-header" id={contextTheme} > 
        <Navbar className="fixed-top" style={navEstilo}>
          <Container fluid> 
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/img/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Block Tarea
            </Navbar.Brand>
              <Nav className="ms-auto">
                <ReactSwitch 
                  onChange={handleSwitch}
                  checked={checked}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={40}
                  className="react-switch"
                  id="material-switch"
                />
              </Nav>
          </Container>
        </Navbar>
        <div style={{ marginTop: TAMAÑO_NAV_FIJA, navEs}}>
          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route index element={ <Home /> } />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </header>
    </div>
  );
}
   
export default App;