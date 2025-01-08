"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./filterOption.module.css";
import FoodCart from "@/components/FoodCart/FoodCart";
import Pagination from "@/components/Pagination/Pagination";
const getFilterResult = async ({
  queryValue,
  filterName,
  filterValue,
  offsetNumber,
}) => {
  try {
    const response = await fetch(`
      ${process.env.NEXT_PUBLIC_BASE_SPOONACULAR_URL}/recipes/complexSearch?query=${queryValue}&${filterName}=${filterValue}&offset=${offsetNumber}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const resultResponse = await response.json();

    return {
      results: resultResponse.results,
      totalResults: resultResponse.totalResults,
    };
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
export default function filterOption() {
  const path = usePathname();
  const pathName = path.split("/").map(decodeURIComponent);
  const [offsetNumber, setOffsetNumber] = useState(0);
  const number = 10;
  const [totalResults, setTotalResults] = useState(0);

  const queryValue = pathName[2];
  const filterName = pathName[3];
  const filterValue = pathName[4];
  const [resultsFilter, setResultsFilter] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await getFilterResult({
        queryValue,
        filterName,
        filterValue,
        offsetNumber,
      });
      setResultsFilter(results.results);
      setTotalResults(results.totalResults);
    };

    fetchData();
  }, [queryValue, filterName, filterValue, offsetNumber]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <div className={styles.containerCards}>
            <div className={styles.card}>
              {resultsFilter?.map((food, index) => (
                <FoodCart
                  key={food.id}
                  id={food.id}
                  title={food.title}
                  image={food.image}
                />
              ))}
            </div>
          </div>
          <Pagination
            totalResults={totalResults}
            number={number}
            offset={offsetNumber}
            onPageChange={setOffsetNumber}
          />
        </div>
      </div>
    </div>
  );
}
