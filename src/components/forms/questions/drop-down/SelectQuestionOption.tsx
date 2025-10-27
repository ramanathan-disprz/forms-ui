import styles from '@/styles/components/forms/form-layout/questions/dropdown/select-option/base.module.scss';
import { useState } from 'react';

import CloseIcon from '@/assets/question-icons/close.svg';
interface SelectQuestionOptionProps {
    order: number
    optionValue: string
    onChange?: (optionValue: string) => void;
    onClose: () => void
}

const SelectQuestionOption: React.FC<SelectQuestionOptionProps> = (
    { order,
        optionValue,
        onChange,
        onClose }) => {

    const [data, setData] = useState(optionValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData(value);
    }
    return (
        <div className={styles.container}>
            
            <div className={styles.option}>
                <div className={styles.order}>
                    {order}
                </div>
                <input
                    type="text"
                    value={data}
                    className={styles.optionValue}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.close}>
                <img src={CloseIcon} alt="Close Icon" onClick={onClose} />
            </div>
        </div>
    )
};

export default SelectQuestionOption;