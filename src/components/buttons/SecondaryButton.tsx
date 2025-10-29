import styles from "../../styles/components/buttons/secondary-button/base.module.scss";

interface ButtonProps {
    text?: string;
    onClick: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({
    text,
    onClick,
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
        >
            <span className={styles.buttonText}>{text}</span>
        </button>

    );
};

export default SecondaryButton;