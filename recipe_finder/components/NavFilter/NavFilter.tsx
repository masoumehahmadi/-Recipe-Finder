"use client";
import React from "react";
import styles from "./NavFilter.module.css";
import { useState } from "react";
import filterData from "./../../public/filter.json";
import NavLink from "../NavLink/NavLink";
import { useRouter } from "next/navigation";

type FilterOptions = "diet" | "Cuisines";
export default function NavFilter({query}: {query:string}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string[]>([]);
  const [titleOption, setTitleOption] = useState("");
  const router = useRouter();


  const handleOptionClick = (option:FilterOptions) => {
    const contentFilter = filterData[option];
    setModalContent(contentFilter || []);
    setTitleOption(option)
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setTitleOption("")
  };

  return (
    <nav className="flex">
      <ul className={styles.NavFilter}>
        <li onClick={() => handleOptionClick("diet")}>Diet</li>
        <li onClick={() => handleOptionClick("Cuisines")}>Cuisines</li>
        <li onClick={() => router.push(`${query}/sort/popularity`)}>Popularity</li>
      </ul>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {modalContent ? (
              <ul className={styles.modalItem}>
                {modalContent.map((item:string, index:number) => (
                  <NavLink href={`${query}/${titleOption}/${item}`} key={index}>{item}</NavLink>
                ))}
              </ul>
            ) : (
              <p>no content</p>
            )}
            <button onClick={handleCloseModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
