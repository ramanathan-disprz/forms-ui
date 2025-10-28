import "../styles/pages/create-form/base.scss"

import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
import FormFooter from "../components/FormFooter";
import FormConfig from "../components/forms/FormConfig";
import FormLayout from "../components/forms/FormLayout";
import FormResponses from "../components/forms/FormResponses";

function FormControl() {
  const [selectedTab, setSelectedTab] =
    useState<'configuration' | 'layout' | 'responses'>('responses');

  return (
    <div className="create-form-container">

      <NavigationBar />

      <div className="create-form-content-wrapper">

        {/* Form Tab Header */}
        <div className="create-form-header">
          <span
            className={`form-tab-text ${selectedTab === 'configuration' ? 'active' : ''}`}
            onClick={() => setSelectedTab('configuration')}
          >
            Form Configuration
          </span>
          <span
            className={`form-tab-text ${selectedTab === 'layout' ? 'active' : ''}`}
            onClick={() => setSelectedTab('layout')}
          >
            Form Layout
          </span>

          <span
            className={`form-tab-text ${selectedTab === 'responses' ? 'active' : ''}`}
            onClick={() => setSelectedTab('responses')}
          >
            Form Responses
          </span>
        </div>

        {/* Form Body */}
        {selectedTab === 'configuration' ? (
          <FormConfig />
        )
          : selectedTab === 'layout' ? (
            <FormLayout />
          )
            : (
              <FormResponses />
            )}
      </div>

      {/* Form Footer */}
      <FormFooter />

    </div>
  )
}

export default FormControl;
