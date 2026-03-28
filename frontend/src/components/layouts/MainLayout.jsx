import { Outlet } from "react-router-dom";
import Navbar from "../navbar/nav";

export default function MainLayout({user}) {
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
}