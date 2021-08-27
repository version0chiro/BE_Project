import Cards from "../../components/Cards";
import styles from "./recipes.module.css";
const RecipeForm = () => {
  return (
    <div>
      <div className={styles.title_set}>
        <h1>Recipe Form</h1>
        <p>This is a recipe form.</p>
      </div>
      <div className={styles.card_set}>
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
};

export default RecipeForm;
