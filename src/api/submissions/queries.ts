export const SUBMIT_FORM = `
    mutation SubmitForm($request: FormSubmissionRequestInput!) {
        submitForm(request: $request)
    }
`;

export const DELETE_SUBMISSION = `
    mutation DeleteSubmission($id: String!) {
        deleteSubmission(id: $id)
    }
`;