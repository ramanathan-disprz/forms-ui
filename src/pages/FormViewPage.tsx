import { useParams } from 'react-router-dom';
import { useFormWithQuestions } from '../api/forms/useForms';
import FormEditControl from './FormEditControl';

function FormViewPage() {
    const { id } = useParams<{ id: string }>();
    const { data: form, isLoading, error } = useFormWithQuestions(id!);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading form</div>;
    if (!form) return <div>Form not found</div>;

    return <FormEditControl
        formId={id || ""}
        form={form}
        canEdit={false} />;
}

export default FormViewPage;
