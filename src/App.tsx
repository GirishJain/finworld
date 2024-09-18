import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";
import NavbarAllowed from "./Components/NavbarAllowed/NavbarAllowed";

function App() {
  return (
    <>
      <UserProvider>
        <NavbarAllowed>
          <Navbar />
        </NavbarAllowed>
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
