export const INDEX_FORMS = `
  query IndexForms {
    indexForms {
        id
        title
        description
        publishedBy
        publishedDate
        formStatus
        formViewStatus
        questionLimit
    }
}`;

export const FETCH_FORM_WITH_QUESTIONS = `
    query FetchFormWithQuestions($id: String!) {
        fetchFormWithQuestions(id: $id) {
            form {
                id
                title
                description
                publishedBy
                publishedDate
                formStatus
                formViewStatus
                questionLimit
                allowMultipleResponses
            }
            questions {
                 id
                type
                questionText
                description
                placeholder
                required
                order
                minLength
                maxLength
                minDate
                maxDate
                allowedFileTypes
                maxFileSizeMB
                maxTotalFileSizeMB
                maxFiles
                minValue
                maxValue
                multiSelect
                options{
                    id
                    label
                    value
                }
            }
        }
    }
`;

export const CREATE_FORM = `
    mutation CreateForm($request: FormRequestInput!) { 
        createForm(request: $request) {
            id
            title
            description
            publishedBy
            publishedDate
            formStatus
            formViewStatus
            questionLimit
            allowMultipleResponses
        }
    }
`;

export const UPDATE_FORM = `
    mutation UpdateForm($id: String!, $request: FormRequestInput!) {
        updateForm(id: $id, request: $request) {
            id
            title
            description
            publishedBy
            publishedDate
            formStatus
            formViewStatus
            questionLimit
            allowMultipleResponses
            
        }
    }
`;


export const DELETE_FORM = `
    mutation DeleteForm($id: String!) {
        deleteForm(id: $id)
    }
`;