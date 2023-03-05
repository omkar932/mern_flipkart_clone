import './App.css';
import  {BrowserRouter, Routes, Route,} from 'react-router-dom'
import { Home } from './components/dashboard/container/Home/Home';
import { Login } from './components/dashboard/container/Login/Login';
import { SignUp } from './components/dashboard/container/Signup/SignUp';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
