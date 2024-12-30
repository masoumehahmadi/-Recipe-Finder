import styles from "./NavBar.module.css";
import NavLink from "../NavLink/NavLink";
import { FaHome } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
export default function NavBar() {
  return (
    <header
      className={`${styles.navbarContainer} flex justify-center items-center h-12 fixed top-0 left-0 right-0 z-10 `}
    >
      <nav className={`${styles.nav} flex`}>
        <ul className="flex justify-center items-center gap-6">
          <NavLink href={"/"}>
            <div className="flex justify-center items-center gap-1">
              <FaHome />
              <li>Home</li>
            </div>
          </NavLink>
          <NavLink href={"/favorites"}>
            <div className="flex justify-center items-center gap-1">
              <MdFavoriteBorder />
              <li>Favorites</li>
            </div>
          </NavLink>
          <NavLink href={"/aboutus"}>
            <div className="flex justify-center items-center gap-1">
              <FaInfoCircle />
              <li>About us</li>
            </div>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
