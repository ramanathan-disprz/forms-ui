import OutlineButton from '../components/buttons/OutlineButton';
import FormViewItem from '../components/forms/form-view/FormViewItem';
import { QuestionType } from '../features/forms/Form';
import { useGetFormState } from '../features/forms/useFormStates';
import styles from '../styles/pages/view-form/base.module.scss';

interface FormResponseViewProps {
    formId: string;
}

const FormResponseView: React.FC<FormResponseViewProps> = ({
    formId,
}) => {
    const formData = useGetFormState();

    if (!formData) {
        return <div>No form data available</div>;
    }

    const convertQuestionType = (type?: QuestionType): string => {

        const typeMap: Record<QuestionType, string> = {
            [QuestionType.SHORT_TEXT]: 'text',
            [QuestionType.LONG_TEXT]: 'textarea',
            [QuestionType.DATE]: 'date',
            [QuestionType.NUMBER]: 'numeric',
            [QuestionType.FILE]: 'file',
            [QuestionType.SELECT]: 'dropdown'
        };
        if (!type || type === null || type == undefined)
            return 'text';
        return typeMap[type] || 'text';
    };

    const handleClearForm = () => {
        
    };

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <span className={styles.headerTitle}>{formData?.title}</span>
            </div>

            <div className={styles.body}>
                <div className={styles.metaData}>

                    <span className={styles.formTitle}>
                        {formData?.title || "Course Feedback Form"}
                    </span>

                    <span className={styles.formDescription}>
                        {formData?.description || "Help us improve! Share your feedback on your learning experience."}

                    </span>

                </div>

                <div className={styles.content}>
                    {formData.questions?.map((question, index) => (
                        <FormViewItem
                            key={question.id || index}
                            order={index + 1}
                            questionText={question.questionText}
                            description={question.description || ""}
                            inputType={convertQuestionType(question?.type)}
                            isDisabled={false}
                            isRequired={question.required || false}
                            value=""
                            valuePlaceholder={question.placeholder || "Enter your answer here..."}
                            options=
                            {convertQuestionType(question?.type) == "dropdown"
                                ? question?.options : []}
                        />
                    ))}
                </div>
            </div>

            {/* <div className={styles.footer}>
                <OutlineButton text="Clear Form" onClick={() => { handleClearForm }} />
            </div> */}
        </div >
    )
};
export default FormResponseView;