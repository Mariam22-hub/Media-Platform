import { useState } from 'react'
import MediaComponent from './components/mediaComponent'
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import './App.css'
import UploadComponent from './components/uploadComponent'
import ButtonComponent from './components/buttonComponent';

function App() {
  const [mode, setMode] = useState(false)

  return (
    <>
    <BrowserRouter>
      <AppStyled className="App">
        
        <div className='upload'>
          <ButtonComponent
            name={"Upload"}
            onClick = {()=>setMode(true)}
            bg={"#1e90ff"}
          />
        </div>
        
        {mode && <UploadComponent/>}

        <h1>Media Platform</h1>
        
        <Routes>
          <Route path='/' element={<MediaComponent />} />
        </Routes>
        
        {mode && <div className='overlay' onClick = {()=>setMode(false)}></div>}
      
      </AppStyled>
    </BrowserRouter>
    </>
  )
}

const AppStyled = styled.div`
  padding: 3rem 18rem;
  h1{
    color: #fff;
    background: linear-gradient(to right, #00b894 40%,#705DF2 );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .upload{
    display: flex;
    justify-content: flex-start;
  }
`;


export default App
