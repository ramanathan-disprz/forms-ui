import "../styles/components/primary-button/base.scss"

interface ButtonProps {
    text: string;
    onClick: () => void;
    //   className?: string;
    //   disabled?: boolean;
    //   icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
}) => {
    return (
        <button
            className="primary-button"
            onClick={onClick}
        >
            <span className="button-text">{text}</span>
        </button>
    );
};

export default Button;