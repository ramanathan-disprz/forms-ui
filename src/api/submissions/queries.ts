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

export const INDEX_FORM_SUBMISSION_BY_USER_ID = `
  query IndexFormSubmissionByUserId($userId: Long!) {
    indexFormSubmissionByUserId(userId: $userId) {
      id
      formId
      userId
      submittedAt
    }
  }
`;

export const FETCH_FORM_SUBMISSION = `
    query FetchFormSubmission($id: Long!, $includeAnswers: Boolean!) {
        fetchFormSubmission(id: $id, includeAnswers: $includeAnswers) {
            submission {
                id
                formId
                userId
                submittedAt
            }
            answers {
                id
                submissionId
                questionId
                questionType
                valueText
                valueJson
            }
        }
    }
`;

export const DELETE_SUBMISSION = `
    mutation DeleteSubmission($id: String!) {
        deleteSubmission(id: $id)
    }
`;