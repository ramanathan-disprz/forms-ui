import { useEffect, useState } from "react";
import "../styles/components/form-input/base.scss";

import FileUploadIcon from "../assets/question-icons/file-upload.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import DownloadIcon from "../assets/icons/download.svg";
import FileIcon from "@/assets/icons/file.svg";
import { Option } from "../features/forms/Form";

interface FormInputItemProps {
    inputType: "text" | "textarea" | "date" | "numeric" | "file" | "dropdown" | string;
    isDisabled?: boolean;
    label?: string
    isRequired?: boolean;
    value?: string;
    valuePlaceholder?: string
    maxLength?: number;
    onChange?: (value: string) => void;
    dropdownOptions?: Option[];
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
    dropdownOptions = [],
}) => {

    const [data, setData] = useState(value || "");
    const [file, setFile] = useState<File | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            setFile(selectedFile);
            if (onChange) {
                onChange(selectedFile.name);
            }
        }
    };

    let input: any;
    if (inputType == "text") {
        input = (
            <input
                type="text"
                value={data}
                onChange={handleChange}
                placeholder={valuePlaceholder}
                maxLength={maxLength}
                required={isRequired}
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
                required={isRequired}
            />
        );
    }
    else if (inputType == "date") {
        input = (
            <input
                type="date"
                value={data}
                onChange={handleChange}
                required={isRequired}
            />
        );
    }

    else if (inputType == "numeric") {
        input = (
            <input
                type="number"
                value={data}
                onChange={handleChange}
                required={isRequired}
            />
        );
    }
    else if (inputType == "file") {

        input = (
            <div className="fileUpload">
                {!file ? (
                    <>
                        <input
                            type="file"
                            id={`fileInput`}
                            className="hiddenFileInput"
                            accept=".pdf,.png,.jpg,.jpeg"
                            required={isRequired}
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
                            <span>{file.name}</span>
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
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = file.name;
                                        document.body.appendChild(a);
                                        a.click();

                                        // Cleanup
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                    }
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
                required={isRequired}
                disabled={isDisabled}
            >
                <option value="">
                    {valuePlaceholder || "Select an option"}
                </option>
                {dropdownOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.value}
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