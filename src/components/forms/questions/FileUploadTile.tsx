import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

import FileUploadIcon from '@/assets/question-icons/file-upload.svg';

import styles from '@/styles/components/forms/form-layout/questions/file-upload/base.module.scss';
import { QuestionRequest } from "../../../features/forms/Form";
interface FileUploadTileProps {
    question: QuestionRequest;
    onUpdate: (updates: Partial<QuestionRequest>) => void;
    onClone: () => void;
    onDelete: () => void;
}

const FileUploadTile: React.FC<FileUploadTileProps> = ({
    question,
    onUpdate,
    onClone,
    onDelete }) => {
    const [hasDescription, setHasDescription] = useState(!!question.description);

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
            <div className={styles.container}>
                <img src={FileUploadIcon} alt="File Upload Icon" />
                <div className={styles.content}>
                    <span> File Upload (Only one file allowed) </span>
                    <span> Supported files : PDF, PNG, JPG  |  Max file size 2 MB  </span>
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
    )
};

export default FileUploadTile;