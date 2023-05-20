import React, { useContext, useRef } from "react";
import NavigationLink from "./NavigationLink";
import Logout from "@components/logout";
import HamburgerMenu from "@components/hamburgerMenu";
import { Link } from "react-router-dom";
import { AuthContext } from "@contexts/authContext";
import { navigationBarElementId, navigationBarIds } from "@utils/dataTestIdsList";

function NavigationBar() {
  const { auth } = useContext(AuthContext);
  const navigation = useRef<HTMLUListElement>(null);

  return (
    <nav className="app-navigation" data-testid={navigationBarElementId}>
      <Link className="home-site-link" to="/">
        Chat room
      </Link>

      <HamburgerMenu menu={navigation} />

      <ul className="nav-ul" ref={navigation}>
        <NavigationLink dataTestId={navigationBarIds.home} url="/" name="Home" />
        {auth ? <NavigationLink dataTestId={navigationBarIds.chats} url="/chats" name="Chats" /> : null}
        {!auth ? <NavigationLink dataTestId={navigationBarIds.login} url="/login" name="Login" /> : null}
        {!auth ? <NavigationLink dataTestId={navigationBarIds.register} url="/register" name="Register" /> : null}
        {auth ? <NavigationLink dataTestId={navigationBarIds.rooms} url="/rooms" name="Rooms" /> : null}
        {auth ? <NavigationLink dataTestId={navigationBarIds.profil} url="/profil" name="Profil" /> : null}
        {auth && auth.administrator ? (
          <NavigationLink dataTestId={navigationBarIds.users} url="/users" name="Users" />
        ) : null}
        {auth && auth.administrator ? (
          <NavigationLink dataTestId={navigationBarIds.ranges} url="/ranges" name="Ranges" />
        ) : null}

        {auth ? <Logout /> : null}
      </ul>
    </nav>
  );
}

export default NavigationBar;
