import { useState } from "react";
import FormInputItem from "../../../FormInputItem";
import FormContentTile from "../FormContentTile";

import styles from '@/styles/components/forms/form-layout/questions/dropdown/base.module.scss';
import SelectQuestionOption from "./SelectQuestionOption";
import AddIcon from '@mui/icons-material/Add';

interface DropdownTileProps {
    onClone: () => void;
    onDelete: () => void;
}

const DropdownTile: React.FC<DropdownTileProps> = ({ onClone, onDelete }) => {
    const [hasDescription, setHasDescription] = useState(false);
    const [options, setOptions] = useState<any[]>([
        { id: '1', order: 1, value: 'Option 1' }
    ]);

    const handleAddOption = () => {
        const newOption: any = {
            id: Date.now().toString(),
            order: options.length + 1,
            value: `Option ${options.length + 1}`
        };
        setOptions([...options, newOption]);
    };

    const handleRemoveOption = (id: string) => {
        const updatedOptions = options
            .filter(option => option.id !== id)
            .map((option, index) => ({
                ...option,
                order: index + 1
            }));
        setOptions(updatedOptions);
    };

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
            <div className={styles.container}>
                {options.map((option) => (
                    <SelectQuestionOption
                        key={option.id}
                        order={option.order}
                        optionValue={option.value}
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
            onDescriptionChange={setHasDescription}
            onClone={onClone}
            onDelete={onDelete} />
    )
};

export default DropdownTile;