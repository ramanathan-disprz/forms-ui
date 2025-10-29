import "../styles/pages/create-form/base.scss"

import NavigationBar from "../components/NavigationBar";
import { useCallback, useEffect, useRef, useState } from "react";
import FormFooter from "../components/FormFooter";
import FormConfig from "../components/forms/FormConfig";
import FormLayout from "../components/forms/FormLayout";
import { FormRequest, FormStatus, QuestionRequest } from "../features/forms/Form";
import { useUpdateForm } from "../api/forms/useForms";
import toast from "react-hot-toast";
import FormResponses from "../components/forms/FormResponses";

interface FormEditControlProps {
    formId: string;
    form: FormRequest;
    canEdit?: boolean;
}

function FormEditControl(
    {
        formId,
        form,
        canEdit = true }: FormEditControlProps) {

    const [selectedTab, setSelectedTab] =
        useState<'configuration' | 'layout' | 'responses'>('configuration');

    const [formData, setFormData] = useState(form);

    // Store only original question IDs to identify new vs existing questions
    const originalQuestionIdsRef = useRef<Set<string>>(new Set());

    const updateFormMutation = useUpdateForm();


    useEffect(() => {
        const idsSet = new Set<string>();

        form.questions?.forEach(q => {
            if (q.id) {
                idsSet.add(q.id);
            }
        });

        originalQuestionIdsRef.current = idsSet;
    }, [form]);

    const handleFormChange = useCallback((field: keyof FormRequest, value: any) => {
        setFormData(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    }, []);


    const prepareQuestionsForSubmit = (questions: QuestionRequest[] | undefined) => {
        if (!questions) return [];

        const questionsToSend: QuestionRequest[] = [];

        questions.forEach(question => {
            const { id, ...questionData } = question;

            if (id && originalQuestionIdsRef.current.has(id)) {
                questionsToSend.push(question);
            } else {
                questionsToSend.push(questionData);
            }
        });

        return questionsToSend;
    };

    const handleNext = () => {
        setSelectedTab('layout');
    };

    const handlePublish = () => {
        const questionsToSubmit = prepareQuestionsForSubmit(formData.questions);
        const publishForm: FormRequest = {
            title: formData.title,
            formStatus: FormStatus.PUBLISHED,
            questions: questionsToSubmit
        };

        console.log('Sending publish form:', JSON.stringify(publishForm, null, 2));

        updateFormMutation.mutate(
            { id: formId, formData: publishForm }, {
            onSuccess: (data) => {
                console.log('Form published successfully:', data);
                toast.success('Form published successfully');
                setFormData(prev => ({ ...prev, id: data.id }));
            },
            onError: (error) => {
                console.error('Failed to save draft:', error);
            }
        });
    };

    const handleSaveDraft = () => {
        const questionsToSubmit = prepareQuestionsForSubmit(formData.questions);
        const draftForm: FormRequest = {
            title: formData.title,
            questions: questionsToSubmit
        };

        console.log('Sending draft form:', JSON.stringify(draftForm, null, 2));

        updateFormMutation.mutate(
            { id: formId, formData: draftForm }, {
            onSuccess: (data) => {
                console.log('Draft updated successfully:', data);
                toast.success('Form published successfully');
                setFormData(prev => ({ ...prev, id: data.id }));
            },
            onError: (error) => {
                console.error('Failed to save draft:', error);
            }
        });
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

                    {!canEdit ? (
                        <span
                            className={`form-tab-text ${selectedTab === 'responses' ? 'active' : ''}`}
                            onClick={() => setSelectedTab('responses')}
                        >
                            Form Responses
                        </span>
                    ) : (<></>)
                    }
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
                canEdit={canEdit}
                selectedTab={selectedTab}
                onNext={handleNext}
                onPublish={handlePublish}
                onSaveDraft={handleSaveDraft}
            />

        </div>
    )
}

export default FormEditControl;
