import "../styles/pages/create-form/base.scss"

import NavigationBar from "../components/NavigationBar";
import { useCallback, useState } from "react";
import FormFooter from "../components/FormFooter";
import FormConfig from "../components/forms/FormConfig";
import FormLayout from "../components/forms/FormLayout";
import FormResponses from "../components/forms/FormResponses";
import { FormRequest, FormStatus, FormViewStatus } from "../features/forms/Form";
import { useCreateForm } from "../api/forms/useForms";
import toast from "react-hot-toast";
import { useSetFormState } from "../features/forms/useFormStates";
import { useNavigate } from "react-router-dom";

function FormControl() {
  const navigate = useNavigate();
  const setFormState = useSetFormState();


  const [selectedTab, setSelectedTab] =
    useState<'configuration' | 'layout' | 'responses'>('configuration');

  const [form, setForm] = useState<FormRequest>({
    title: "Untitled Form",
    description: "",
    formViewStatus: FormViewStatus.ENABLED,
    questions: []
  });

  const createFormMutation = useCreateForm();

  const handleFormChange = useCallback((field: keyof FormRequest, value: any) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  }, []);

  const handleNext = () => {
    setSelectedTab('layout');
  };

  const handlePublish = () => {
    const publishedForm = {
      ...form,
      publishedBy: 23092003,
      publishedDate: new Date(),
      formStatus: FormStatus.DRAFT,
      questions: (form.questions || []).map(q => {
        const { id, ...questionWithoutId } = q;
        return questionWithoutId;
      })
    };

    console.log('Sending draft form:', JSON.stringify(publishedForm, null, 2));

    createFormMutation.mutate(publishedForm, {
      onSuccess: (data) => {
        toast.success('Form published successfully');
        setForm(prev => ({ ...prev, id: data.id }));
      },
      onError: (error) => {
        console.error('Failed to save draft:', error);
      }
    });
  };


  const handleSaveDraft = () => {
    const draftForm = {
      ...form,
      publishedBy: 23092003,
      publishedDate: new Date(),
      formStatus: FormStatus.DRAFT,
      questions: (form.questions || []).map(q => {
        const { id, ...questionWithoutId } = q;
        return questionWithoutId;
      })
    };

    console.log('Sending draft form:', JSON.stringify(draftForm, null, 2));

    createFormMutation.mutate(draftForm, {
      onSuccess: (data) => {
        console.log('Draft saved successfully:', data);
        toast.success('Draft saved successfully');
        setForm(prev => ({ ...prev, id: data.id }));
      },
      onError: (error) => {
        console.error('Failed to save draft:', error);
      }
    });
  };

  const handlePreview = () => {
    console.log("state set")
    setFormState(form);
    navigate("/form-builder/preview/1")
  };

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
          <FormConfig
            formData={form}
            onFormChange={handleFormChange}
          />
        )
          : selectedTab === 'layout' ? (
            <FormLayout
              formData={form}
              onFormChange={handleFormChange}
            />
          )
            : (
              <FormResponses />
            )}
      </div>

      {/* Form Footer */}
      <FormFooter
        selectedTab={selectedTab}
        onNext={handleNext}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
      />

    </div>
  );
}

export default FormControl;