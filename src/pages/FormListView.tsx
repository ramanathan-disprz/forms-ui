import { SearchSharp } from "@mui/icons-material";

import NavigationBar from "../components/NavigationBar";
import Button from "../components/buttons/PrimaryButton";

import NoFormsExistImage from "../assets/NoFormsExistImage.png";
import "../styles/pages/forms-list/base.scss";
import FormCard from "../components/FormCard";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForms } from "../api/forms/useForms";

const FormListView: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useForms();
  const hasNoFormsRef = useRef(false);
  hasNoFormsRef.current = !isLoading && (!data || data.length === 0);

  // Filter forms based on search
  const filteredForms = searchTerm
    ? data.filter((form: any) =>
      form.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : data;

  if (isLoading) {
    return (
      <div className="form-list-container">
        <NavigationBar />
        <div className="loading-wrapper">
          <p>Loading forms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-list-container">
        <NavigationBar />
        <div className="error-wrapper">
          <p>Error loading forms: {error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="form-list-container">
      <NavigationBar />

      {hasNoFormsRef.current ? (
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
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="">
                <Button text="Create Form" onClick={() => navigate("/form-builder/create")} />
              </div>
            </div>
          </div>

          <div className="form-list">
            {filteredForms.map((form: any) => (
              <FormCard
                key={form.id}
                id={form.id}
                title={form.title}
                publishedBy={form.publishedBy}
                publishedDate={form.publishedDate}
                isEnabled={form.formViewStatus === "ENABLED"}
                isPublished={form.formStatus === "PUBLISHED"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormListView;
