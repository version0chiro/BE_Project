import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// const  image_finder  =  require("image-search-engine")

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
  const [recipeImage, setRecipeImage] = useState("https://picsum.photos/200/");
  useEffect(async () => {
    console.log("something 212");

    await fetch(
      "https://www.googleapis.com/customsearch/v1?key=AIzaSyCYc7xP4hLh6a8iO8bwAjCBSq9zaKUqfb4&cx=d8ca721a36921e53d&q=" +
        recipeTitle
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items[0].pagemap.cse_image[0].src);
        setRecipeImage(data.items[0].pagemap.cse_image[0].src);
      });

    console.log(recipeImage);
  }, [recipeTitle]);
  let tempArr: string[] = [];
  if (props.recipe) {
    tempArr = props.recipe.split("^^^^");
    if (recipeTitle !== tempArr[0]) {
      setRecipeTitle(tempArr[0]);
      setRecipeIngred(tempArr[1]);
      setRecipeInstructions(tempArr[2]);

      //   if (recipeInstructions !== "Recipe Instructions will be here") {
      //     console.log("something 212");

      //     fetch(
      //       "https://www.googleapis.com/customsearch/v1?key=AIzaSyCYc7xP4hLh6a8iO8bwAjCBSq9zaKUqfb4&cx=d8ca721a36921e53d&q=" +
      //         recipeTitle
      //     )
      //       .then((response) => response.json())
      //       .then((data) => {
      //         console.log(data);
      //         setRecipeImage(data.items[0].pagemap.cse_image.src);
      //       });
      //   }
    }
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={recipeImage} />
      <Card.Body>
        <Card.Title>{recipeTitle}</Card.Title>
        <Card.Text>
          {typeof recipeIngred !== "undefined" && recipeIngred
            ? recipeIngred
                .split(";")
                .map((ingred, i) => <li key={i}>{ingred}</li>)
            : null}
        </Card.Text>
        <br />
        <Card.Text>{recipeInstructions}</Card.Text>
        <Button
          variant="primary"
          href={"https://www.google.com/search?q=" + recipeTitle + "recipe"}
        >
          Go somewhere
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
