import { MoreVert } from "@mui/icons-material";
import FormFieldItem from "./FormFieldItem";
import SecondaryButton from "./buttons/SecondaryButton";
import Button from "./buttons/PrimaryButton";

import "../styles/components/form-card/base.scss";
import { useEffect, useRef, useState } from "react";
import { useDeleteForm } from "../api/forms/useForms";
import { useNavigate } from "react-router-dom";

interface FormCardProps {
    id: string;
    title: string;
    publishedBy?: string;
    publishedDate?: string;
    isEnabled?: boolean;
    isPublished?: boolean;
    // viewResponse: () => void;
}

const FormCard: React.FC<FormCardProps> = ({
    id,
    title = "Untitled Form",
    publishedBy = "John Doe",
    publishedDate = "Date",
    isEnabled = false,
    isPublished = false,
}) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const deleteFormMutation = useDeleteForm();


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEditForm = () => {
        console.log("Edit form");
        setShowDropdown(false);
        navigate(`/form-builder/edit/${id}`);
    };


    const handleViewForm = () => {
        console.log("View form");
        setShowDropdown(false);
        navigate(`/form-builder/view/${id}`);

    }

    const handleDeleteForm = () => {
        console.log("Delete form with id:", id);
        deleteFormMutation.mutate(id);
        setShowDropdown(false);
    };

    return (
        <div className="card-container">

            <div className="card-header">
                <div className="text">{title}</div>
                <MoreVert
                    className="more-icon"
                    onClick={() => setShowDropdown(!showDropdown)}
                />

                {showDropdown && (
                    <div className="dropdown">
                        {isPublished ? (
                            <div
                                className="dropdownItem"
                                onClick={handleViewForm}
                            >
                                View Form
                            </div>

                        ) : (
                            <div
                                className="dropdownItem"
                                onClick={handleEditForm}
                            >
                                Edit Form
                            </div>
                        )}

                        <div
                            className="dropdownItem"
                            onClick={handleDeleteForm}
                        >
                            Delete Form
                        </div>
                    </div>
                )}

            </div>

            <div className="card-body">
                <FormFieldItem label="Published By" value={publishedBy} />
                <FormFieldItem label="Published Date" value={publishedDate} />
                <FormFieldItem label="Workflow Usage" value="21" />
            </div>


            <div className="card-footer">
                {isPublished ?
                    (
                        <SecondaryButton text="Published" onClick={() => { }} />
                    ) : (
                        <SecondaryButton text="Draft" color="#F6A609" onClick={() => { }} />
                    )
                }

                {isPublished ?
                    (
                        <Button text="View Responses" onClick={() => { }} />
                    ) : (
                        <Button text="View Responses" disabled={true} onClick={() => { }} />
                    )
                }
            </div>

        </div>
    );
};

export default FormCard;
