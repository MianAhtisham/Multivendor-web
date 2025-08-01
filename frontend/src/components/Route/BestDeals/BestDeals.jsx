import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { productData } from "../../../static/data.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData = productData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData?.slice(0, 5);
    setData(firstFive);
  }, []);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {data.map((i, index) => (
          <ProductCard data={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BestDeals;
