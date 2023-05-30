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
import AdminOptions from './components/add-articles/ViewArticles';
import ViewCategories from './components/add-articles/categories/ViewCategories';
import CreateCategory from './components/add-articles/categories/CreateCategory';
import ViewArticles from './components/add-articles/articles/ViewArticles';
import CreateArticle from './components/add-articles/articles/CreateArticle';
import MenuArticles from './components/menu-articles/MenuArticles';
import OrderHistory from './components/home/menu/orders-section/OrderHistory';
import SeeOrders from './components/see-orders-clients/SeeOrders';
import SeeOrder from './components/see-orders-clients/SeeOrder';
import EditCategory from './components/add-articles/categories/EditCategory';
import EditArticle from './components/add-articles/articles/EditArticle';
import InviteFriends from './components/home/menu/invite-fiends-section/InviteFriends';
import SearchCodeRef from './components/home/code-ref-section/SearchCodeRef';

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
          <Route path='/home/search-code-ref' Component={SearchCodeRef}></Route>
          <Route path='/article' Component={Article}></Route>
          <Route path='/registro' Component={SingIn}></Route>
          <Route path='/registro-like-admin' Component={SignInLikeAdmin1}></Route>
          <Route path='/registro-like-admin/details-app' Component={SignInLikeAdmin2}></Route>
          <Route path='/ajustes' Component={Settings}></Route>
          <Route path='/order-history' Component={OrderHistory}></Route>
          <Route path='/invite-friends' Component={InviteFriends}></Route>
          <Route path='/admin-options' Component={AdminOptions}></Route>
          <Route path='/view-categories' Component={ViewCategories}></Route>
          <Route path='/edit-category' Component={EditCategory}></Route>
          <Route path='/create-categories' Component={CreateCategory}></Route>
          <Route path='/view-articles' Component={ViewArticles}></Route>
          <Route path='/edit-article' Component={EditArticle}></Route>
          <Route path='/create-article' Component={CreateArticle}></Route>
          <Route path='/menu-articles' Component={MenuArticles}></Route>
          <Route path='/*' Component={ErrorPage}></Route>
          <Route path='/see-orders' Component={SeeOrders}></Route>
          <Route path='/see-order' Component={SeeOrder}></Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
