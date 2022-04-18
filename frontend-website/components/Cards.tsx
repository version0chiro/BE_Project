import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import styles from "./Cards.module.css";
import { useSpring, animated } from "react-spring";
// const  image_finder  =  require("image-search-engine")

type RecipeProps = {
  recipe: string | null;
};

const Cards: React.FC<RecipeProps> = (props) => {
  const [renderInstructions, setRender] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState("Recipe Name will be here");
  const [loading, setLoading] = useState(false);
  const [recipeIngred, setRecipeIngred] = useState(
    "Recipe Ingredients will be here"
  );

  const [recipeInstructions, setRecipeInstructions] = useState(
    "Recipe Instructions will be here"
  );
  const [recipeImage, setRecipeImage] = useState("https://picsum.photos/200/");

  // console.log("something",process.env.GOOGLE_API);

  useEffect(async () => {
    setLoading(true);
    await fetch(
      "https://www.googleapis.com/customsearch/v1?key=AIzaSyCYc7xP4hLh6a8iO8bwAjCBSq9zaKUqfb4&cx=d8ca721a36921e53d&q=" +
        recipeTitle
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items[0].pagemap.cse_image[0].src);
        // if (typeof data.item !== "undefined" && data.item)
        setRecipeImage(data.items[0].pagemap.cse_image[0].src);
        // else setRecipeImage("https://picsum.photos/200/");
      });

    setLoading(false);

    console.log(recipeImage);
  }, [recipeTitle]);

  let tempArr: string[] = [];
  if (props.recipe) {
    tempArr = props.recipe.split("^^^^");
    if (recipeTitle !== tempArr[0]) {
      setRecipeTitle(tempArr[0]);
      setRecipeIngred(tempArr[1]);
      setRecipeInstructions(tempArr[2]);
    }
  }
  const animataion = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <animated.div style={animataion}>
      {!loading && (
        <Card className={styles.recipe_card}>
          <div className={styles.innerCard}>
            <Card.Img className={styles.CardImg} src={recipeImage} />
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
              <Card.Text>{recipeInstructions && recipeInstructions.substring(0, 150)}</Card.Text>
              <Button
                variant="secondary"
                href={
                  "https://www.google.com/search?q=" + recipeTitle + "recipe"
                }
              >
                Find More Information
              </Button>
            </Card.Body>
          </div>
        </Card>
      )}
    </animated.div>
  );
};

export default Cards;
