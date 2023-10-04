import { useState } from "react";
import Logo from "../../assets/Watch_images/cavemane logo.png";
import AuthInput from "../../utils/shared/AuthInput";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import { useNavigate } from "react-router";
import API, { signUpUrl } from "../../utils/endpoints/endpoint";
import { toast } from "react-toastify";
import "../../styles/AppCustomCSS.css";
import { routerPath } from "../../utils/router/Router";
import Loader from "../../utils/shared/Loader";

const SignUp = () => {
  const centerItems = " flex items-center justify-center ";
  const navigate = useNavigate();

  const [authInput, setAuthInput] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsCheckedError, setTermsCheckedError] = useState("");

  const authSignUp = (updatedInput: { id: string; value: string }) => {
    const { id, value } = updatedInput;

    setAuthInput((prev) => ({
      ...prev,
      [id]: value,
    }));
    switch (id) {
      case "email":
        setEmailError("");
        break;
      case "firstname":
        setFirstnameError("");
        break;
      case "lastname":
        setLastnameError("");
        break;
      case "password":
        setPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPasswordError("");
        break;
      default:
        break;
    }
  };

  const validateEmail = (email: string): [string, boolean] => {
    if (!email) {
      return ["Email is required", false];
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return ["Invalid email format", false];
    }

    return [email, true];
  };

  const validatePassword = (password: string): [string, boolean] => {
    if (!password) {
      return ["Password is required", false];
    }

    if (password.length < 6) {
      return ["Password should be at least 6 characters long", false];
    }

    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (
      !(
        uppercasePattern.test(password) &&
        lowercasePattern.test(password) &&
        digitPattern.test(password) &&
        specialCharPattern.test(password)
      )
    ) {
      return [
        "Password should include at least one uppercase letter, one lowercase letter, one digit, and one special character",
        false,
      ];
    }

    return [password, true];
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    if (cleanPhoneNumber.length !== 10) {
      return false;
    }
    return true;
  };

  const validateSignUp = () => {
    let valid = true;

    const emailError = validateEmail(authInput.email);
    const passwordError = validatePassword(authInput.password);
    const phoneNumberError = validatePhoneNumber(authInput.phoneNumber);

    if (!authInput.firstname) {
      setFirstnameError("First Name is required");
      valid = false;
    }
    if (!emailError[1]) {
      setEmailError(emailError[0] as string);
      valid = false;
    } else {
      setEmailError("");
    }
    if (!passwordError[1]) {
      setPasswordError(passwordError[0] as string);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!authInput.lastname) {
      setLastnameError("Last Name is required");
      valid = false;
    }

    if (authInput.password !== authInput.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }
    if (phoneNumberError) {
      setPhoneNumberError("Phone number should not be less than 10");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!termsChecked) {
      setTermsCheckedError("Please agree to our terms and conditions.");
      valid = false;
    } else {
      setTermsCheckedError("");
    }
    return valid;
  };

  const handleSignUp = () => {
    const isValid = validateSignUp();

    if (isValid) {
      setIsLoading(true);

      const signUpCredentials = {
        emailAddress: authInput.email,
        phoneNumner: authInput.phoneNumber.replace(/\D/g, ""),
        firstName: authInput.firstname,
        lastName: authInput.lastname,
        password: authInput.password,
        confirmPassword: authInput.confirmPassword,
      };
      API.post(signUpUrl, signUpCredentials)
        .then((response) => {
          if (response.data.status === "success") {
            setIsLoading(false);
            localStorage.setItem(
              "user_email",
              response.data.data.userEmailAddress
            );
            toast.success(
              `Sign up successful. Please check your email for verification code.`,
              {
                position: "top-right",
              }
            );
            setTimeout(() => {
              navigate(routerPath.VERIFICATION);
            }, 1000);
          }
          if (response.data.status === "error") {
            setIsLoading(false);
            toast.error(`Error!, please check the credentials and try again.`, {
              position: "top-right",
            });
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
        className={`${centerItems} gap-6 w-full mx-20 md:flex-row xs: flex-col`}
      >
        <div className={`${centerItems} flex-col md:w-2/3 xs: w-full`}>
          <div className={`${centerItems}`}>
            <img src={Logo} alt="caveman-logo" />
          </div>
          <p className="md:text-[30px] xs: text-[20px] font-bold">
            Welcome to Caveman Build Your Watch
          </p>
          <p className="font-medium w-[700px] flex items-center justify-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse
            nostrum reiciendis dolor, deserunt eveniet dolorem beatae accusamus
            natus. Omnis voluptate ut id voluptatum itaque exercitationem sint
            quae quo maiores.
          </p>
        </div>
        <div className="w-full md:w-1/3 xs:">
          <div className="md:p-12 xs: p-4 xs: w-full rounded-[40px] bg-white md:w-[420px]">
            <p className={`${centerItems} text-[30px] font-bold mb-2`}>
              Sign Up
            </p>
            <AuthInput
              id="email"
              placeholder="Email"
              onChange={authSignUp}
              value={authInput.email}
              type="email"
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            <AuthInput
              id="firstname"
              placeholder="First Name"
              onChange={authSignUp}
              value={authInput.firstname}
              type="text"
            />
            {firstnameError && (
              <p className="text-xs text-red-500">{firstnameError}</p>
            )}
            <AuthInput
              id="lastname"
              placeholder="Last Name"
              onChange={authSignUp}
              value={authInput.lastname}
              type="text"
            />
            {lastnameError && (
              <p className="text-xs text-red-500">{lastnameError}</p>
            )}
            <AuthInput
              id="phoneNumber"
              placeholder="Phone number"
              onChange={authSignUp}
              value={authInput.phoneNumber}
              type="text"
            />
            {phoneNumberError && (
              <p className="text-xs text-red-500">{phoneNumberError}</p>
            )}
            <AuthInput
              id="password"
              placeholder={"Password"}
              onChange={authSignUp}
              value={authInput.password}
              type="password"
            />
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
            <AuthInput
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={authSignUp}
              value={authInput.confirmPassword}
              type="password"
            />
            {confirmPasswordError && (
              <p className="text-xs text-red-500">{confirmPasswordError}</p>
            )}
            <p className="text-xs">
              Password should be 5 to 8 characters long and a minimum of one
              capital letter, one small letter, one number and special character
              should be used
            </p>
            <div className="flex gap-2 my-2">
              <input
                type="checkbox"
                checked={termsChecked}
                onClick={() => setTermsChecked((prev) => !prev)}
              />
              <p className="text-xs">
                I agree and accept the{" "}
                <span className="font-medium text-[#29398a]">
                  terms and conditions
                </span>
              </p>
            </div>
            {termsCheckedError && (
              <p className="text-xs text-red-500">{termsCheckedError}</p>
            )}
            <div className="">
              <PrimaryButton
                className="bg-[#29398a] text-white w-full h-[35px] rounded-lg my-2"
                onClick={handleSignUp}
              >
                {isLoading ? (
                  <Loader/>
                ) : (
                  <p>Sign Up</p>
                )}
              </PrimaryButton>

              <p className="mt-4 text-sm ">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    navigate(routerPath.HOME);
                  }}
                  className="text-sm text-[#29398a] cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
