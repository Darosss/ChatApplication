import NavigationLink from "./NavigationLink";
import Logout from "./Logout";

function NavigationBar({ auth }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <span className="navbar-brand m-2">Chat room</span>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <NavigationLink url="/" name="Home" />
          {auth ? <NavigationLink url="/chats" name="Chats" /> : null}
          {!auth ? <NavigationLink url="/login" name="Login" /> : null}
          {!auth ? <NavigationLink url="/register" name="Register" /> : null}
          {auth ? <NavigationLink url="/rooms" name="Rooms" /> : null}
          {auth ? <NavigationLink url="/profil" name="Profil" /> : null}
        </ul>
      </div>
      <div className="m-2">
        <ul className="navbar-nav mr-auto">
          {auth && auth.administrator ? (
            <NavigationLink url="/users" name="Users" />
          ) : null}
          {auth && auth.administrator ? (
            <NavigationLink url="/ranges" name="Ranges" />
          ) : null}
          {auth ? <Logout /> : null}
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
