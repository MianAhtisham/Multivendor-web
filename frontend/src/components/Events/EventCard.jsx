import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx"

const EventCard = () => {
  return (
    <div className="w-full bg-white rounded-lg  lg:flex p-4 mb-12 gap-6">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 mt-6 flex justify-center items-center">
        <img
          src="https://m.media-amazon.com/images/I/61nzPMNY8zL._AC_SL1500_.jpg"
          alt="iPhone 14 Pro Max"
          className="w-full h-auto max-w-sm rounded"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2">
        <h2 className={`${styles.productTitle} mb-2`}>
          iPhone 14 Pro Max 8/256GB
        </h2>
        <p className="text-sm text-gray-700 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
          harum aut? Ducimus nemo quia quibusdam nisi quidem, architecto veniam
          quo quod, cum, iste numquam. Architecto assumenda velit culpa
          quibusdam ipsam! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Recusandae, facere officiis vel adipisci delectus veniam
          laudantium quaerat architecto laborum in, nisi perspiciatis blanditiis
          accusamus et exercitationem explicabo rerum hic repudiandae?
        </p>
        <div className="py-2 justify-between flex">
<div className="flex">
<h5 className="pr-3 line-through text-[#d55b45] font-[500] text-[18px]">
  1099$
</h5>
<h5 className="text-[#333] font-Roboto font-bold  text-[20px]">
  999$
</h5>
</div>
<span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
120 Sold
</span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
