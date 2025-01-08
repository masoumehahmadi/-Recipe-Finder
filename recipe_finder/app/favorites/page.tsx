"use client"
import FoodCart from "@/components/FoodCart/FoodCart";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./favorite.module.css";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface FavoriteItem {
  id: number;
  title: string;
  image: string;
}
const getInfo = async (DetailsFood: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SPOONACULAR_URL}/recipes/${DetailsFood}/information?&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      return {};
    }
    const resultResponse = await response.json();

    return resultResponse;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export default function Favorite() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const fetchFavorites = async () => {
      const favoritePromises = storedFavorites.map((id:number) => getInfo(id));
      const favoriteData = await Promise.all(favoritePromises);
      const formattedFavorites = favoriteData.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
      }));

      setFavorites(formattedFavorites);
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (itemId:number) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites = favorites.filter((id:number) => Number(id) !== itemId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites((prevData) => prevData.filter((item) => item.id !== itemId));
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <div className={styles.containerCards}>
            <div className={styles.card}>
              <div className={styles.deletBtn}></div>
              {favorites && favorites.length > 0 ? (
                favorites.map((item) => (
                  <div key={item.id} className={styles.cardItem}>
                    <div
                      className={styles.deletBtn}
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      <MdDeleteOutline className={styles.deleteIcon} />
                    </div>
                    <FoodCart
                      id={item.id}
                      title={item.title}
                      image={item.image}
                    />
                  </div>
                ))
              ) : (
                <div className={styles.noItem}>There are no favorite items</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
