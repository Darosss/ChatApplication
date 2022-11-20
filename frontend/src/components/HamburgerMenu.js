import React, { useState } from "react";
import { HamburgerIcon } from "react-hamburger-icon";

function HamburgerMenu(props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    props.menu.current.classList.toggle(
      props.display ? props.display : "hamburger-menu-flex"
    );
  };

  return (
    <HamburgerIcon
      className="hamburger m-1 mb-2"
      open={open}
      onClick={() => {
        setOpen(!open);
        toggleNavigation();
      }}
    />
  );
}

export default HamburgerMenu;
