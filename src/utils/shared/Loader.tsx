import "../../styles/AppCustomCSS.css";
const Loader = () => {
  return (
    <div className="flex justify-center">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loader;
