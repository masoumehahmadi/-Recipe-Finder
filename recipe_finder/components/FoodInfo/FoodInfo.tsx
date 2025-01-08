"use client";
import Image from "next/image";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { IoCheckboxOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import DOMPurify from "isomorphic-dompurify";
import styles from "./FoodInfo.module.css";
import {idSearchProps} from "./../../app/information/[DetailsFood]/type";
import NavLink from "../NavLink/NavLink";

type stepsProps = {
  number:number;
  step:string;
};
type ingredient = {
  name:string;
  original:string;
};

const addFavorite = (foodId: number) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")|| "[]") ;
  if (!favorites.includes(foodId)) {
    favorites.push(foodId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  ;
};

export default function FoodInfo({
  id,
  image,
  title,
  summary,
  extendedIngredients,
  servings,
  readyInMinutes,
  sourceUrl,
  analyzedInstructions,
}: idSearchProps) {
  const cleanContent = DOMPurify.sanitize(summary);
  return (
    <div className={styles.containerCards}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={title}
            width={500}
            height={400}
            className={styles.image}
          />
          <p className={styles.title}>{title}</p>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        <div className={styles.ingredientsPart}>
          <div className={styles.ingredients}>
            {extendedIngredients &&
              extendedIngredients.map((ingredient:ingredient,index:number) => (
                <div className={styles.ingredientStep} key={index}>
                  <IoCheckboxOutline className={styles.ingredientsvg} />
                  <span>{ingredient.name}:</span>
                  <span>{ingredient.original}</span>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.anotherDetail}>
          <div className={styles.anotherinfo}>
            <MdOutlinePeopleAlt className={styles.infosvg} />
            <span className={styles.infoDetail}>serving : {servings}</span>
          </div>
          <div className={styles.anotherinfo}>
            <MdOutlineTimer className={styles.infosvg} />
            <span className={styles.infoDetail}>
              cooking time : {readyInMinutes}
            </span>
          </div>

          <div className={styles.anotherinfo}>
            <MdInfoOutline className={styles.infosvg} />
            <a href={sourceUrl} className={styles.infoDetail}>
              Click for more info : spoonacular.com
            </a>
          </div>
        </div>
        <div className={styles.analyzedInstructions}>
          {analyzedInstructions.map((step:stepsProps) => (
            <div key={step.number}>
              Step {step.number}: {step.step}
            </div>
          ))}
        </div>
        <div className={styles.btnFavorite}>
          <MdFavoriteBorder />
          <button onClick={() => addFavorite(id)}><NavLink href={"/favorites"}>Save to favorites</NavLink></button>
        </div>
      </div>
    </div>
  );
}
