"use client";
import { useRouter } from "next/navigation";
import styles from "./FoodCart.module.css";
import Image from "next/image";

type FoodCartProps = {
  id: number;
  title: string;
  image: string;
};

const FoodCart = ({ id, title, image }: FoodCartProps) => {
  const router = useRouter();
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageContainer}>
          <Image src={image} alt={title} width={80}
            height={50} className={styles.imageCart} />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.btnMore}
          onClick={() => router.push(`/information/${id}`)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FoodCart;
