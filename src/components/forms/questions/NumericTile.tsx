import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";

const NumericTile: React.FC = () => {
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
                valuePlaceholder="Numeric Value"
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

export default NumericTile;