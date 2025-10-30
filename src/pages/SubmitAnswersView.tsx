import { useNavigate } from 'react-router-dom';
import OutlineButton from '../components/buttons/OutlineButton';
import Button from '../components/buttons/PrimaryButton';
import FormViewItem from '../components/forms/form-view/FormViewItem';
import { Option, QuestionType } from '../features/forms/Form';
import styles from '../styles/pages/view-form/base.module.scss';
import { useSubmitForm } from '../api/submissions/useSubmissions';
import { useState } from 'react';
import { FormAnswerRequest, FormSubmissionRequest } from '../features/submission/Submission';

interface SubmitAnswersViewProps {
    formId: string;
    formData: any;
}

const SubmitAnswersView: React.FC<SubmitAnswersViewProps> = ({
    formId,
    formData
}) => {

    const navigate = useNavigate();
    const submitFormMutation = useSubmitForm();

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const userId = 1760086631211;

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

    const { form, questions } = formData;

    const handleAnswerChange = (questionId?: string, value?: string) => {

        if (!questionId) {
            console.warn('No questionId provided to handleAnswerChange');
            return;
        }

        setAnswers(prev => {
            const newAnswers = {
                ...prev,
                [questionId]: value || ''
            };
            return newAnswers;
        });
    };

    const handleClearForm = () => {
        setAnswers({});
        // Force re-render by setting to empty object
        setTimeout(() => {
            console.log('Form cleared, answers:', answers);
        }, 100);
    };

    const handleSubmit = async () => {
        console.log('Submitting form with answers:', answers);

        try {
            const formAnswers: FormAnswerRequest[] = questions.map((question: any) => {
                const answerValue = answers[question.id] || '';

                const isDropdown = question.type === QuestionType.SELECT ||
                    question.type === 'SELECT' ||
                    convertQuestionType(question.type) === 'dropdown';

                let answer: FormAnswerRequest;

                if (isDropdown && answerValue) {
                    const selectedValues = [answerValue];

                    answer = {
                        questionId: question.id,
                        questionType: question.type,
                        valueText: '',
                        valueJson: JSON.stringify(selectedValues)
                    };

                } else {
                    answer = {
                        questionId: question.id,
                        questionType: question.type,
                        valueText: answerValue,
                        valueJson: ''
                    };
                }

                return answer;
            });

            const submissionRequest: FormSubmissionRequest = {
                formId: formId,
                userId: userId,
                answers: formAnswers
            };

            console.log('Final submission request:', JSON.stringify(submissionRequest, null, 2));

            await submitFormMutation.mutateAsync(submissionRequest);
            navigate('/forms');

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const formatOptions = (options: any): Option[] => {
        if (!options) return [];

        if (Array.isArray(options)) {
            return options.map((opt: any) => {
                if (opt.label && opt.value) {
                    return opt;
                }
                if (typeof opt === 'string') {
                    return { label: opt, value: opt };
                }
                return { label: String(opt), value: String(opt) };
            });
        }
        return [];
    };

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <span className={styles.headerTitle}>{form?.title || "Course Feedback Form"}</span>
            </div>

            <div className={styles.body}>
                <div className={styles.metaData}>

                    <span className={styles.formTitle}>
                        {form?.title || "Course Feedback Form"}
                    </span>

                    <span className={styles.formDescription}>
                        {form?.description || "Help us improve! Share your feedback on your learning experience."}

                    </span>

                </div>

                <div className={styles.content}>
                    {questions?.map((question: any, index: number) => {
                        if (!question.id) {
                            console.error('Question missing ID:', question);
                        }

                        const inputType = convertQuestionType(question?.type);
                        const isDropdown = inputType === 'dropdown';

                        return (
                            <FormViewItem
                                key={question.id || index}
                                questionId={question.id}
                                order={index + 1}
                                questionText={question.questionText}
                                description={question.description || ""}
                                inputType={convertQuestionType(question?.type)}
                                isDisabled={false}
                                isRequired={question.required || false}
                                value={answers[question.id] || ''}
                                valuePlaceholder={question.placeholder || "Enter your answer here..."}
                                options={isDropdown ? formatOptions(question.options) : []}
                                onChange={handleAnswerChange}
                            />
                        )
                    })}
                </div>
            </div>

            <div className={styles.footer}>
                <OutlineButton text="Clear Form" onClick={handleClearForm} />
                <Button
                    text={submitFormMutation.isPending ? "Submitting..." : "Submit"}
                    onClick={handleSubmit}
                    disabled={submitFormMutation.isPending}
                />
            </div>
        </div >
    )
};
export default SubmitAnswersView;