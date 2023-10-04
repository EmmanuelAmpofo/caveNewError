import { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import Loader from "../../utils/shared/Loader";

const Location = () => {
  const [latitude, setLatitude] = useState(9.4778122);
  const [longitude, setLongitude] = useState(-0.88135407);
  const placesLibrary = ["places"];

  const centerItems = " flex items-center";
  const alignCenter = "flex justify-center";

  async function getLocation() {
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
      } catch (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
          default:
            console.error("An error occurred: " + error.message);
        }
      }
    } else {
      
      console.error("Geolocation is not available in your browser.");
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API, // Replace with your API key
    libraries: placesLibrary,
  });

  const onPlaceChanged = (place) => {
    setLongitude(place.geometry.location.lng());
    setLatitude(place.geometry.location.lat());
    console.log("lat", place.geometry.location.lat());
    console.log("lng", place.geometry.location.lng());
  };

  if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div id="searchColumn" className={`${alignCenter}`}>
        <AutoComplete
          apiKey={`${import.meta.env.VITE_APP_GOOGLE_MAPS_API}`}
          onPlaceSelected={(place) => onPlaceChanged(place)}
          placeholder="My location"
          className={`${centerItems} mt-2 mb-6 border h-[40px] w-[300px] rounded-full px-4 outline-none bg-[#e9e9e9]`}
        />
      </div>

      <div id="mapContainer" className=" h-[250px] w-full">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{
            lat: latitude, // Initial latitude
            lng: longitude, // Initial longitude
          }}
          zoom={14}
        >
          <MarkerF position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </div>
      <div className={`${alignCenter}`}>
        <PrimaryButton
          onClick={() => {}}
          className="bg-[#29398a] text-white w-[250px] mt-6  h-[40px] rounded-full"
        >
          Confirm Location
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Location;