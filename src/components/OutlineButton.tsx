import "../styles/components/outline-button/base.scss";

interface OutlineButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ text, onClick, className }) => {
    return (
        <button 
            className={`outline-button ${className || ''}`}
            onClick={onClick}
        >
            <span className="button-text">{text}</span>
        </button>
    );
};

export default OutlineButton;
