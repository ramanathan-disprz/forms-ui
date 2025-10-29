import styles from "../../styles/components/buttons/secondary-button/base.module.scss";

interface ButtonProps {
    text?: string;
    onClick: () => void;
    color?: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({
    text,
    onClick,
    color = "#3AB876", // Default color
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                borderColor: color,
                backgroundColor: `${color}26`, // 26 is hex for ~15% opacity
            }}
        >
            <span
                className={styles.buttonText}
                style={{ color: color }}
            >
                {text}
            </span>
        </button>
    );
};

export default SecondaryButton;
