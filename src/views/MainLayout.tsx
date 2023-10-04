import TopBar from "../components/topbar/TopBar";
import { useLocation } from "react-router";
import { routerPath } from "../utils/router/Router";
import {useState, useEffect} from "react"

const MainLayout = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [truePath, setTruePath] = useState(false)
  useEffect(() => {
    if (
      currentPath === routerPath.HOME ||
      currentPath === routerPath.SIGNUP ||
      currentPath === routerPath.VERIFICATION ||
      currentPath === routerPath.FORGOTPASSWORD
    ) {
      setTruePath(true);
    } else {
      setTruePath(false);
    }
  }, [currentPath]);
  return (
    <div>
      {truePath ? "" : <TopBar />}
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
