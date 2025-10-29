import Button from "./buttons/PrimaryButton";

import "../styles/components/form-footer/base.scss";
import OutlineButton from "./buttons/OutlineButton";

interface FormFooterProps {
    selectedTab: 'configuration' | 'layout' | 'responses';
    onNext?: () => void;
    onPublish?: () => void;
    onSaveDraft?: () => void;
    canEdit?: boolean
}

const FormFooter: React.FC<FormFooterProps> = ({
    selectedTab,
    onNext,
    onPublish,
    onSaveDraft,
    canEdit = true
}) => {

    return (
        <div className="form-footer">
            <OutlineButton
                text="Save as Draft"
                disabled={!canEdit}
                onClick={onSaveDraft || (() => { })}
            />
            {selectedTab === 'configuration' ? (
                <Button
                    text="Next"
                    disabled={!canEdit}
                    onClick={onNext || (() => { })}
                />
            ) : selectedTab === 'layout' ? (
                <Button
                    text="Publish Form"
                    disabled={!canEdit}
                    onClick={onPublish || (() => { })}
                />
            ) : null}
        </div>
    );
}

export default FormFooter;