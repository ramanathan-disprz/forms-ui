import { useState } from "react";
import FormInputItem from "../../FormInputItem";
import FormContentTile from "./FormContentTile";
import styles from '@/styles/components/forms/form-layout/questions/date-picker/base.module.scss';

const DatePickerTile: React.FC = () => {
    const [hasDescription, setHasDescription] = useState(false);
    const [isMMDD, setIsMMDD] = useState(true);

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
                                onChange={() => setIsMMDD(true)}
                            />
                            <label htmlFor="mmdd">MM/DD/YYYY</label>
                        </div>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                id="ddmm"
                                checked={!isMMDD}
                                onChange={() => setIsMMDD(false)}
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
            onDescriptionChange={setHasDescription}
        />
    );
};

export default DatePickerTile;
