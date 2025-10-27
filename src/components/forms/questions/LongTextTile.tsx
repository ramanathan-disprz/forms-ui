import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

interface LongTextTileProps {
    onClone: () => void;
    onDelete: () => void;
}

const LongTextTile: React.FC<LongTextTileProps> = ({ onClone, onDelete }) => {
    const [hasDescription, setHasDescription] = useState(false);
    const content = (
        <>
            <FormInputItem
                inputType="text"
                value="Untitled Question"
                maxLength={150}
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
                valuePlaceholder="Long Text (Up to 500 Character)"
            />
        </>
    );

    return (
        <FormContentTile
            isMovable={true}
            bodyContent={content}
            hasDescription={hasDescription}
            onDescriptionChange={setHasDescription}
            onClone={onClone}
            onDelete={onDelete} />
    )
};

export default LongTextTile;