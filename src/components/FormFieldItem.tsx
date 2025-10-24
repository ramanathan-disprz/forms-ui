import "../styles/components/form-card/form-field-item/base.scss";

interface FormFieldItem {
    label: string;
    value: string;
}

const FormFieldItem: React.FC<FormFieldItem> = ({ label, value }) => {
    return (
        <div className="form-field-item">
            <span className="field-label">{label}</span>
            <span className="field-separator">:</span>
            <span className="field-value">{value}</span>
        </div>

    );
};
export default FormFieldItem;