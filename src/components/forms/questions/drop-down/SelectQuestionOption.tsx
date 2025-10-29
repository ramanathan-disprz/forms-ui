import styles from '@/styles/components/forms/form-layout/questions/dropdown/select-option/base.module.scss';
import { useState } from 'react';

import CloseIcon from '@/assets/question-icons/close.svg';
interface SelectQuestionOptionProps {
    order: number
    optionValue: string
    onValueChange: (value: string) => void;
    onClose: () => void
}

const SelectQuestionOption: React.FC<SelectQuestionOptionProps> = (
    {
        order,
        optionValue,
        onValueChange,
        onClose }) => {

    return (
        <div className={styles.container}>

            <div className={styles.option}>
                <div className={styles.order}>
                    {order}
                </div>
                <input
                    type="text"
                    value={optionValue}
                    className={styles.optionValue}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>

            <div className={styles.close}>
                <img src={CloseIcon} alt="Close Icon" onClick={onClose} />
            </div>
        </div>
    );
};

export default SelectQuestionOption;