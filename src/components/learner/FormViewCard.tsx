import styles from '../../styles/components/learner/form-view-card/base.module.scss';
import FormFieldItem from '../FormFieldItem';

interface FormViewCardProps {
    formId: string;
    title: string;
    description?: string;
    dueDate?: string;
    formType?: string
    buttonText?: string;
    onClick?: (formId: string | number) => void;
    disabled?: boolean;
}

const FormViewCard: React.FC<FormViewCardProps> =
    ({
        formId,
        title,
        description,
        dueDate,
        formType,
        buttonText,
        onClick,
        disabled = false
    }) => {
        return (
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>{description}</div>
                <FormFieldItem label="Due Date" value={dueDate} />

                <button
                    className={styles.button}
                    onClick={() => { }}
                >
                    <span className={styles.buttonText}>{formType}</span>
                </button>

                <div className={styles.footer}>
                    <button
                        className={`${styles.button} ${disabled ? styles.disabled : ''}`}
                        onClick={() => onClick?.(formId)}
                        disabled={disabled}
                    >
                        <span className={styles.buttonText}>{buttonText}</span>
                    </button>
                </div>
            </div>
        )
    };

export default FormViewCard;