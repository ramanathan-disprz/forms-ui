import styles from '../../styles/components/buttons/outline-button/base.module.scss';

interface OutlineButtonProps {
    text?: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
    text, onClick, className, disabled }) => {
    return (
        <button
            disabled={disabled}
            className={`${styles.outlineButton} ${className || ''} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
        >
            <span className={styles.buttonText}>{text}</span>
        </button>
    );
};

export default OutlineButton;
