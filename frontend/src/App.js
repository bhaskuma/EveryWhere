import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import LoginProvider from './components/Provider/LoginProvider';
import PrivateRoute from './components/PrivateRoute';
import RegisterProvider from './components/Provider/RegisterProvider';
import Mali from './pages/Mali';
import SubscriptionPlans from './pages/SubscriptionPlans';
import List from './pages/serviceLists/GardnerList'
import ElectricianList from './pages/serviceLists/ElectricianList';
import CookList from './pages/serviceLists/CookList';
import { Booking } from './components/Booking';
import MyBooking from './components/MyBooking'
import ServiceDashboard from './components/Provider/ServiceDashboard';
import ProviderPrivate from './components/Provider/ProviderPrivate';
import { AdminDashboard } from './components/AdminDashboard';
import AdminPrivate from './components/Provider/AdminPrivate';
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
        <Route path='/gardner-list' element={<List />} />
        <Route path='/cook-list' element={<CookList />} />
        <Route path='/electrician-list' element={<ElectricianList />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/my-booking' element={<MyBooking />} />
        <Route path='/login-provider' element={<LoginProvider />} />
        <Route path='/signup-provider' element={<RegisterProvider />} />
        <Route element={<ProviderPrivate />}>
          <Route path='/provider-dashboard' element={<ServiceDashboard />} />
        </Route>

        <Route path='/admin' element={<AdminPrivate>
          <AdminDashboard />

        </AdminPrivate>} />

      </Routes>
    </>
  );
}

export default App;
