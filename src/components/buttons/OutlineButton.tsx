import styles from '../../styles/components/buttons/outline-button/base.module.scss';

interface OutlineButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ text, onClick, className }) => {
    return (
        <button
            className={`${styles.outlineButton} ${className || ''}`}
            onClick={onClick}
        >
            <span className={styles.buttonText}>{text}</span>
        </button>
    );
};

export default OutlineButton;
