import Logo from "../../assets/cavemane logo.png";
import AuthInput from "../../utils/shared/AuthInput";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import { toast } from "react-toastify";
import "../../styles/AppCustomCSS.css"
import API, {verificationUrl, sendTokenUrl} from "../../utils/endpoints/endpoint"
import Loader from "../../utils/shared/Loader";

import { useState } from "react";
import { useNavigate } from "react-router";
import { routerPath } from "../../utils/router/Router";

const Verification = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const centerItems = "flex justify-center items-center";
  const [verifyInput, setVerifyInput] = useState({
    code: "",
  });

  const navigate = useNavigate()
  const verifyUser = (updatedInput: { id: string; value: string }) => {
    const { id, value } = updatedInput;

    setVerifyInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitVerification = (): void => {
    if (verifyInput.code !== "") {
      setIsLoading(true)
      const getEmail = localStorage.getItem('user_email')
      const verifiedCode = {
        emailAddress: getEmail,
        token: verifyInput.code
      }
      API
      .post(verificationUrl, verifiedCode)
      .then(response => {
        if(response.status === 200){
          setIsLoading(false)
          toast.success("Verification successful.", {
            position: "top-right",
          });
          setTimeout(() => {
            navigate(routerPath.HOME)
          }, 1000)
        } else if(response.data.status === 'error'){
          setIsLoading(false)
          toast.error(response.data.data.message, {
            position: 'top-right'
          })
        }
      })
      .catch(error => {
        setIsLoading(false);
        toast.error(error.response.data.data.message, {
          position: 'top-right'
        })
      })
      
    } else if (verifyInput.code === "") {
      toast.error(`Please enter a valid verification code`, {
        position: "top-right",
      });
    }
  };
  const resendToken = () => {
    setIsLoading(true)
      const getEmail = localStorage.getItem('user_email')
      const verifiedEmail = {
        emailAddress: getEmail,
      }
      API
      .post(sendTokenUrl, verifiedEmail)
      .then(response => {
        if(response.data.status === 'success'){
          setIsLoading(false)
          toast.success("Verification code sent successfully. Please check you email.", {
            position: "top-right",
          });
        } 
      })
      .catch()
    }
  
  return (
    <div className={`${centerItems} md:h-screen xs: p-4 `}>
      <div
        className={`${centerItems} gap-6 w-full md:mx-20 md:flex-row xs: flex-col`}
      >
        <div className={`${centerItems} flex-col md:w-2/3 xs: w-full`}>
          <div className={`${centerItems}`}>
            <img
              src={Logo}
              alt="company logo"
              className="object-contain w-[220px] h-[220px]"
            />
          </div>
        </div>
        <div className="w-full xs: md:w-1/3">
          <div className="md:p-12 xs: p-4 rounded-[40px] bg-white w-full">
            <p className={`${centerItems} text-[30px] font-bold mb-2 `}>
              Verification Code
            </p>
            <AuthInput
              id={"code"}
              placeholder={"Code"}
              type="email"
              value={verifyInput.code}
              onChange={verifyUser}
              className="text-center text-[30px] font-bold code"
            />

            <div>
              <PrimaryButton
                className="bg-[#29398a] text-white w-full mt-4 h-[35px] rounded-lg"
                onClick={submitVerification}
              >
                Submit
              </PrimaryButton>
              <div className="mt-4 text-sm ">
                I did not receive any code.{" "}
                <span className="text-[#416eb3] cursor-pointer" onClick={resendToken}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <span>Resend</span>
                )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
