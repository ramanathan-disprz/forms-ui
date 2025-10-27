import { SearchSharp } from "@mui/icons-material";

import NavigationBar from "../components/NavigationBar";
import Button from "../components/buttons/PrimaryButton";

import NoFormsExistImage from "../assets/NoFormsExistImage.png";
import "../styles/pages/forms-list/base.scss";
import FormCard from "../components/FormCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormListView: React.FC = () => {
  const navigate = useNavigate();
  const [shouldShowContent, setShouldShowContent] = useState(false);

  const forms = [
    { id: 1, title: "Post-Course Experience" },
    { id: 2, title: "Pre-Course Experience" },
    { id: 3, title: "Pre-Course Experience" },
    { id: 4, title: "Pre-Course Experience" },
    { id: 5, title: "Pre-Course Experience" },
    { id: 6, title: "Pre-Course Experience" },
    { id: 7, title: "Pre-Course Experience" },
    { id: 8, title: "Pre-Course Experience" },
    { id: 8, title: "Pre-Course Experience" }
  ];

  return (
    <div className="form-list-container">
      <NavigationBar />

      {shouldShowContent ? (
        <div className="no-content-wrapper">
          <div className="image-container">
            <img
              src={NoFormsExistImage}
              height={260}
              alt="No forms exist"
              className="no-forms-image"
            />
          </div>
          <div className="text-container">
            <h2>Create a Form Template</h2>
            <p className="subtitle">Create templates that can be used in various other features.</p>
            <div className="button-container">
              <Button text="Create Form" onClick={() => navigate("/form-builder/create")} />
            </div>
          </div>
        </div>
      ) : (
        <div className="content-wrapper">
          <div className="header">
            <span className="title">Form List</span>
            <div className="utils">
              <div className="search-bar">
                <SearchSharp className="search-icon" />
                <input type="text" placeholder="Search forms..." />
              </div>
              <div className="">
                <Button text="Create Form" onClick={() => navigate("/form-builder/create")} />
              </div>
            </div>
          </div>

          <div className="form-list">
            {forms.map((form) => (
              <FormCard
                key={form.id}
                title={form.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormListView;
