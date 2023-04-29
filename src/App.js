// ContextProvider
import AppContextProvider from './context/AppContext';

// FirebaseConfig 
import './firebase/firebase';

// Componentes
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import FirstEntry from './components/FirstEntry';
import Article from './components/Article';
import SingIn from './components/home/menu/sign-section/SingIn';
import Settings from './components/home/menu/settings-section/Settings';

// React Router
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


function App() {

  // const navigate = useNavigate();
  // const naveggar = () => {
  //   navigate('/home')
  // }

  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/home' Component={Home}></Route>
          <Route path='/welcome' Component={FirstEntry}></Route>
          <Route path='/article' Component={Article}></Route>
          <Route path='/registro' Component={SingIn}></Route>
          <Route path='/ajustes' Component={Settings}></Route>
          <Route path='/*' Component={ErrorPage}></Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
