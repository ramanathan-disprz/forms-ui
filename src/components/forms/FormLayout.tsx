import styles from "@/styles/components/forms/form-layout/base.module.scss";
import Button from "../buttons/PrimaryButton";
import FormListTile from "./FormListTile";

import ShortText from '@/assets/tile-icons/short-text.svg';
import LongText from '@/assets/tile-icons/long-text.svg';
import DatePicker from '@/assets/tile-icons/date-icon.svg';
import DropDown from '@/assets/tile-icons/drop-down.svg';
import FileUpload from '@/assets/tile-icons/file-upload.svg';
import Numeric from '@/assets/tile-icons/number.svg';
import FormContentTile from "./questions/FormContentTile";
import ShortTextTile from "./questions/ShortTextTile";
import { useEffect, useRef, useState } from "react";
import LongTextTile from "./questions/LongTextTile";
import NumericTile from "./questions/NumericTile";
import DatePickerTile from "./questions/DatePickerTile";
import FileUploadTile from "./questions/FileUploadTile";
import DropdownTile from "./questions/drop-down/DropdownTile";
import { FormRequest, QuestionRequest, QuestionType } from "../../features/forms/Form";

interface FormLayoutProps {
    formData: FormRequest;
    onFormChange: (field: keyof FormRequest, value: any) => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({
    formData,
    onFormChange
}) => {

    const lastQuestionRef = useRef<HTMLDivElement>(null);
    const [questions, setQuestions] = useState<QuestionRequest[]>(formData?.questions || []);

    // Sync questions with parent form state whenever they change
    useEffect(() => {
        onFormChange('questions', questions);
    }, [questions]);

    // Update local state when formData.questions changes from parent
    useEffect(() => {
        if (formData.questions) {
            setQuestions(formData.questions);
        }
    }, [formData.questions]);

    const handleAddQuestion = (type: QuestionType) => {
        const newQuestion: QuestionRequest = {
            questionId: `question-${Date.now()}`,
            type: type,
            questionText: "",
            description: "",
            placeholder: "",
            required: false,
            order: questions.length + 1,

            // Set default values based on question type
            ...(type === QuestionType.SHORT_TEXT && {
                maxLength: 100
            }),

            ...(type === QuestionType.LONG_TEXT && {
                minLength: 150,
                maxLength: 500
            }),
            ...(type === QuestionType.NUMBER && {
                minValue: 0,
                maxValue: 100
            }),
            ...(type === QuestionType.DATE && {
                minDate: new Date(),
                maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            }),
            ...(type === QuestionType.FILE && {
                allowedFileTypes: ['.pdf', '.png', '.jpg', '.jpeg'],
                maxFileSizeMB: 2,
                maxFiles: 1
            }),
            ...(type === QuestionType.SELECT && {
                options: [],
                multiSelect: false
            })
        };

        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
    };

    const handleCloneQuestion = (questionId?: string) => {
        const questionToClone = questions.find(q => q.questionId === questionId);
        if (questionToClone) {
            const clonedQuestion: QuestionRequest = {
                ...questionToClone,
                questionId: `question-${Date.now()}`,
                order: questions.length + 1
            };
            const updatedQuestions = [...questions, clonedQuestion];
            setQuestions(updatedQuestions);
        }
    };

    const handleUpdateQuestion = (questionId?: string, updates?: Partial<QuestionRequest>) => {
        const updatedQuestions = questions.map(q =>
            q.questionId === questionId ? { ...q, ...updates } : q
        );
        setQuestions(updatedQuestions);
    };

    const handleDeleteQuestion = (questionId?: string) => {
        setQuestions(questions.filter(q => q.questionId !== questionId));
    };

    useEffect(() => {
        if (lastQuestionRef.current) {
            lastQuestionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [questions]);

    const renderQuestion = (question: QuestionRequest, index: number) => {
        const isLastQuestion = index === questions.length - 1;

        switch (question.type) {
            case QuestionType.SHORT_TEXT:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <ShortTextTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                );

            case QuestionType.LONG_TEXT:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <LongTextTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                );

            case QuestionType.NUMBER:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <NumericTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                );

            case QuestionType.DATE:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <DatePickerTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)}
                        />
                    </div>
                );

            case QuestionType.FILE:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <FileUploadTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                );

            case QuestionType.SELECT:
                return (
                    <div
                        key={question.questionId}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <DropdownTile
                            question={question}
                            onUpdate={(updates) => handleUpdateQuestion(question.questionId, updates)}
                            onClone={() => handleCloneQuestion(question.questionId)}
                            onDelete={() => handleDeleteQuestion(question.questionId)} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.layout}>

            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Button text="Input Fields" onClick={() => { }} />
                </div>

                <hr className={styles.divider} />

                <div className={styles.list}>
                    <FormListTile
                        icon={ShortText}
                        text="Short Text"
                        onClick={() => handleAddQuestion(QuestionType.SHORT_TEXT)}
                    />
                    <FormListTile
                        icon={LongText}
                        text="Long Text"
                        color="#7B61FF40"
                        onClick={() => handleAddQuestion(QuestionType.LONG_TEXT)}
                    />
                    <FormListTile
                        icon={DatePicker}
                        text="Date Picker"
                        color="#BBE9E4"
                        onClick={() => handleAddQuestion(QuestionType.DATE)}
                    />
                    <FormListTile
                        icon={DropDown}
                        text="Drop Down"
                        color="#DBF3CC"
                        onClick={() => handleAddQuestion(QuestionType.SELECT)}
                    />
                    <FormListTile
                        icon={FileUpload}
                        text="File Upload"
                        color="#E7CCF3"
                        onClick={() => handleAddQuestion(QuestionType.FILE)}
                    />
                    <FormListTile
                        icon={Numeric}
                        text="Numeric"
                        color="#F3CCE1"
                        onClick={() => handleAddQuestion(QuestionType.NUMBER)}
                    />
                </div>

            </div>

            <div className={styles.mainbar}>

                <div className={styles.header}>
                    <span className={styles.headerTitle}>
                        Form Header
                    </span>
                    <hr className={styles.divider} />
                    <div className={styles.metaData}>
                        <FormContentTile 
                            isMovable={false}
                            title={formData.title}
                            description={formData.description}
                        />
                    </div>
                </div>

                <div className={styles.body}>
                    {questions.map((question, index) => renderQuestion(question, index))}
                </div>
            </div>
        </div>
    );
};

export default FormLayout;