import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard.jsx";
import Events from "./Events.jsx";
import { fetchAllCategories } from "../../apis.js";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="home">
      <h2 className="text-center">Browse Events by Categories</h2>
      <div className="categories-container">
        {categories.slice(0, 7).map((category) => {
          return (
            <CategoryCard
              key={category.id}
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
