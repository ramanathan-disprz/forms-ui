import Button from "./buttons/PrimaryButton";

import "../styles/components/form-footer/base.scss";
import OutlineButton from "./buttons/OutlineButton";

interface FormFooterProps {
    selectedTab: 'configuration' | 'layout' | 'responses';
    onNext?: () => void;
    onPublish?: () => void;
    onSaveDraft?: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
    selectedTab,
    onNext,
    onPublish,
    onSaveDraft
}) => {

    return (
        <div className="form-footer">
            <OutlineButton
                text="Save as Draft"
                onClick={onSaveDraft || (() => { })}
            />
            {selectedTab === 'configuration' ? (
                <Button
                    text="Next"
                    disabled={false}
                    onClick={onNext || (() => { })}
                />
            ) : selectedTab === 'layout' ? (
                <Button
                    text="Publish Form"
                    disabled={false}
                    onClick={onPublish || (() => { })}
                />
            ) : null}
        </div>
    );
}

export default FormFooter;