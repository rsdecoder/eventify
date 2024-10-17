import React from "react";
import HomePage from "./HomePage";

const CategoryCard = ({ categoryId, categoryName }) => {
  return (
    <div className = "category-card">
      <h4>{categoryName}</h4>
    </div>
  );
};

export default CategoryCard;
