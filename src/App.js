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
import SignInLikeAdmin1 from './components/home/menu/sign-section/SignInLikeAdmin1';
import SignInLikeAdmin2 from './components/home/menu/sign-section/SignInLikeAdmin2';
import ViewArticles from './components/add-articles/ViewArticles';
import CreateCategory from './components/add-articles/CreateCategory';
import CreateArticle from './components/add-articles/CreateArticle';

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
          <Route path='/welcome' Component={FirstEntry}></Route>
          <Route path='/home' Component={Home}></Route>
          <Route path='/article' Component={Article}></Route>
          <Route path='/registro' Component={SingIn}></Route>
          <Route path='/registro-like-admin' Component={SignInLikeAdmin1}></Route>
          <Route path='/registro-like-admin/details-app' Component={SignInLikeAdmin2}></Route>
          <Route path='/ajustes' Component={Settings}></Route>
          <Route path='/view-articles' Component={ViewArticles}></Route>
          <Route path='/create-categories' Component={CreateCategory}></Route>
          <Route path='/create-article' Component={CreateArticle}></Route>
          <Route path='/*' Component={ErrorPage}></Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
