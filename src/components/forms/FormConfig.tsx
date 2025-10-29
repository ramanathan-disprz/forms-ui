import FormInputItem from "../FormInputItem";
import FormVisiblity from "../FormVisiblity";

import styles from "../../styles/components/forms/form-config/base.module.scss";
import { FormRequest, FormViewStatus } from "../../features/forms/Form";

interface FormConfigProps {
    formData: FormRequest;
    onFormChange: (field: keyof FormRequest, value: any) => void;
}

const FormConfig: React.FC<FormConfigProps> = ({
    formData,
    onFormChange }) => {

    const handleTitleChange = (value: string) => {
        onFormChange('title', value);
    };

    const handleDescriptionChange = (value: string) => {
        onFormChange('description', value);
    };

    const handleVisibilityToggle = (enabled: boolean) => {
        onFormChange('formViewStatus', enabled ? FormViewStatus.ENABLED : FormViewStatus.DISABLED);
    };

    return (
        <div className={styles.configuration}>
            <h2 className={styles.title}>Form Details</h2>

            <div className={styles.inputs}>

                <FormInputItem
                    label="Form Name"
                    inputType="text"
                    value={formData.title}
                    isRequired={true}
                    maxLength={80}
                    onChange={handleTitleChange}
                />

                <FormInputItem
                    label="Form Description"
                    inputType="textarea"
                    value={formData.description}
                    valuePlaceholder="Enter a description for your form..."
                    isRequired={false}
                    maxLength={200}
                    onChange={handleDescriptionChange}
                />

                <FormVisiblity
                    enabled={false}
                    onToggle={handleVisibilityToggle}
                />

            </div>
        </div>
    );
};

export default FormConfig; 