import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";
import { QuestionRequest } from "../../../features/forms/Form";

interface NumericTileProps {
    question: QuestionRequest;
    onUpdate: (updates: Partial<QuestionRequest>) => void;
    onClone: () => void;
    onDelete: () => void;
}

const NumericTile: React.FC<NumericTileProps> = ({
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
            onDescriptionChange={handleDescriptionToggle}
            isRequired={question.required}
            onRequiredChange={handleRequiredToggle}
            onClone={onClone}
            onDelete={onDelete}
            questionNumber={question.order}
        />
    )
};

export default NumericTile;