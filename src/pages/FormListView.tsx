import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";

import NoFormsExistImage from "../assets/NoFormsExistImage.png";
import "../styles/pages/forms-list/base.scss";

const FormListView: React.FC = () => {

  return (
    <div className="form-list-container">
      <NavigationBar />
      <div className="content-wrapper">
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
            <Button text="Create Form" onClick={() => { }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormListView;
