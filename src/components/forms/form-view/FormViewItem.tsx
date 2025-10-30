import styles from '@/styles/components/forms/form-view/base.module.scss';
import FormInputItem from '../../FormInputItem';
import { Option } from '../../../features/forms/Form';
interface FormViewItemProps {
    questionId?: string;
    order?: number;
    questionText?: string;
    description?: string;
    inputType?: "text" | "textarea" | "date" | "numeric" | "file" | "dropdown" | string;
    isDisabled?: boolean;
    isRequired?: boolean;
    value?: string;
    valuePlaceholder?: string
    options?: Option[]

    onChange?: (questionId?: string, value?: string) => void;
}

const FormViewItem: React.FC<FormViewItemProps> = ({
    questionId,
    order,
    questionText,
    description,
    inputType,
    isDisabled,
    isRequired,
    value,
    valuePlaceholder,
    options = [],
    onChange
}) => {

    const handleChange = (newValue: string) => {
        if (onChange && questionId) {
            onChange(questionId, newValue);
        } else if (onChange && !questionId) {
            console.warn('onChange called but no questionId available');
        }
    };

    if (inputType === 'dropdown') {
        console.log('FormViewItem dropdown render:', {
            questionId,
            options,
            value,
            inputType
        });
    }

    return (
        <div className={styles.container}>

            <div className={styles.questionContainer}>
                <div className={styles.question}>
                    <span className={styles.questionNumber}>{order}</span>
                    <span className={styles.questionText}>{questionText}</span>
                </div>
                {description && description.trim() !== '' && (
                    <div className={styles.questionDescription}>
                        {description}
                    </div>
                )}
            </div>
            <div className={styles.inputContainer}>
                <FormInputItem
                    inputType={inputType || "text"}
                    isDisabled={isDisabled}
                    isRequired={isRequired}
                    value={value}
                    valuePlaceholder={valuePlaceholder}
                    dropdownOptions={options}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default FormViewItem;
