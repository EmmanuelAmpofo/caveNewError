type SubTypeButttonProps = {
    text: string;
    clickHandler?: () => void;
}

type ColorButtonProps = {
    color: string;
    clickHandler?: () => void;
}

export const SubTypeButton = ({ text, clickHandler }: SubTypeButttonProps) => (
    <button
        className="bg-[#dfdbdb]  focus:bg-white text-[#0a0a0a] font-extrabold py-2 px-4 rounded-xl"
        onClick={clickHandler}
    >
        {text}
    </button>
)

export const ColorButton = ({ color, clickHandler }: ColorButtonProps) => {
    const buttonStyle: React.CSSProperties = {
        backgroundColor: color,
        width: "2rem",
        height: "2rem",
        cursor: "pointer",
        border: "5px solid #dfdbdb",
    }

    return(
        <button onClick={clickHandler} >
            <div style={buttonStyle} ></div>
        </button>
    )
}