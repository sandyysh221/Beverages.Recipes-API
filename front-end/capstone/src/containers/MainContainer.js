import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "../components/header/NavBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Recipes from "../components/recipes/Recipes";
import RecipeFull from "../components/recipeFull/RecipeFull";
import ApiIndex from "../components/api/ApiIndex";
import Profile from "../components/AuthComponents/Profile";
import Loading from "../components/AuthComponents/Loading";
import ProtectedRoute from "../auth/protected-route";
import Ingredients from "../components/ingredients/Ingredients";

const MainContainer = () => {
  const { isLoading } = useAuth0();

  const apiUrl = "http://localhost:8080/api/recipes";

  const [recipesJson, setRecipesJson] = useState([]);

  const getAllRecipes = async () => {
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    setRecipesJson(data);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const apiUrl2 = "http://localhost:8080/api/ingredients";

  const [ingredientsJson, setIngredientsJson] = useState([]);

  const getAllIngredients = async () => {
    const resp = await fetch(apiUrl2);
    const data = await resp.json();
    setIngredientsJson(data);
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <Header />

      <Routes>
        <Route
          element={<Recipes recipes={recipesJson} />}
          path="/"
          exact
          component={<Recipes />}
        />
        <Route
          element={<RecipeFull recipes={recipesJson} />}
          path="/recipes/:id"
          exact
          component={<RecipeFull />}
        />
         <Route 
          element={<Ingredients ingredients={ingredientsJson}/>} 
          path="/ingredients"
          exact 
          component={<Ingredients />} 
          />
            
        <Route element={<ApiIndex />} path="/api" component={<ApiIndex />} />
        <Route element={<Profile />} path="/profile" component={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default MainContainer;
