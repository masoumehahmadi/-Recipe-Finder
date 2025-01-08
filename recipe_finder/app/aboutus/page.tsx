import NavBar from "@/components/NavBar/NavBar";

import styles from "./about.module.css";
export default function aboutus() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <div className={styles.containerCards}>
            <div className={styles.card}>
              <p>
                This website serves as a showcase for my front-end development
                skills, utilizing Next.js and React . 
                <br />For the back-end
                functionality, I have integrated the Spoonacular API
                (https://spoonacular.com/) .
                <br /> Over time, I plan to address any
                issues that arise and implement necessary changes to enhance the
                overall user experience .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
