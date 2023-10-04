import {GoogleLogin} from "@react-oauth/google"
const GoogleAuthLogin = () => {
  const handleSuccessLogin = (response: any) => {
    console.log(response);
  };
  // const handleErrorLogin = (error: any) => {
  //   console.log(error);
  // };
 
  return (
    <div className="mt-2">
      <GoogleLogin onSuccess={handleSuccessLogin}  />
    </div>
  );
};

export default GoogleAuthLogin;
