import Cards from "../../components/Cards";
import RecipeFormDiv from "../../components/RecipeForm";
import styles from "./recipes.module.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const RecipeForm = () => {
  const [recipe1, setRecipe1] = useState(null);
  const [recipe2, setRecipe2] = useState(null);
  const [recipe3, setRecipe3] = useState(null);
  const [input, setInput] = useState("");
  return (
    <div>
      <div className={styles.title_set}>
        <h1>Recipe Form</h1>
        <p>This is a recipe form.</p>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            let ingred = e.target.ingredients.value;
            let ingred_arr = ingred.replaceAll(" ", "&&");

            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ingredients: ingred_arr }),
            };
            fetch("/api/recipe", requestOptions)
              .then((response) => response.json())
              .then((json) => {
                setRecipe1(json[0]);
                setRecipe2(json[1]);
                setRecipe3(json[2]);
              });
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Ingredients Seperated with Spaces</Form.Label>
            <Form.Control
              name="ingredients"
              type="text"
              placeholder="Enter Ingredients"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className={styles.card_set}>
        <Cards recipe={recipe1 ? recipe1 : "Recipe will come here"} />
        <Cards recipe={recipe2 ? recipe2 : "Recipe will come here"} />
        <Cards recipe={recipe3 ? recipe3 : "Recipe will come here"} />
      </div>
    </div>
  );
};

export default RecipeForm;
