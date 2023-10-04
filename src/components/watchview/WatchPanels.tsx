import { useDispatch, useSelector } from "react-redux";
import { setWatchComponentType } from "../../store/feature/watchFeature/index"

export enum ComponentTypeName {
  STRAP = "STRAP TYPE",
  CASE = "CASE TYPE",
  DIALS = "DIALS",
}

const WatchPanels = ({ selectedStrap, selectedCase, selectedDial }) => {
  const {
    watchDetailsData,
    componentType,
    componentSubType,
    userSubComponentType,
    selectedSubComponentData,
    showColors,
  } = useSelector((state) => state.watchDataReducer);
  const dispatch = useDispatch();
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center h-[80vh] relative">
        {/* <div onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.STRAP))
          } className=" md:left-[50%] top-[0.5%] md:w-[17%] md:h-[21%] absolute md:-translate-x-[51%] xs: w-[32%] xs: left-[32%]">
          <img
            className="object-cover w-full h-full"
            src={
              watchDetailsData[ComponentTypeName.STRAP]?.primaryImage ||
              selectedStrap.image.top
            }
            alt="strap"
          />
        </div> */}
        <button
          onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.STRAP))
          }
          className=" md:left-[50%] top-[0.5%] md:w-[17%] md:h-[21%] absolute md:-translate-x-[51%] xs: w-[32%] xs: left-[32%]"
        >
          <img
            className="object-cover w-full h-full"
            src={
              selectedSubComponentData[ComponentTypeName.STRAP]?.primaryImage ||
              selectedStrap.image.top
            }
            alt="strap"
          />
        </button>
        
        {/* DIAL */}
        {/* <div onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.DIALS))
          } className="md:left-[50%] md:w-[29%] md:top-[38%] absolute md:-translate-x-[51%]  md:-translate-y-[50%] xs: w-[50%] xs: left-[23%] xs: top-[24%]">
          <img
            className="object-cover w-full h-full"
            src={
              watchDetailsData[ComponentTypeName.DIALS]?.primaryImage ||
              selectedDial.image
            }
            alt="dial"
          />
        </div> */}
        <button
          onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.DIALS))
          }
          className="md:left-[50%] md:w-[29%] md:top-[38%] absolute md:-translate-x-[51%]  md:-translate-y-[50%] xs: w-[50%] xs: left-[23%] xs: top-[24%]"
        >
          <img
            className="object-cover w-full h-full"
            src={
              selectedSubComponentData[ComponentTypeName.DIALS]?.primaryImage ||
              selectedDial.image
            }
            alt="dial"
          />
        </button>

        {/* CASE */}
        {/* <div onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.CASE))
          } className="md:left-[51%] md:w-[35%] md:top-[15.5%] absolute md:-translate-x-1/2 z-50 xs: w-[60%] xs: top-[18.5%] ">
          <img
            className="object-cover w-full h-full"
            src={
              watchDetailsData[ComponentTypeName.CASE]?.primaryImage ||
              selectedCase.image
            }
            alt="case"
          />
        </div> */}
        <button
          onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.CASE))
          }
          className="md:left-[51%] md:w-[35%] md:top-[15.5%] absolute md:-translate-x-1/2 z-50 xs: w-[60%] xs: top-[18.5%] "
        >
          <img
            className="object-cover w-full h-full"
            src={
              selectedSubComponentData[ComponentTypeName.CASE]?.primaryImage ||
              selectedCase.image
            }
            alt="case"
          />
        </button>

        {/* BOTTOM STRAP */}
        {/* <div onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.STRAP))
          } className="md:left-[50%] md:w-[17%] md:h-[21%] md:bottom-[25.5%] absolute md:-translate-x-[51%] xs: w-[32%] xs: bottom-[17.5%] xs: left-[32%]">
          <img
            className="object-cover w-full h-full"
            src={
              selectedSubComponentData[ComponentTypeName.STRAP]
                ?.secondaryImage || selectedStrap.image.bottom
            }
            alt="strap"
          />
        </div> */}
        <button
          onClick={() =>
            dispatch(setWatchComponentType(ComponentTypeName.STRAP))
          }
          className="md:left-[50%] md:w-[17%] md:h-[21%] md:bottom-[25.5%] absolute md:-translate-x-[51%] xs: w-[32%] xs: bottom-[17.5%] xs: left-[32%]"
        >
          <img
            className="object-cover w-full h-full"
            src={
              selectedSubComponentData[ComponentTypeName.STRAP]
                ?.secondaryImage || selectedStrap.image.bottom
            }
            alt="strap"
          />
        </button>

        {showColors && (
          <div
          style={{
            background: `${
              selectedSubComponentData[ComponentTypeName.STRAP]?.componentName
            }`,
          }}
            className="w-8 h-8 rounded-full border-[1px] border-[#dfdbdb] absolute bottom-24 left-[55%]"
          />
        )}
      </div>
    </div>
  );
};

export default WatchPanels;
