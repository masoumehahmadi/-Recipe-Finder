
import HomePage from "@/components/HomePage/HomePage";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router=useRouter();
  const {query}=router.query
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=25&number=2&apiKey=2e28e2a14956422f9a0a931e2bc6f391`
  );
  const data = await response.json();
  const list= data.result;
  return (
    <div>
      <HomePage list={list}/>
    </div>
  );
}
