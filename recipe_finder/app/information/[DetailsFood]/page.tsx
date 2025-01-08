import NavBar from "@/components/NavBar/NavBar";
import styles from "./DetailsFood.module.css";
import FoodInfo from "@/components/FoodInfo/FoodInfo";
import { idSearchProps } from "./type";
const getDetails = async (DetailsFood: string) => {
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

export default async function DetailsFood({
  params,
}: {
  params: idSearchProps;
}) {
  const { DetailsFood }: idSearchProps = params;

  const list = await getDetails(DetailsFood);
  const steps =
    list?.analyzedInstructions && list.analyzedInstructions.length > 0
      ? list.analyzedInstructions[0].steps
      : [];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <NavBar />
          <FoodInfo
            id={list.id}
            image={list.image}
            title={list.title}
            summary={list.summary}
            extendedIngredients={list.extendedIngredients}
            servings={list.servings}
            readyInMinutes={list.readyInMinutes}
            analyzedInstructions={steps}
            sourceUrl={list.spoonacularSourceUrl}
          />
        </div>
      </div>
    </div>
  );
}
