"use client"
import Image from "next/image";
import { useReducer, useState } from "react";
//import { FaSearch } from "react-icons/fa";
import styles from "./HomePage.module.css";
import { ResultListProps } from "../ResultList/types";
import ResultList from "../ResultList/ResultList";
import { useRouter } from "next/router";

export default function HomePage({ list = [] }: ResultListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const router= useRouter();
  const handleSearch =(e:Event)=>{
    e.preventDefault();
    const filteredResult = list.filter(food=>food.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  setResults(filteredResult)
  router.push(`/?query=${searchTerm}`)
  }
  return (
    <div>
      <Image
        src="/bgHome.jpg"
        alt="background home page"
        fill
        style={{
          objectFit: "fill",
          zIndex: "-1",
        }}
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relateive w-vw h-screen flex items-center justify-center z-20">
        <form onSubmit={handleSearch} className="flex items-center justify-center relative w-full max-w-lg z-10">
          <input
            type="text"
            placeholder="Search for ingredients or food name : ..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className={`shadow-2xl text-center w-full px-8 py-6 text-base text-2xl ${styles.inputBox} rounded-lg focus:outline-none`}
          />
        </form>
      </div>
      {results.length >0 && <ResultList list={results}/>}
    </div>
  );
}
//<FaSearch className={`absolute right-14 text-base ${styles.iconSearch}`}/>
