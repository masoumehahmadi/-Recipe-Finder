import styles from "./Pagination.module.css"
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

const Pagination = ({ totalResults, number, offset, onPageChange }:string) => {
  const totalPages = Math.ceil(totalResults / number);
  const currentPage = Math.floor(offset / number) + 1;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange((currentPage - 2) * number);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage * number);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={handlePrev} disabled={currentPage === 1}>
        <MdNavigateBefore className={styles.btnIcone} />
      </button>
      <span className={styles.titleBtn} >page {currentPage} of {totalPages}</span>
      <button className={styles.btn} onClick={handleNext} disabled={currentPage === totalPages}>
        <MdNavigateNext className={styles.btnIcone}  />
      </button>
    </div>
  );
};

export default Pagination;
