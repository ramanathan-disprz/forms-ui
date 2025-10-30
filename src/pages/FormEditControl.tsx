import "../styles/pages/create-form/base.scss"

import NavigationBar from "../components/NavigationBar";
import { useCallback, useEffect, useRef, useState } from "react";
import FormFooter from "../components/FormFooter";
import FormConfig from "../components/forms/FormConfig";
import FormLayout from "../components/forms/FormLayout";
import { FormRequest, FormStatus, QuestionRequest, QuestionType } from "../features/forms/Form";
import { useUpdateForm } from "../api/forms/useForms";
import toast from "react-hot-toast";
import FormResponses from "../components/forms/FormResponses";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetFormState } from "../features/forms/useFormStates";

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

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const setFormState = useSetFormState();
    const tabParam = searchParams.get('tab');
    const initialTab = (tabParam === 'responses' || tabParam === 'layout' || tabParam === 'configuration')
        ? tabParam
        : 'configuration';

    const [selectedTab, setSelectedTab] =
        useState<'configuration' | 'layout' | 'responses'>(initialTab);

    const [formData, setFormData] = useState(form);

    // Store only original question IDs to identify new vs existing questions
    const originalQuestionIdsRef = useRef<Set<string>>(new Set());
    const originalOptionIdsRef = useRef<Map<string, Set<string>>>(new Map());

    const updateFormMutation = useUpdateForm();


    useEffect(() => {
        const questionIds = new Set<string>();
        const optionIdsMap = new Map<string, Set<string>>();

        form.questions?.forEach(q => {
            if (q.id) {
                questionIds.add(q.id);

                if (q.type === QuestionType.SELECT && q.options) {
                    const optionIds = new Set<string>();
                    q.options.forEach(opt => {
                        if (opt.id) {
                            optionIds.add(opt.id);
                        }
                    });
                    optionIdsMap.set(q.id, optionIds);
                }
            }
        });

        originalQuestionIdsRef.current = questionIds;
        originalOptionIdsRef.current = optionIdsMap;
    }, [form]);

    const handleFormChange = useCallback((field: keyof FormRequest, value: any) => {
        setFormData(prevForm => ({
            ...prevForm,
            [field]: value
        }));
    }, []);


    const prepareQuestionsForSubmit = (questions: QuestionRequest[] | undefined) => {
        if (!questions) return [];

        return questions.map(question => {
            let processedQuestion: any;

            // Handle question ID
            if (question.id && originalQuestionIdsRef.current.has(question.id)) {
                // Keep the ID for existing questions
                processedQuestion = { ...question };
            } else {
                // Remove ID for new questions
                const { id, ...questionWithoutId } = question;
                processedQuestion = questionWithoutId;
            }

            // Process options for SELECT questions
            if (processedQuestion.type === QuestionType.SELECT && processedQuestion.options) {
                const originalOptionsSet = question.id
                    ? originalOptionIdsRef.current.get(question.id) || new Set()
                    : new Set();

                processedQuestion.options = processedQuestion.options.map((option: any) => {
                    let processedOption: any;

                    // Handle option ID
                    if (option.id && originalOptionsSet.has(option.id)) {
                        // Keep the ID for existing options
                        const { order, ...optionWithoutOrder } = option;
                        processedOption = {
                            id: optionWithoutOrder.id,
                            value: optionWithoutOrder.value || '',
                            label: optionWithoutOrder.value || ''
                        };
                    } else {
                        // Remove ID and order for new options
                        const { id, order, ...optionWithoutIdAndOrder } = option;
                        processedOption = {
                            value: optionWithoutIdAndOrder.value || '',
                            label: optionWithoutIdAndOrder.value || ''
                        };
                    }

                    return processedOption;
                });
            }

            return processedQuestion;
        });
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
                toast.success('Form published successfully');
                setFormData(prev => ({ ...prev, id: data.id }));
                navigate(`/form-builder`);
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
                toast.success('Form published successfully');
                setFormData(prev => ({ ...prev, id: data.id }));
                navigate(`/form-builder`);
            },
            onError: (error) => {
                console.error('Failed to save draft:', error);
            }
        });
    };

    const handlePreview = () => {
        setFormState(form);
        navigate(`/form-builder/preview/${formId}`)
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
                        formData={formData}
                        onFormChange={handleFormChange}
                    />
                )
                    : selectedTab === 'layout' ? (
                        <FormLayout
                            formData={formData}
                            onFormChange={handleFormChange}
                        />
                    )
                        : (
                            <FormResponses
                                formId={formId}
                                formData={formData} />
                        )}
            </div>

            {/* Form Footer */}
            <FormFooter
                canEdit={canEdit}
                selectedTab={selectedTab}
                onNext={handleNext}
                onPublish={handlePublish}
                onSaveDraft={handleSaveDraft}
                onPreview={handlePreview}
            />
        </div>
    )
}

export default FormEditControl;
