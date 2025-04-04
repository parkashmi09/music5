

import React from "react";
import industry from "../../assets/blog/category/Listitem.png";
import promotion from "../../assets/blog/category/Listitem2.png";
import production from "../../assets/blog/category/Listitem3.png";
import industrys from "../../assets/blog/category/Listitem4.png";
import "../../styles/blog/CategoryCard.css"; // Custom CSS for hover effects

const categories = [
  { image: industry, title: "Industry" },
  { image: industrys, title: "Manufacturing" },
  { image: promotion, title: "Promotion" },
  { image: production, title: "Production" },
];

export default function CategoryCard() {
  return (
    <div className="container py-4">
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div className="card category-card">
              <img src={category.image} className="card-img-top" alt={category.title} />
              <div className="overlay">
                <div className="text">{category.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
