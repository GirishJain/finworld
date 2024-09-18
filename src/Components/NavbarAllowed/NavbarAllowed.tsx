import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface Props {
  children: any;
}

const NavbarAllowed = ({ children }: Props) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  useEffect(() => {
    if (location.pathname === "/finworld/demo") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
};

export default NavbarAllowed;
