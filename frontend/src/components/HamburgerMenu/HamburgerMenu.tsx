import "./style.css";
import { useState } from "react";
import { HamburgerIcon } from "react-hamburger-icon";

function HamburgerMenu(props: { menu: any }) {
  const { menu } = props;
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    menu.current.classList.toggle("hamburger-show");
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
