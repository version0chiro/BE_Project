import { Card, Button } from "react-bootstrap";
import { useState } from "react";

type RecipeProps = {
  recipe: string | null;
};

const Cards: React.FC<RecipeProps> = (props) => {
  const [recipeTitle, setRecipeTitle] = useState("Recipe Name will be here");
  const [recipeIngred, setRecipeIngred] = useState(
    "Recipe Ingredients will be here"
  );

  const [recipeInstructions, setRecipeInstructions] = useState(
    "Recipe Instructions will be here"
  );
  let tempArr: string[] = [];
  if (props.recipe) {
    console.log("something");
    tempArr = props.recipe.split("^^^^");
    console.log(tempArr);
    if (recipeTitle !== tempArr[0]) {
      setRecipeTitle(tempArr[0]);
      setRecipeIngred(tempArr[1]);
      setRecipeInstructions(tempArr[2]);
    }
  }

  //   const formatString = (recipe: string | null) => {
  //     if (recipe === null) return;
  //     setRecipeTitle(tempArr[0]);
  //     setRecipeIngred(tempArr[1]);
  //     setRecipeInstructions(tempArr[2]);
  //   };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://picsum.photos/200/300" />
      <Card.Body>
        <Card.Title>{recipeTitle}</Card.Title>
        <Card.Text>
          { recipeIngred.split(";").map((ingred) => (
            <li>{ingred}</li>
          ))}
        </Card.Text>
        <br />
        <Card.Text>{recipeInstructions}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
