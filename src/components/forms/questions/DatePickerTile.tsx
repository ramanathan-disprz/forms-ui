import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";
import styles from '@/styles/components/forms/form-layout/questions/date-picker/base.module.scss';
import { QuestionRequest } from "../../../features/forms/Form";

interface DatePickerTileProps {
    question: QuestionRequest;
    onUpdate: (updates: Partial<QuestionRequest>) => void;
    onClone: () => void;
    onDelete: () => void;
}

const DatePickerTile: React.FC<DatePickerTileProps> = ({
    question,
    onUpdate,
    onClone,
    onDelete }) => {

    const [hasDescription, setHasDescription] = useState(!!question.description);
    const [isMMDD, setIsMMDD] = useState<boolean>(question.dateFormat === 'MM/DD/YYYY');

    const handleQuestionTextChange = (value: string) => {
        onUpdate({ questionText: value });
    };

    const handleQuestionDescriptionChange = (value: string) => {
        onUpdate({ description: value });
    };

    const handleDescriptionToggle = (value: boolean) => {
        setHasDescription(value);
        if (!value) {
            onUpdate({ description: "" });
        }
    };

    const handleRequiredToggle = (value: boolean) => {
        onUpdate({ required: value });
    };

    const handleDateFormatChange = (isMMDD: boolean) => {
        setIsMMDD(isMMDD);
        onUpdate({ dateFormat: isMMDD ? 'MM/DD/YYYY' : 'DD/MM/YYYY' });
    };

    const content = (
        <>
            <FormInputItem
                inputType="text"
                value={question.questionText || "Untitled Question"}
                onChange={handleQuestionTextChange}
                maxLength={100}
            />
            {hasDescription && (
                <FormInputItem
                    inputType="textarea"
                    value={question.description}
                    onChange={handleQuestionDescriptionChange}
                    valuePlaceholder="Add description (optional)"
                    maxLength={300}
                />
            )}
            <div>
                <FormInputItem
                    inputType="text"
                    isDisabled={true}
                    value={isMMDD ? 'MM/DD/YYYY' : 'DD/MM/YYYY'}

                />
                <div className={styles.dateFormatter}>
                    <span>Date Format: </span>
                    <div className={styles.options}>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                id="mmdd"
                                checked={isMMDD}
                                onChange={() => handleDateFormatChange(true)}
                            />
                            <label htmlFor="mmdd">MM/DD/YYYY</label>
                        </div>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                id="ddmm"
                                checked={!isMMDD}
                                onChange={() => handleDateFormatChange(false)}
                            />
                            <label htmlFor="ddmm">DD/MM/YYYY</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <FormContentTile
            isMovable={true}
            bodyContent={content}
            hasDescription={hasDescription}
            onDescriptionChange={handleDescriptionToggle}
            isRequired={question.required}
            onRequiredChange={handleRequiredToggle}
            onClone={onClone}
            onDelete={onDelete}
            questionNumber={question.order}
        />
    );
};

export default DatePickerTile;
