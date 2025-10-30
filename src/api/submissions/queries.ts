export const SUBMIT_FORM = `
    mutation SubmitForm($request: FormSubmissionRequestInput!) {
        submitForm(request: $request)
    }
`;


export const INDEX_ALL_SUBMISSIONS_BY_FORM_ID = `
    query IndexFormSubmissionByFormId($formId: String!) {
        indexFormSubmissionByFormId(formId: $formId) {
            id
            formId
            userId
            submittedAt
        }
    }
`;

export const DELETE_SUBMISSION = `
    mutation DeleteSubmission($id: String!) {
        deleteSubmission(id: $id)
    }
`;