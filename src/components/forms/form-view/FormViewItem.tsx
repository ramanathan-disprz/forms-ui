import styles from '@/styles/components/forms/form-view/base.module.scss';
import FormInputItem from '../../FormInputItem';
interface FormViewItemProps {
    order: number;
    questionText: string;
    description?: string;

    inputType: "text" | "textarea" | "date" | "numeric" | "file" | "dropdown";
    isDisabled?: boolean;
    isRequired?: boolean;
    value?: string;
    valuePlaceholder?: string
}

const FormViewItem: React.FC<FormViewItemProps> = ({
    order,
    questionText,
    description,
    inputType,
    isDisabled,
    isRequired,
    value,
    valuePlaceholder,
}) => {
    return (
        <div className={styles.container}>

            <div className={styles.questionContainer}>
                <div className={styles.question}>
                    <span className={styles.questionNumber}>{order}</span>
                    <span className={styles.questionText}>{questionText}</span>
                </div>
                <div className={styles.questionDescription}>
                    {description}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <FormInputItem
                    inputType={inputType}
                    isDisabled={isDisabled}
                    isRequired={isRequired}
                    value={value}
                    valuePlaceholder={valuePlaceholder}
                />
            </div>

        </div>
    )
}

export default FormViewItem;
