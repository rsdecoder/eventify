import React from "react";
import { Link } from "react-router-dom";
Link;
const CategoryCard = ({ categoryId, categoryName }) => {
  return (
      <Link
        to={`/events?category_id=${categoryId}&category_name=${categoryName}`}
        className="category-link"
        style={{ textDecoration: "none" }}
      >
        {categoryName}
      </Link>

  );
};

export default CategoryCard;
