import { useParams } from 'react-router-dom';
import FormResponseView from './FormResponseView';

function PreviewPage() {
    const { id } = useParams<{ id: string }>();

    return <FormResponseView
        formId={id || "1"} />;
}

export default PreviewPage;
