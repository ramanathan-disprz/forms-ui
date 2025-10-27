import { MoreVert } from "@mui/icons-material";
import FormFieldItem from "./FormFieldItem";
import SecondaryButton from "./buttons/SecondaryButton";
import Button from "./buttons/PrimaryButton";

import "../styles/components/form-card/base.scss";

interface FormCardProps {
    title: string;
    // publishedBy: string;
    // publishedDate: string;
    // isEnabled: boolean;
    // isPublished: boolean;
    // viewResponse: () => void;
}

const FormCard: React.FC<FormCardProps> = ({
    title
}) => {
    return (
        <div className="card-container">

            <div className="card-header">
                <div className="text">{title}</div>
                <MoreVert className="more-icon" />
            </div>

            <div className="card-body">
                <FormFieldItem label="Published By" value="ChatGPT" />
                <FormFieldItem label="Published Date" value="24/09/2003" />
                <FormFieldItem label="Workflow Usage" value="23" />
            </div>

            <div className="card-footer">
                <SecondaryButton text="Published" onClick={() => {}} />
                <Button text="View Responses" onClick={() => {}} />
            </div>

        </div>
    );
};

export default FormCard;
