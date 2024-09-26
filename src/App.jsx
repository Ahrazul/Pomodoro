import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';

function App () {
  return (
    <div className='app-container'>
      <BrowserRouter>
      <Routes>
        <Route index element={<Main/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
