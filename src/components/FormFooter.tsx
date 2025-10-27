import Button from "./buttons/PrimaryButton";

import "../styles/components/form-footer/base.scss";
import OutlineButton from "./buttons/OutlineButton";

const FormFooter: React.FC = () => {

    return (
        <div className="form-footer">
            <OutlineButton
                text="Save as Draft"
                onClick={() => { }}
            />
            <Button
                text="Next"
                disabled = {true}
                onClick={() => { }}
            />
        </div>
    );
}

export default FormFooter;