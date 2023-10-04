import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/cavemane logo.png";
import { useNavigate } from "react-router-dom";
import { routerPath } from "../../utils/router/Router";
import { FiEdit } from "react-icons/fi";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { RiCloseLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { IoIosPhonePortrait, IoMdClose } from "react-icons/Io";
import {
  HiOutlineMail,
  HiOutlinePlusCircle,
  HiOutlineSaveAs,
} from "react-icons/Hi";
import { ImLocation } from "react-icons/Im";
import ProfileImage from "../../assets/profile.jpg";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import API, {
  getUserProfile,
  updateUserProfile,
} from "../../utils/endpoints/endpoint";
import { UserData } from "../../utils/helpers/interfaces/InputProps";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { toast } from "react-toastify";
import Loader from "../../utils/shared/Loader";
import MapComponent from  "../google/MapComponent"

const initialUserData: UserData = {
  emailAddress: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  // physicalAddress: null,
  shippingAddress: "",
  // gpsCode: null,
  profilePicture: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
  height: "65%",
  border: "none",
  p: 4,
  "@media (max-width: 600px)": {
    width: "90%",
    height: "80%",
  },
};

const TopBar = () => {
  const navigate = useNavigate();
  const selector = useSelector((store) => store.userReducer);

  const centerItems = " flex items-center";

  const [activeProfile, setIsActiveprofile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const locationRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API,
    libraries: ["places"],
  });
  const centerMap = { lat: 5.614818, lng: -0.205874 };

  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (): void => {
    setIsActiveprofile(true);
  };

  const handleLoginClick = (): void => {
    navigate(routerPath.HOME);
  };

  const handleEditUserDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };
  const handleCloseProfile = () => {
    setIsEditing(false);
    setIsActiveprofile(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate(routerPath.HOME);
    location.reload();
  };


  const saveProfileUpdate = () => {
    const payload = {
      emailAddress: userData.emailAddress,
      phoneNumber: userData.phoneNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
      shippingAddress: userData.shippingAddress,
      profilePicture: "https://picsum.photos/200/300",
    };
    setIsLoading(true);
    API.put(updateUserProfile, payload)
      .then((response) => {
        console.log("response", response);
        if (response.data.status === "success") {
          setIsLoading(false);
          toast.success(`Profile updated successfully`, {
            position: "top-right",
          });
        }
      })
      .catch();
  };

  useEffect(() => {
    API.get(getUserProfile + selector.emailAddress)
      .then((response) => {
        if (response.data.status === "success") {
          const userInfo = response.data.data;
          setUserData(userInfo);
          // console.log("user info", userInfo);
        }
      })
      .catch();
  }, []);

  if (!isLoaded) {
    return <>{isLoading}</>;
  }

  return (
    <div className={`${centerItems} justify-between w-full h-[100px] md:px-40`}>
      <div className={`${centerItems} md:justify-end md: pl-4 w-1/2`}>
        <img
          src={Logo}
          alt="caveman_logo"
          className="md:h-[80px] cursor-pointer xs: h-[60px] "
        />
      </div>

      <div
        className={`${centerItems} justify-end font-medium w-1/2 px-6 cursor-pointer`}
      >
        {selector.fullName ? (
          <div>
            <img
              src={ProfileImage}
              alt="profile"
              onClick={handleClick}
              className="object-cover w-[50px] h-[50px] border-2 border-black rounded-full"
            />
          </div>
        ) : (
          <span onClick={handleLoginClick}>LOGIN</span>
        )}
      </div>
      {activeProfile && (
        <div className=" w-[270px] p-2 absolute z-50 top-[0px] md:right-[100px] xs: right-[0px] bg-white">
          <p className="flex justify-end">
            <IoMdClose
              onClick={handleCloseProfile}
              className="cursor-pointer"
            />
          </p>
          <div className={`${centerItems} justify-between mb-4`}>
            <div className="ml-8">
              <img
                src={ProfileImage}
                alt="profile"
                className="object-cover w-[50px] h-[50px] border-2 border-black rounded-full"
              />
            </div>
            <div className="text-lg font-bold">My Profile</div>
            <div className="mr-4">
              <FiEdit
                className="cursor-pointer"
                onClick={handleEditProfile}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={`${centerItems} mt-2 h-[30px] rounded-full px-4 bg-white`}
            >
              <CgProfile className="mr-2 w-[20px] h-[20px]" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Name"
                name="firstName"
                value={`${userData.firstName} ${userData.lastName} `}
                onChange={handleEditUserDataChange}
                disabled={!isEditing}
              />
            </div>
            <div
              className={`${centerItems} mt-2 h-[30px] rounded-full px-4 bg-white`}
            >
              <IoIosPhonePortrait className="mr-2 w-[20px] h-[20px]" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Phone"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleEditUserDataChange}
                disabled={!isEditing}
              />
            </div>

            <div
              className={`${centerItems} mt-2 h-[30px] rounded-full px-4 bg-white`}
            >
              <HiOutlineMail className="mr-2 w-[20px] h-[20px]" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Email"
                name="emailAddress"
                value={userData.emailAddress}
                onChange={handleEditUserDataChange}
                disabled={!isEditing}
              />
            </div>

            <div
              className={`${centerItems} justify-between rounded-full px-4 py-2 mt-2 h-[30px] bg-transparent flex items-center`}
            >
              <div className={`${centerItems}`}>
                <ImLocation className="mr-2" />{" "}
                <input
                  className="w-full bg-white outline-none"
                  placeholder="Location"
                  name="shippingAddress"
                  value={userData.shippingAddress}
                  onChange={handleEditUserDataChange}
                  disabled={!isEditing}
                />
              </div>

              <HiOutlinePlusCircle
                className="bg-white rounded-full cursor-pointer"
                onClick={isEditing ? handleOpen : () => {}}
              />
            </div>
          </div>

          <div className="flex px-4 my-6">
            {isEditing ? (
              <div
                className=""
                onClick={saveProfileUpdate}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="flex items-center cursor-pointer">
                    <HiOutlineSaveAs className="mr-2 w-[20px] h-[20px]" />
                    <div>Save</div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                <CgLogOut className="w-[20px] h-[20px]"/>
                <div>Logout</div>
              </div>
            )}
          </div>

          <Modal
            sx={{ overflow: "auto" }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="">
                <div className="flex justify-end">
                  <RiCloseLine
                    className="border rounded-full w-[20px] h-[20px] text-[#b4b4b4] drop-shadow-sm cursor-pointer font-bold"
                    onClick={handleClose}
                  />
                </div>
                <p className="text-[25px] flex justify-center">My Address</p>
                <MapComponent />
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default TopBar;
