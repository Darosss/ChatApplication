import "./style.css";
import React, { useState } from "react";

function HamburgerMenu(props: { menu: any }) {
  const { menu } = props;
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    menu.current.classList.toggle("hamburger-show");
  };

  return (
    <button
      className="hamburger m-1 mb-2 bg-dark text-light"
      onClick={() => {
        setOpen(!open);
        toggleNavigation();
      }}
    >
      {open ? "X" : "\u2630"}
    </button>
  );
}

export default HamburgerMenu;
