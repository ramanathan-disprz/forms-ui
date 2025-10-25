import "../styles/pages/create-form/base.scss"

import NavigationBar from "../components/NavigationBar";
import { useState } from "react";
import FormInputItem from "../components/FormInputItem";
import FormVisiblity from "../components/FormVisiblity";
import FormFooter from "../components/FormFooter";

function CreateForm() {
  const [selectedTab, setSelectedTab] =
    useState<'configuration' | 'layout'>('configuration');

  return (
    <div className="create-form-container">
      
      <NavigationBar />

      <div className="create-form-content-wrapper">

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
        </div>

        {selectedTab === 'configuration' ? (
          <div className="create-form-configuration">
            <h2 className="form-details-title">Form Details</h2>

            <div className="form-details-inputs">

              <FormInputItem
                label="Form Name"
                inputType="text"
                valuePlaceholder="Post-Course Experience"
                isRequired={true}
                maxLength={80}
              />

              <FormInputItem
                label="Form Description"
                inputType="textarea"
                valuePlaceholder="Internal feedback collection to evaluate content effectiveness, instructor performance, and learner experience."
                isRequired={false}
                maxLength={200}
              />

              <FormVisiblity
                enabled={false}
                onToggle={() => { }}
              />

            </div>
          </div>
        )
          : (
            <div className="create-form-layout">Layout</div>
          )}
      </div>

      <FormFooter />
      
    </div>
  )
}

export default CreateForm;
