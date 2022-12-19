import "./style.css";
import { useRef } from "react";
import NavigationLink from "./NavigationLink";
import Logout from "../../Logout";
import HamburgerMenu from "../../HamburgerMenu";
import { Link } from "react-router-dom";

function NavigationBar(props: { auth: IAuth }) {
  const { auth } = props;
  const navigation = useRef<HTMLUListElement>(null);

  return (
    <nav className="app-navigation">
      <Link className="home-site-link" to="/">
        Chat room
      </Link>

      <HamburgerMenu menu={navigation} />

      <ul className="nav-ul" ref={navigation}>
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
