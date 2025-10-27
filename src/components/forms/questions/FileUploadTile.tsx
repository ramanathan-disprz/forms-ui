import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

const FileUploadTile: React.FC = () => {
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
            <FormInputItem
                inputType="text"
                isDisabled={true}
                valuePlaceholder="Short Text (Up to 100 Character)"
            />
        </>
    );

    return (
        <FormContentTile
            isMovable={true}
            bodyContent={content}
            hasDescription={hasDescription}
            onDescriptionChange={setHasDescription} />
    )
};

export default FileUploadTile;