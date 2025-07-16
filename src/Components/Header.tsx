import { NavLink } from "react-router-dom";
import accountIcon from "../assets/account_circle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";

function fakeLogout() {
  localStorage.removeItem("isLoggedIn");
}

function Header() {
  const loginStatus = localStorage.getItem("isLoggedIn");

  return (
    <header>
      <NavLink className="site-logo" to="/">
        #VANLIFE
      </NavLink>

      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/host"
        >
          Host
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/about"
        >
          About
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/vans"
        >
          Vans
        </NavLink>

        {loginStatus !== null ? (
          <NavLink to="/" className="logout-NavLink" onClick={fakeLogout}>
            Logout
          </NavLink>
        ) : (
          // <button className="logout-button" onClick={fakeLogout}>Logout</button>
          <NavLink className="login-link" to="/login">
            <img src={accountIcon} className="login-icon" />
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
