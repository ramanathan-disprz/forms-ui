import Button from "./buttons/PrimaryButton";

import "../styles/components/form-footer/base.scss";
import OutlineButton from "./buttons/OutlineButton";
import SecondaryButton from "./buttons/SecondaryButton";

interface FormFooterProps {
    selectedTab: 'configuration' | 'layout' | 'responses';
    onNext?: () => void;
    onPublish?: () => void;
    onSaveDraft?: () => void;
    onPreview?: () => void;
    canEdit?: boolean
}

const FormFooter: React.FC<FormFooterProps> = ({
    selectedTab,
    onNext,
    onPublish,
    onSaveDraft,
    onPreview,
    canEdit = true
}) => {

    return (
        <div className="form-footer">
            <div className="partA">
                <OutlineButton
                    text="Preview"
                    onClick={onPreview || (() => { })}
                />
            </div>

            <div className="partB">
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

        </div>
    );
}

export default FormFooter;