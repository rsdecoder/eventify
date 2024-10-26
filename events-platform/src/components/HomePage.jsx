import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.jsx";
import Events from "./Events.jsx";
import { fetchAllCategories } from "../../apis.js";
import LoaderSpinner from "./LoaderSpinner.jsx";
import ErrorPage from "./ErrorPage.jsx";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllCategories()
      .then((categories) => {
        setCategories(categories);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(true);
      });
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return (
      <LoaderSpinner/>
    );
  }
  if (error) {
    return <ErrorPage error ={err}/>;
  }

  return (
    <div id="home">
      <h2 className="text-center">Browse Events by Categories</h2>
      <div className="categories-container">
        {categories.slice(0, 7).map((category) => {
          return (
            <CategoryCard
              key={category.id}
              categoryId={category.id}
              categoryName={category.short_name}
            />
          );
        })}
      </div>
      <Events />
    </div>
  );
};

export default HomePage;
