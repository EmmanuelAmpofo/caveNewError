import { PrimaryButtonProps } from "../helpers/interfaces/InputProps";
import "../../styles/AppCustomCSS.css"

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  className,
  children,
}: PrimaryButtonProps) => {

  

  return (
    <button onClick={onClick} className={className}> 
        {children}
    </button>
  );
};

export default PrimaryButton;
