import WatchCard from "../../utils/shared/WatchCard";
import { WATCHES } from "../../utils/shared/MockData";
import "../../styles/AppCustomCSS.css";
import { useState } from "react";
// import MapComponent from "../../components/google/MapComponent";

const SelectWatchType = () => {
  const [selectedWatch, setSelectedWatch] = useState(null)
  return (
    <div className="flex flex-col items-center justify-center md:mt-20">
      <div className="flex flex-col justify-center  items-center  md:w-[860px]">
        <p className="text-[30px] font-bold md:mb-4">Select Your Watch</p>
        <p className="px-4 md:mb-8 xs:">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos
          labore consequatur rerum, quia quaerat harum nisi quod incidunt
          accusantium consectetur placeat minima doloremque sapiente neque
          dolorum voluptas porro? Reiciendis!
        </p>
      </div>
      <div className="gridContainer md:w-[1024px] mb-12">
        {WATCHES.map((watch) => (
          <div className="cardGrid">
            <WatchCard
              key={watch.id}
              image={watch.image}
              watchName={watch.name}
              onSelect={setSelectedWatch}
              watch={watch}
            />
          </div>
        ))}
      </div>

     {/* <MapComponent  /> */}
      
    </div>
  );
};

export default SelectWatchType;
