import { useParams } from 'react-router-dom';
import { useFormSubmissionDetail } from '../api/submissions/useSubmissions';
import SubmissionView from './SubmissionView';

function SubmissionViewPage() {
    const { id } = useParams<{ id: string }>();
    const submissionId = id ? parseInt(id, 10) : 0;

    const { data: formSubmission, isLoading, error } = useFormSubmissionDetail(submissionId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading form</div>;
    if (!formSubmission) return <div>Form not found</div>;

    return <SubmissionView
        submissionId={submissionId || 1}
        formSubmission={formSubmission}
    />;
}

export default SubmissionViewPage;
