import styles from "./ResultList.module.css";
import { ResultListProps } from "./types";

const ResultList = ({ list = [] }: ResultListProps) => {
  return (
    <div className={styles.container}>
      {list.map((food, index) => (
        <div key={index}>
          <h3>{food.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
