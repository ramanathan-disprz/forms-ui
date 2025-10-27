import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

import FileUploadIcon from '@/assets/question-icons/file-upload.svg';

import styles from '@/styles/components/forms/form-layout/questions/file-upload/base.module.scss';
interface FileUploadTileProps {
    onClone: () => void;
    onDelete: () => void;
}

const FileUploadTile: React.FC<FileUploadTileProps> = ({ onClone, onDelete }) => {
    const [hasDescription, setHasDescription] = useState(false);
    const content = (
        <>
            <FormInputItem
                inputType="text"
                value="Untitled Question"
                maxLength={100}
            />
            {hasDescription && (
                <FormInputItem
                    inputType="textarea"
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
            onDescriptionChange={setHasDescription}
            onClone={onClone}
            onDelete={onDelete}
        />
    )
};

export default FileUploadTile;