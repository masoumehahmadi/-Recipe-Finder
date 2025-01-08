import styles from "./NavBar.module.css";
import NavLink from "../NavLink/NavLink";
import { FaHome } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { SiIfood } from "react-icons/si";

export default function NavBar() {
  return (
    <header
      className={`${styles.navbarContainer} flex justify-between items-center h-12 w-full`}
    >
      <div className={styles.logoAndName}>
        <SiIfood />
        <p className="">Recipes Food</p>
      </div>
      <nav className="flex">
        <ul className={styles.listItemnav}>
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
