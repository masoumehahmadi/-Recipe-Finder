import { useRouter } from "next/router";
import styles from "./FoodCart.module.css";

type FoodCartProps = {
  id: string;
  title: string;
  readyInMinutes: string;
  image: string;
  summary: string;
};

const FoodCart = ({
  id,
  title,
  readyInMinutes,
  image,
  summary,
}: FoodCartProps) => {
  const router = useRouter();

  return (
    <div className={styles.card}
     onClick={() => router.push(`/${id}`)}>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.info}>
          <span>{readyInMinutes}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
