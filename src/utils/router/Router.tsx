import Customization from "../../views/home/HomeView";
import Login from "../../views/auth/Login"
import SingUp from "../../views/auth/SignUp"
import Verification from "../../views/auth/Verification";
import ForgotPassword from "../../views/auth/ForgotPassword";
import SelectWatchType from "../../views/home/SelectWatchType";
export const routerPath= {
    HOME:"/",
    FORGOTPASSWORD: '/forgot-password',
    CUSTOMIZATION: "/customization",
    SIGNUP: '/signup',
    VERIFICATION: '/verification',
    SELECTWATCHTYPE: '/select-your-watch'
}

export const appRoutes = [
    {
        path: routerPath.HOME,
        element: <Login />
    },
    {
        path: routerPath.CUSTOMIZATION,
        element: <Customization />
    },
    {
          path: routerPath.SIGNUP,
          element: <SingUp />
    },
    {
        path: routerPath.VERIFICATION,
        element: <Verification />
    },
    {
        path:routerPath.FORGOTPASSWORD ,
        element: <ForgotPassword />
    },
    {
        path: routerPath.SELECTWATCHTYPE,
        element: <SelectWatchType />
    }
]