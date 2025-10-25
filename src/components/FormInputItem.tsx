import { useState } from "react";
import "../styles/components/form-input/base.scss";

interface FormInputItemProps {
    inputType: "text" | "textarea";
    label?: string
    isRequired?: boolean;

    value?: string;
    valuePlaceholder?: string
    maxLength?: number;
    onChange?: (value: string) => void;
}

const FormInputItem: React.FC<FormInputItemProps> = ({
    inputType,
    label,
    isRequired = false,
    value,
    valuePlaceholder,
    maxLength,
}) => {

    const [data, setData] = useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData(value);
    }

    let input: any;
    if (inputType == "text") {
        input = (
            <input
                type="text"
                value={data}
                onChange={handleChange}
                placeholder={valuePlaceholder}
                maxLength={maxLength}
            />
        );
    }
    else if (inputType == "textarea") {
        input = (
            <textarea
                value={data}
                onChange={handleChange}
                placeholder={valuePlaceholder}
                maxLength={maxLength}
            />
        );
    }

    return (
        <div className="form-input-item">
            <div className="form-input-label">
                {label}
                {isRequired && <span className="required-asterisk">*</span>}
            </div>
            <div className="form-input-value">
                {input}
                {maxLength && (
                    <span className="character-counter">
                        <span style={{ color: '#262626' }}>{data.length}</span>/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FormInputItem;