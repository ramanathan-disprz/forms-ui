import FormInputItem from "../FormInputItem";
import FormVisiblity from "../FormVisiblity";

import styles from "../../styles/components/forms/form-config/base.module.scss";
const FormConfig: React.FC = () => {

    return (
        <div className={styles.configuration}>
            <h2 className={styles.title}>Form Details</h2>

            <div className={styles.inputs}>

                <FormInputItem
                    label="Form Name"
                    inputType="text"
                    valuePlaceholder="Post-Course Experience"
                    isRequired={true}
                    maxLength={80}
                />

                <FormInputItem
                    label="Form Description"
                    inputType="textarea"
                    valuePlaceholder="Internal feedback collection to evaluate content effectiveness, instructor performance, and learner experience."
                    isRequired={false}
                    maxLength={200}
                />

                <FormVisiblity
                    enabled={false}
                    onToggle={() => { }}
                />

            </div>
        </div>
    );
};

export default FormConfig; 