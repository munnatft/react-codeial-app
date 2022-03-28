import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Home, Login, Profile, Register, UserProfile } from '../pages';
import { useAuth } from '../hooks';
import { Loader } from '.';

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users/profile" element={<PrivateRoute />}>
            <Route path="/users/profile" element={<Profile />} />
          </Route>
          <Route path="/user/:userId" element={<PrivateRoute />}>
            <Route path="/user/:userId" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

