import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}random.php`);
    const drink = response.data.drinks[0];

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }

    res.render("index", { drink, ingredients, content: "" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post("/search", async (req, res) => {
  const search = req.body.id;
  try {
    const result = await axios.get(`${API_URL}search.php?s=${search}`);
    if (result.data.drinks) {
      const drinks = result.data.drinks
        .map(
          (drink) => `<a href="/search/${drink.idDrink}">${drink.strDrink}</a>`
        )
        .join("<br>");
      res.render("index", { drink: {}, ingredients: [], content: drinks });
    } else {
      res.render("index", {
        drink: {},
        ingredients: [],
        content: "😞 No results available, try with another search",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("index", {
      drink: {},
      ingredients: [],
      content: "Error fetching data",
    });
  }
});

app.get("/search/:id", async (req, res) => {
  const drinkId = req.params.id;
  try {
    const response = await axios.get(`${API_URL}lookup.php?i=${drinkId}`);
    const drink = response.data.drinks[0];

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }

    res.render("index", { drink, ingredients, content: "" });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
