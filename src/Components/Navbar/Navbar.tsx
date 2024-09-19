import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link
              to="/finworld/search"
              className="text-black hover:text-sky-600"
            >
              Search
            </Link>
            &nbsp;
            <Link
              to="finworld/demo"
              target="_blank"
              className="text-sky-600 hover:text-darkBlue"
            >
              Demo
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-sky-600">Welcome, {user?.userName}</div>
            <a
              style={{ cursor: "pointer" }}
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-sky-600 hover:opacity-80"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/finworld/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/finworld/register"
              className="px-8 py-3 font-bold rounded text-white bg-sky-500 hover:opacity-80"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
