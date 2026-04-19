import Show from "./components/pages/show/show"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import View from "./components/pages/show/view";
import NewListing from "./components/pages/create/CreateListing";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./components/pages/user/login";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import AccountLayout from "./components/layouts/AccountLayout";
import MyProfile from "./components/pages/user/Profile";
import MyListings from "./components/pages/user/Listings";
import EditListing from "./components/pages/edit/EditListings";
import UserProfile from "./components/pages/user/UserProfile";

function App() {

  return (
    <>
      <ToastContainer
        position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop closeOnClick pauseOnHover theme="colored"
      />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />} >
          <Route path="/" element={<Show />} />
          <Route path="/listing/:id" element={<View />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<UserProfile />} />

            {/* Account routes */}
            <Route path="/account" element={<AccountLayout />}>
            <Route path="profile" element={<MyProfile />} />
              <Route path="listings" element={<MyListings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
