import { useState } from "react";
import cat_1 from "./assets/cat-1.png";
import cat_2 from "./assets/cat-2.png";
import cat_3 from "./assets/cat-3.png";
import cat_4 from "./assets/cat-4.png";

const CatImageGallery = () => {
  const [data, setData] = useState("");
  const [clicked, setClicked] = useState(false);
  const cat = [
    { id: 1, image: cat_1 },
    { id: 2, image: cat_2 },
    { id: 3, image: cat_3 },
    { id: 4, image: cat_4 },
  ];

  function handleClick(id) {
    const findCat = cat.find((ele) => ele.id === id);
    console.log(findCat.image);
    setData(findCat.image);
    setClicked(true);
  }

  return (
    <div className="container flex items-center flex-col mb-4">
      <div className="w-full flex flex-col items-center">
        <a href="" className="underline">Click on an image!</a>
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center  gap-2 p-6">
          {cat.map((ele) => (
            <button
              className="max-w-xs shadow-md rounded p-1 active:border cursor-pointer active:border-blue-400"
              key={ele.id}
              onClick={() => handleClick(ele.id)}
            >
              <img
                className="w-full object-cover "
                src={ele.image}
                alt={`cat-${ele.id}`}
              />
            </button>
          ))}
        </div>
      </div>
      {clicked ? (
        <div className="card flex max-w-sm flex-col justify-center items-center border rounded-lg p-4 border-blue-400">
          <h1 className="font-semibold text-xl mb-2">Selected Image</h1>
          <img className="w-full shadow-lg object-cover" src={data} alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CatImageGallery;
