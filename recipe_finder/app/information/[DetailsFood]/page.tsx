
import NavBar from "@/components/NavBar/NavBar";
import styles from "./DetailsFood.module.css";
import { idSearchProps } from "./type";
import FoodInfo from "@/components/FoodInfo/FoodInfo";
const getDetails = async (DetailsFood: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_SPOONACULAR_URL}/recipes/${DetailsFood}/information?&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (!response.ok) {
      return {};
    }
    const resultResponse = await response.json();
    console.log(resultResponse)
    return resultResponse;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export default async function DetailsFood({
  params,
}: {
  params: idSearchProps;
}) {
  const { DetailsFood }: idSearchProps = params;
  const list = await getDetails(DetailsFood);
  const steps = list?.analyzedInstructions[0]?.steps||[]
 
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <FoodInfo
            id={list.id}
            image={list.image}
            webTitle={list.webTitle}
            title={list.title}
            summary={list.summary}
            extendedIngredients={list.extendedIngredients}
            servings={list.servings}
            readyInMinutes={list.readyInMinutes}
            sourceUrl={list.spoonacularSourceUrl}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}
