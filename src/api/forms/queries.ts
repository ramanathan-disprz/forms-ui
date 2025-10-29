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

export const DELETE_FORM = `
    mutation DeleteForm($id: String!) {
        deleteForm(id: $id)
    }
`;