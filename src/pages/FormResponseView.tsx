import OutlineButton from '../components/buttons/OutlineButton';
import FormViewItem from '../components/forms/form-view/FormViewItem';
import styles from '../styles/pages/view-form/base.module.scss';

const FormResponseView: React.FC = () => {

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <span className={styles.headerTitle}>Employee Onboarding</span>
            </div>

            <div className={styles.body}>
                <div className={styles.metaData}>

                    <span className={styles.formTitle}>
                        Course Feedback Form
                    </span>

                    <span className={styles.formDescription}>
                        Help us improve! Share your feedback on your learning experience.
                    </span>

                </div>

                <div className={styles.content}>
                    <FormViewItem
                        order={1}
                        questionText="What did you think of the course content?"
                        description="Please provide your feedback on the course material."
                        inputType="text"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />

                    <FormViewItem
                        order={2}
                        questionText="What did you think of the instructor's delivery?"
                        description="Please provide your feedback on the instructor's teaching style."
                        inputType="textarea"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />

                    <FormViewItem
                        order={3}
                        questionText="What did you think of the course material?"
                        description="Please provide your feedback on the course material."
                        inputType="date"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />

                    <FormViewItem
                        order={4}
                        questionText="What did you think of the instructor's delivery?"
                        description="Please provide your feedback on the instructor's teaching style."
                        inputType="numeric"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />

                    <FormViewItem
                        order={5}
                        questionText="What did you think of the instructor's delivery?"
                        description="Please provide your feedback on the instructor's teaching style."
                        inputType="dropdown"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />

                    <FormViewItem
                        order={6}
                        questionText="What did you think of the instructor's delivery?"
                        description="Please provide your feedback on the instructor's teaching style."
                        inputType="file"
                        isDisabled={false}
                        isRequired={true}
                        value=""
                        valuePlaceholder="Enter your feedback here..."
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <OutlineButton text="Clear Form" onClick={() => { }} />
            </div>
        </div >
    )

};

export default FormResponseView;