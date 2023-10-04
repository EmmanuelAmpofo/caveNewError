import { useNavigate } from "react-router";
import Logo from "../../assets/cavemane logo.png";
import PrimaryButton from "../../utils/shared/PrimaryButton";
import AuthInput from "../../utils/shared/AuthInput";
import { useState} from "react";
import { toast } from "react-toastify";
import API, { loginUrl } from "../../utils/endpoints/endpoint";
import { routerPath } from "../../utils/router/Router";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../store/feature/userFeature/index";
import GoogleAuthLogin from "../../components/google/GoogleAuthLogin"
import Loader from "../../utils/shared/Loader";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const centerItems = "flex items-center justify-center";

  const [authInput, setAuthInput] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState<string[]>([])
  
  const [isLoading, setIsLoading] = useState(false);

  const authLogin = (updatedInput: { id: string; value: string }) => {
    const { id, value } = updatedInput;
    setAuthInput((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (id === "email") {
      setEmailError("");
    } else if (id === "password") {
      setPasswordError("");
    }
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
  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      return "Password must contain at least 6 characters including one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    return "";
  };
  const handleLogin = (): void => {
    const emailError = validateEmail(authInput.email);
    const passwordError = validatePassword(authInput.password);
    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      setIsLoading(true)
      const credentials = {
        emailAddress: authInput.email,
        password: authInput.password,
      };
      API.post(loginUrl, credentials)
        .then((response) => {
          if (response.data.status === 'success') {
            // localStorage.setItem("authToken", response.data.data["bearerToken"]);
            const userData = response.data.data
            dispatch(addUserDetails({...userData, authToken: userData.bearerToken}) )
            setIsLoading(false)
            toast.success(`Login successful `, {
              position: "top-right",
            });
            setTimeout(() => {
              // navigate(routerPath.CUSTOMIZATION);
              navigate(routerPath.SELECTWATCHTYPE);
            }, 2000);
          } 
          if(response.data.status === "error"){
            setIsLoading(false)
            toast.error(`Login Failed, please check credentials and try again.`, {
              position: 'top-right'
            })
          }
        })
        .catch(error => {
          setIsLoading(false)
          toast.error(error.response.data.data.message, {
            position: 'top-right'
          })
          loginError.length === 2 ? navigate(routerPath.FORGOTPASSWORD): ''
          setLoginError([...loginError, 'error'])
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
        <div className="w-full xs: md:w-1/3">
          <div className="md:p-12 xs: p-4 rounded-[40px] bg-white w-full">
            <p className={`${centerItems} text-[30px] font-bold mb-2 `}>
              Login
            </p>
            <AuthInput
              id={"email"}
              placeholder={"Email"}
              type="email"
              value={authInput.email}
              onChange={authLogin}
            />
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            <AuthInput
              id="password"
              placeholder={"Password"}
              onChange={authLogin}
              value={authInput.password}
              type="password"
            />
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
            <p className="text-xs text-[#29398a] cursor-pointer" onClick={()=> {navigate(routerPath.FORGOTPASSWORD)}}>Forgot password?</p>
            <div>
              <PrimaryButton
                className="bg-[#29398a] text-white w-full mt-4 h-[35px] rounded-lg"
                onClick={handleLogin}
              >
                {isLoading ? (
                  <Loader/>
                ) : (
                  <p>Login</p>
                )}
              </PrimaryButton>
              <p className="text-sm text-[#29398a] mt-4 cursor-pointer">
                Dont have an account yet
              </p>
              <PrimaryButton
                className="bg-[#8b8b8b] text-white w-full h-[35px] rounded-lg my-2"
                onClick={()=>{navigate(routerPath.SIGNUP)}}
              >
                Create Account
              </PrimaryButton>
              {/* <PrimaryButton
                className="bg-[#f33130] text-white w-full h-[35px] rounded-lg my-4"
                onClick={()=>{}}
              >
                Continue with Google
              </PrimaryButton> */}
              
              <GoogleAuthLogin/>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
