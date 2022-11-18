import React, { useState, useRef, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import Logout from "./Logout";
import { HamburgerIcon } from "react-hamburger-icon";
import { Link } from "react-router-dom";

function NavigationBar({ auth }) {
  const [open, setOpen] = useState(false);

  const navigation = useRef();

  const toggleNavigation = () => {
    navigation.current.classList.toggle("show");
  };

  return (
    <nav className="bg-secondary">
      <Link className="home-site-link" to="/">
        Chat room
      </Link>

      <HamburgerIcon
        className="hamburger"
        id="hamburger"
        open={open}
        onClick={() => {
          setOpen(!open);
          toggleNavigation();
        }}
      />

      <ul className="nav-ul" id="nav-ul" ref={navigation}>
        <NavigationLink url="/" name="Home" />
        {auth ? <NavigationLink url="/chats" name="Chats" /> : null}
        {!auth ? <NavigationLink url="/login" name="Login" /> : null}
        {!auth ? <NavigationLink url="/register" name="Register" /> : null}
        {auth ? <NavigationLink url="/rooms" name="Rooms" /> : null}
        {auth ? <NavigationLink url="/profil" name="Profil" /> : null}
        {auth && auth.administrator ? (
          <NavigationLink url="/users" name="Users" />
        ) : null}
        {auth && auth.administrator ? (
          <NavigationLink url="/ranges" name="Ranges" />
        ) : null}

        {auth ? <Logout /> : null}
      </ul>
    </nav>
  );
}

export default NavigationBar;
