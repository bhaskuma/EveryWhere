import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Mali from './pages/Mali';
import SubscriptionPlans from './pages/SubscriptionPlans';
import List from './components/ServiceList'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/mali' element={<Mali />} />
        </Route>

        <Route path='/plan' element={<SubscriptionPlans />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </>
  );
}

export default App;
