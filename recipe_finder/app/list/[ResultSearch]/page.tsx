"use client"
import { useState,useEffect } from "react";
import styles from "./ResultSearch.module.css";
import { ResultSearchProps } from "./types";
import FoodCart from "@/components/FoodCart/FoodCart";
import NavBar from "@/components/NavBar/NavBar";
import NavFilter from "@/components/NavFilter/NavFilter";
import Pagination from "@/components/Pagination/Pagination";

const getResult = async ({ ResultSearch, offsetNumber }: { ResultSearch: string; offsetNumber: number }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SPOONACULAR_URL}/recipes/complexSearch?query=${ResultSearch}&offset=${offsetNumber}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      return {};
    }
    const resultResponse = await response.json();
    return {
      results: resultResponse.results,
      totalResults: resultResponse.totalResults,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export default function ResultSearch({
  params,
}: {
  params: { ResultSearch: string };
}) {
  const { ResultSearch } = params;
  const [list, setList] = useState([]);
  const [offsetNumber, setOffsetNumber] = useState<number>(0);
  const number = 10;
  const [totalResults, setTotalResults] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getResult({
        ResultSearch: ResultSearch.toLowerCase(),
        offsetNumber,
      });
      setList(data.results);
      setTotalResults(data.totalResults);
    };
    fetchData();
  }, [offsetNumber]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <NavFilter query={ResultSearch.toLowerCase()} />
          <div className={styles.containerCards}>
            <div className={styles.card}>
              {list?.map((food:ResultSearchProps) => (
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
