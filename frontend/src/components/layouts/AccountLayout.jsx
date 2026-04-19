import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./AccountLayout.css";

export default function AccountLayout() {
  const { setIsHostMode } = useContext(AuthContext);

  useEffect(() => {
    setIsHostMode(true);
    localStorage.setItem("mode", "host");
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row w-100 m-0">

        {/* Sidebar */}
        <div className="col-12 col-md-3 border-end sidebar p-2 p-md-4 min-vh-md-100">
          <h5 className="mb-4 fw-bold d-none d-md-block">Account</h5>

          <div className="d-flex flex-md-column flex-row gap-2 overflow-auto">
            <NavLink
              to="/account/profile"
              className={({ isActive }) =>
                "sidebar-link " + (isActive ? "active" : "")
              }
            >
              <FaUser className="icon" />
              <span className="d-none d-md-inline">Profile</span>
            </NavLink>

            <NavLink
              to="/account/listings"
              className={({ isActive }) =>
                "sidebar-link " + (isActive ? "active" : "")
              }
            >
              <FaHome className="icon" />
              <span className="d-none d-md-inline">Listings</span>
            </NavLink>

          </div>
        </div>

        {/* Content */}
        <div className="col-12 col-md-9">
          <Outlet />
        </div>

      </div>
    </div>
  );
}