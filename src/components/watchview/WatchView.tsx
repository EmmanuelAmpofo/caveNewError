import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { DIALS, CASE, STRAP } from "../../utils/shared/MockData";
import WatchPanels, { ComponentTypeName } from "./WatchPanels";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import { ColorButton, SubTypeButton } from "./Watchview.partials";
import { MdArrowForwardIos } from "react-icons/md";
import {
  getWatchDetailsData,
  getSubComponentTypeData,
  setUserSelectData,
  setSelectedCaseType,
} from "../../store/feature/watchFeature";


const WatchView = () => {
  const [userDial, setUserDial] = useState(DIALS[1]);
  const [userStrap, setUserStrap] = useState(STRAP[0]);
  const [userCase, setUserCase] = useState(CASE[0]);
 const {
  watchDetailsData,
  componentType,
  componentSubType,
  userSubComponentType,
  selectedSubComponentData,
  showColors,
} = useSelector((state) => state.watchDataReducer);
  const dispatch = useDispatch();


  // ...

  useEffect(() => {
    dispatch(getWatchDetailsData());
  }, []);

  return (
    <div className="flex flex-col mt-8 border border-red-300 -2 md:flex-row md:mt-16 xs:">
      <div className="flex justify-center border-2 border-blue-300 md:w-1/2">
        <WatchPanels
          selectedCase={userCase}
          selectedDial={userDial}
          selectedStrap={userStrap}
        />

<div className="flex justify-between gap-8">
          {componentType === ComponentTypeName.DIALS
            ? watchDetailsData[componentType][1]?.componentsDetail?.map(
                (item, index: number) => (
                  <React.Fragment key={`${index}-watch-data`}>
                    <SubTypeButton
                      clickHandler={() =>
                        dispatch(
                          setSelectedCaseType(
                            watchDetailsData[componentType][0]
                          )
                        )
                      }
                      text={item?.componentName}
                    />
                    {index !==
                      watchDetailsData[componentType][1]?.componentsDetail
                        .length -
                        1 && <div className="border-r-4 border-[#0a0a0a]" />}
                  </React.Fragment>
                )
              )
            : watchDetailsData[componentType]?.map((item, index: number) => (
                <React.Fragment key={`${index}-watch-data`}>
                  <SubTypeButton
                    clickHandler={() =>
                      dispatch(getSubComponentTypeData(item?.componentSubType))
                    }
                    text={item?.componentSubType}
                  />
                  {index !== watchDetailsData[componentType].length - 1 && (
                    <div className="border-r-4 border-[#0a0a0a]" />
                  )}
                </React.Fragment>
              ))}
        </div>

        <div className="flex gap-4 mt-8">
          {Array.isArray(componentSubType) &&
            showColors &&
            componentSubType?.map((itemData) =>
              itemData?.componentsDetail?.map((innerItem) => (
                <ColorButton
                  key={innerItem.componentName}
                  clickHandler={() => dispatch(setUserSelectData(innerItem))}
                  color={innerItem.componentName}
                />
              ))
            )}
        </div>
      </div>
      <div className="hidden border-2 border-green-300 md:block md:w-1/2 xs:">
        <p className="mb-4 text-lg font-bold uppercase md:mb-20 xs:">Details</p>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 font-bold uppercase">Case color</p>
          <p>
            {selectedSubComponentData[ComponentTypeName.CASE]?.componentName ||
              "-"}
          </p>
        </div>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 font-bold uppercase">Dial color</p>
          <p>
            {selectedSubComponentData[ComponentTypeName.DIALS]?.componentName ||
              "-"}
          </p>
        </div>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 font-bold uppercase">Strap type</p>
          <p>{userSubComponentType[ComponentTypeName.STRAP] || "-"}</p>
        </div>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 font-bold uppercase">Strap color</p>
          <p>
            {selectedSubComponentData[ComponentTypeName.STRAP]?.componentName ||
              "-"}
          </p>
        </div>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 font-bold uppercase">
            Dial markings
          </p>
          <p>-</p>
        </div>
        <div className="flex py-4 border-b-2 ">
          <p className="items-center w-1/2 text-lg font-bold uppercase">
            Total Cost
          </p>
          <p className="font-bold">
            Gh<span>&#8373;</span>10,000
          </p>
        </div>
        <div>
          <PrimaryButton
            className="flex items-center bg-[#dfdbdb] rounded-lg font-bold text-lg w-[120px] py-1 px-2 justify-between mt-12"
            onClick={() => {
              console.log("something");
            }}
          >
            <p>Preview</p> <MdArrowForwardIos className="text-lg font-bold" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default WatchView;
