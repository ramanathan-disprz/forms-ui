import { useState } from "react";
import FormInputItem from "../../../FormInputItem";
import FormContentTile from "../FormContentTile";

import styles from '@/styles/components/forms/form-layout/questions/dropdown/base.module.scss';
import SelectQuestionOption from "./SelectQuestionOption";
import AddIcon from '@mui/icons-material/Add';
import { Option, QuestionRequest } from "../../../../features/forms/Form";

interface DropdownTileProps {
    question: QuestionRequest;
    onUpdate: (question: QuestionRequest) => void;
    onClone: () => void;
    onDelete: () => void;
}

const DropdownTile: React.FC<DropdownTileProps> = ({
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

    const handleAddOption = () => {
        const currentOptions = question.options || [];
        const newOption: Option = {
            id: Date.now().toString(),
            order: currentOptions.length + 1,
            value: `Option ${currentOptions.length + 1}`,
            label: `Option ${currentOptions.length + 1}`
        };
        onUpdate({ options: [...currentOptions, newOption] });
    };

    const handleRemoveOption = (id: string) => {
        const currentOptions = question.options || [];
        const updatedOptions = currentOptions
            .filter(option => option.id !== id)
            .map((option, index) => ({
                ...option,
                order: index + 1
            }));
        onUpdate({ options: updatedOptions });
    };

    const handleOptionValueChange = (id: string, newValue: string) => {  // ADDED: Handle option value change
        const currentOptions = question.options || [];
        const updatedOptions = currentOptions.map(option =>
            option.id === id ? { ...option, value: newValue } : option
        );
        onUpdate({ options: updatedOptions });
    };

    const content = (
        <>
            <FormInputItem
                inputType="text"
                value={question.questionText || "Untitled Question"}
                onChange={handleQuestionTextChange}
                maxLength={150}
            />
            {hasDescription && (
                <FormInputItem
                    inputType="textarea"
                    value={question.description}  // ADDED: Use question.description
                    onChange={handleQuestionDescriptionChange}  // ADDED: Use handler
                    valuePlaceholder="Add description (optional)"
                    maxLength={300}
                />
            )}
            <div className={styles.container}>
                {(question.options || []).map((option) => (
                    <SelectQuestionOption
                        key={option.id}
                        order={option.order}
                        optionValue={option.value}
                        onValueChange={(newValue) => handleOptionValueChange(option.id, newValue)}
                        onClose={() => handleRemoveOption(option.id)}
                    />
                ))}

                <div className={styles.operations}>
                    <div className={styles.button} onClick={handleAddOption}>
                        <AddIcon className={styles.icon} />
                        <span className={styles.text}>Add Option</span>
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
    )
};

export default DropdownTile;