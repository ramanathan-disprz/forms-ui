import "../styles/components/secondary-button/base.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({
    text,
    onClick,
}) => {
    return (
        <button
            className="secondary-button"
            onClick={onClick}
        >
            <span className="button-text">{text}</span>
        </button>

    );
};

export default SecondaryButton;