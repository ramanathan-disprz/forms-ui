import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

interface ShortTextTileProps {
    onClone: () => void;
    onDelete: () => void;
}

const ShortTextTile: React.FC<ShortTextTileProps> = ({ onClone, onDelete }) => {
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
            onDescriptionChange={setHasDescription}
            onClone={onClone}
            onDelete={onDelete} />
    )
};

export default ShortTextTile;