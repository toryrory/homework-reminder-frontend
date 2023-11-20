import './App.css';
import UserAccount from './components/UserAccount/UserAccount';
import StartPage from "./components/StartPage/StartPage";
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/account/:userId' element={<UserAccount />} />
      </Routes>
    </>
  );
}

export default App;
