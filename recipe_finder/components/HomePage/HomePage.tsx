"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./HomePage.module.css";
import { useRouter } from "next/navigation";
import NavBar from "../NavBar/NavBar";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const encodeedSearchTerm = encodeURIComponent(searchTerm);
    router.push(`list/${encodeedSearchTerm}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <NavBar />
        <div className={styles.searchBox}>
          <div className={styles.imagePart}>
            <Image
              src="/bgHome.jpg"
              alt="background home page"
              width={700}
              height={100}
              sizes="(max-width:1024px) 600px,(750px<width<1024px) 400px,(max-width:750px) 300px,"
              className={styles.img}
            />

            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className={styles.searchForm}>
            <form
              onSubmit={handleSearch}
              className="flex flex-col items-center justify-center gap-2 relative w-full z-10"
            >
              <h3 className={styles.titleInput}>Find Recipes you'll love</h3>
              <div className={styles.inputPart}>
                <input
                  type="text"
                  placeholder="Search for ingredients or food name : ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`shadow-2xl text-center w-full px-8 py-6 ${styles.inputBox} rounded-lg focus:outline-none`}
                />
                <button
                  type="submit"
                  className={`${styles.btnSearch} px-8 py-6 text-center rounded-lg`}
                >
                  search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
