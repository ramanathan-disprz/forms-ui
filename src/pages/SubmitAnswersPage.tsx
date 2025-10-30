import { useParams } from 'react-router-dom';
import { useFormWithQuestions } from '../api/forms/useForms';
import SubmitAnswersView from './SubmitAnswersView';

function SubmitAnswersPage() {
    const { id } = useParams<{ id: string }>();
    const { data: form, isLoading, error } = useFormWithQuestions(id!);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading form</div>;
    if (!form) return <div>Form not found</div>;

    return <SubmitAnswersView
        formId={id || "1"}
        formData={form}
    />;
}

export default SubmitAnswersPage;
