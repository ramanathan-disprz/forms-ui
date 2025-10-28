import styles from "@/styles/components/buttons/outline-solid-button/base.module.scss";

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const OutlineSolidButton: React.FC<ButtonProps> = ({
    text,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.buttonText}>{text}</span>
        </button>

    );
};

export default OutlineSolidButton;