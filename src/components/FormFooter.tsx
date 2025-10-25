import Button from "./Button";

import "../styles/components/form-footer/base.scss";
import OutlineButton from "./OutlineButton";

const FormFooter: React.FC = () => {

    return (
        <div className="form-footer">
            <OutlineButton
                text="Save as Draft"
                onClick={() => { }}
            />
            <Button
                text="Next"
                onClick={() => { }}
            />
        </div>
    );
}

export default FormFooter;