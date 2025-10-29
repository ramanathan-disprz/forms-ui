import { useEffect, useState } from "react";
import "../styles/components/form-input/base.scss";

import FileUploadIcon from "../assets/question-icons/file-upload.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import DownloadIcon from "../assets/icons/download.svg";
import FileIcon from "@/assets/icons/file.svg";

interface FormInputItemProps {
    inputType: "text" | "textarea" | "date" | "numeric" | "file" | "dropdown";
    isDisabled?: boolean;
    label?: string
    isRequired?: boolean;

    value?: string;
    valuePlaceholder?: string
    maxLength?: number;
    onChange?: (value: string) => void;
}

const FormInputItem: React.FC<FormInputItemProps> = ({
    inputType,
    isDisabled = false,
    label,
    isRequired = false,
    value,
    valuePlaceholder,
    maxLength,
    onChange,
}) => {

    const [data, setData] = useState(value || "");

    const dropdownOptions = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    useEffect(() => {
        setData(value || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        setData(newValue);

        // Call the parent's onChange handler if provided
        if (onChange) {
            onChange(newValue);
        }
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
    else if (inputType == "date") {
        input = (
            <input
                type="date"
                value={data}
                onChange={handleChange}
            />
        );
    }

    else if (inputType == "numeric") {
        input = (
            <input
                type="number"
                value={data}
                onChange={handleChange}
            />
        );
    }
    else if (inputType == "file") {

        const [file, setFile] = useState<File | null>(null);
        input = (
            <div className="fileUpload">
                {!file ? (
                    <>
                        <input
                            type="file"
                            id={`fileInput`}
                            className="hiddenFileInput"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert('File size must be less than 2MB');
                                        return;
                                    }
                                    setFile(file);
                                    handleChange(e);
                                }
                            }}
                        />
                        <div className="uploadArea" onClick={() => document.getElementById(`fileInput`)?.click()}>
                            <img src={FileUploadIcon} alt="file-upload" />
                            <div className="caption">
                                <span>Drop files here or Browse</span>
                                <span>Supported files : PDF, PNG, JPG  |  Max file size: 2 MB | Only one file allowed</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="file">
                        <div className="meta">
                            <img src={FileIcon} alt="file" className="fileIcon" />
                            <span>{setFile.name}</span>
                        </div>
                        <div className="operations">
                            <img
                                src={DeleteIcon}
                                alt="delete"
                                className="deleteIcon"
                                onClick={() => {
                                    setFile(null);
                                    const input = document.getElementById(`fileInput`) as HTMLInputElement;
                                    if (input) input.value = '';
                                }}
                            />
                            <img
                                src={DownloadIcon}
                                alt="download"
                                className="downloadIcon"
                                onClick={() => {
                                    console.log(file.name);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    else {
        input = (
            <select
                className="dropdownInput"
                value={data}
                onChange={handleChange}
            >
                <option value="">Select an option</option>
                {dropdownOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );

    }

    return (
        <div className="form-input-item">
            {label && (
                <div className="form-input-label">
                    {label}
                    {isRequired && <span className="required-asterisk">*</span>}
                </div>
            )}
            <div
                className={`form-input-value ${isDisabled ? 'disabled' : ''}`}
                style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
            >
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