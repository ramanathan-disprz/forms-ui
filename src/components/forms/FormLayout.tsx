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

type QuestionType =
    'short-text' |
    'long-text' |
    'date-picker' |
    'dropdown' |
    'file-upload' |
    'numeric';

interface Question {
    id: string;
    type: QuestionType;
}

const FormLayout: React.FC = () => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const mainbarRef = useRef<HTMLDivElement>(null);
    const lastQuestionRef = useRef<HTMLDivElement>(null);

    const handleAddQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
            id: `question-${Date.now()}`,
            type: type
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleCloneQuestion = (questionId: string) => {
        const questionToClone = questions.find(q => q.id === questionId);
        if (questionToClone) {
            const clonedQuestion: Question = {
                id: `question-${Date.now()}`,
                type: questionToClone.type
            };
            setQuestions([...questions, clonedQuestion]);
        }
    };

    const handleDeleteQuestion = (questionId: string) => {
        setQuestions(questions.filter(q => q.id !== questionId));
    };

    useEffect(() => {
        if (lastQuestionRef.current) {
            lastQuestionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [questions]);

    const renderQuestion = (question: Question, index: number) => {
        const isLastQuestion = index === questions.length - 1;

        switch (question.type) {
            case 'short-text':
                return (
                    <div
                        key={question.id}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <ShortTextTile onClone={() => handleCloneQuestion(question.id)}
                            onDelete={() => handleDeleteQuestion(question.id)} />
                    </div>
                );
            case 'long-text':
                return (
                    <div
                        key={question.id}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <LongTextTile />
                    </div>
                );

            case 'numeric':
                return (
                    <div
                        key={question.id}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <NumericTile />
                    </div>
                );

            case 'date-picker':
                return (
                    <div
                        key={question.id}
                        ref={isLastQuestion ? lastQuestionRef : null}
                    >
                        <DatePickerTile />
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
                        onClick={() => handleAddQuestion('short-text')}
                    />
                    <FormListTile
                        icon={LongText}
                        text="Long Text"
                        color="#7B61FF40"
                        onClick={() => handleAddQuestion('long-text')}
                    />
                    <FormListTile
                        icon={DatePicker}
                        text="Date Picker"
                        color="#BBE9E4"
                        onClick={() => handleAddQuestion('date-picker')}
                    />
                    <FormListTile
                        icon={DropDown}
                        text="Drop Down"
                        color="#DBF3CC"
                        onClick={() => handleAddQuestion('dropdown')}
                    />
                    <FormListTile
                        icon={FileUpload}
                        text="File Upload"
                        color="#E7CCF3"
                        onClick={() => handleAddQuestion('file-upload')}
                    />
                    <FormListTile
                        icon={Numeric}
                        text="Numeric"
                        color="#F3CCE1"
                        onClick={() => handleAddQuestion('numeric')}
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
                        <FormContentTile isMovable={false} />
                    </div>
                </div>

                <div className={styles.body}>
                    <FormContentTile isMovable={true} />
                    {questions.map((question, index) => renderQuestion(question, index))}
                </div>
            </div>
        </div>
    );
};

export default FormLayout;