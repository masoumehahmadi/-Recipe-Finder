"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./NavLink.module.css";
interface NavLinkProps {
  children: React.ReactNode; 
  href: string; 
}

const NavLink = ({ children, href }: NavLinkProps) => {
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
