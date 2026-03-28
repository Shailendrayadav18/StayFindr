import Show from "./components/pages/show/show"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import View from "./components/pages/show/view";
import NewListing from "./components/pages/create/CreateListing";
import Signup from "./components/pages/user/signup";
import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./components/pages/user/login";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const checkAuth = async () => {

      const res = await fetch("http://localhost:8080/verifyUser", {
        credentials: "include"
      });

      const data = await res.json();

      if (data.authenticated) {
        setUser(data.user);
      }

    };

    checkAuth();

  }, []);
  return (
    <>
      <ToastContainer
        position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop closeOnClick pauseOnHover theme="colored"
      />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout user={user} />} >
          <Route path="/" element={<Show />} />
          <Route path="/listing/:id" element={<View />} />
          <Route path="/listing/new" element={<NewListing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
