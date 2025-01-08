
"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavLink.module.css";
const NavLink = ({ children, href }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={[path === href ? styles.active : ""].join(" ")}
    >
      {children}
    </Link>
  );
};

export default NavLink;
