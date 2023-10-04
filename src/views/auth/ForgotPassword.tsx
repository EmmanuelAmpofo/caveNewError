import Logo from "../../assets/cavemane logo.png";
import AuthInput from "../../utils/shared/AuthInput";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import { toast } from "react-toastify";
import "../../styles/AppCustomCSS.css";
import API, { forgotPassword } from "../../utils/endpoints/endpoint";
import Loader from "../../utils/shared/Loader";

import { useState } from "react";

import { useNavigate } from "react-router";
import { routerPath } from "../../utils/router/Router";

const ForgotPassword = () => {
  const centerItems = "flex justify-center items-center";
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [forgotInput, setForgotInput] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();
  const showPassword = () => {
    setVisiblePassword(visiblePassword ? false : true);
  };
  const verifyPassword = (updatedInput: { id: string; value: string }) => {
    const { id, value } = updatedInput;

    setForgotInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";

    // Email validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format";
    }

    return "";
  };

  const handleForgotPasword = () => {
    const emailError = validateEmail(forgotInput.email);
    setEmailError(emailError);
    if (!emailError) {
      setIsLoading(true);
      const credentials = {
        emailAddress: forgotInput.email,
        newPassword: forgotInput.newPassword,
        confirmNewPassword: forgotInput.confirmPassword,
      };
      API.post(forgotPassword, credentials)
        .then((response) => {
          if (response.data.status === "success") {

            setIsLoading(false);
            localStorage.setItem(
              "user_email",
              response.data.data.emailAddress
            );
            toast.success(
              `Success. Please check your email for verification code.`,
              {
                position: "top-right",
              }
            );
            setTimeout(() => {
              navigate(routerPath.VERIFICATION);
            }, 1000);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.response.data.data.message, {
            position: "top-right",
          });
        });
    }
  };

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
              Reset Password
            </p>
            <AuthInput
              id={"email"}
              placeholder={"Email"}
              type="email"
              value={forgotInput.email}
              onChange={verifyPassword}
              className=""
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            <AuthInput
              id={"newPassword"}
              placeholder={"New Password"}
              type={visiblePassword ? "text" : "password"}
              value={forgotInput.newPassword}
              onChange={verifyPassword}
              className=""
            />
            <AuthInput
              id={"confirmPassword"}
              placeholder={"Confirm Password"}
              type={visiblePassword ? "text" : "password"}
              value={forgotInput.confirmPassword}
              onChange={verifyPassword}
              className=""
            />
            <p className="flex items-center text-[13px] gap-1">
              <input
                type="checkbox"
                name="showPassword"
                id="show"
                onClick={showPassword}
              />
              <p>show password</p>
            </p>

            <div>
              <PrimaryButton
                className="bg-[#29398a] text-white w-full mt-4 h-[35px] rounded-lg"
                onClick={handleForgotPasword}
              >
                {isLoading ? (
                  <Loader/>
                ) : (
                  <p>Submit</p>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
