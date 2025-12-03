## How to start

1. Install dependencies
`$ yarn install`

2. Run on a development server
`$ yarn start`

3. The development server runs on `localhost:3000`

## Refactoring and Improvements

### Crisis Creation Modal (deans-frontend submodule)

[MODIFY] src/containers/ModalContainer/CreateNewCrisis/CrisisReportForm/index.js
-   **Refactored Form Submission Logic:**
    -   Extracted FormData creation into a createFormData helper method for improved readability and easier maintenance.
    -   Simplified checks for optional fields and the processing of arrays.

-   **Bug Fix:**
    -   Corrected the logic to ensure crisis_assistance_description is correctly populated from the assistanceDescription field.

-   **Improved Error Handling:**
    -   Added user-friendly error messages using message.error() on submission failure.
    -   Included console.error to log detailed error information for easier debugging.

-   **[ADD] Documentation & PropTypes:**
    -   Added JSDoc comments to document propTypes.
    -   Added the form prop to propTypes, which is injected by Ant Design's Form.create().

### Public Crisis Reporting Page (deans-frontend submodule)

[MODIFY] src/containers/PageReport/index.js
-   **Fixed Prop Type Warnings:**
    -   Corrected the propTypes for crisisType and assistanceType from array to object to match the actual data structure.
    -   Added defaultProps for crisisType, assistanceType, crises, and flag to prevent warnings on initial render.

-   **Corrected Prop Passing:**
    -   Changed the fallback value for crisisType and assistanceType from [] to {} when passing them to the CrisisReportForm component. This ensures the child component always receives an object, as expected.

[MODIFY] src/containers/PageReport/CrisisReportForm/index.js
-   **Standardized Form Logic:**
    -   Refactored handleSubmit and introduced a createFormData helper to maintain consistency with the other crisis reporting form.
    -   Improved error handling with user-facing messages and console logs.

-   **Corrected propTypes:**
    -   Updated propTypes for crisisType and assistanceType to expect an object.
    -   Added the form prop to propTypes.
    -   Made the flag prop optional.

-   **Fixed Form Field Integration (antd & react-places-autocomplete):**
    -   Resolved a warning caused by a conflict between getFieldDecorator and the PlacesAutocomplete component.
    -   Removed getFieldDecorator from the location field and implemented manual validation to handle the address input.
        -   This included adding a locationError to the component's state.
        -   The handleSubmit method was updated to manually validate the address field.
        -   The handleChange and handleSelect methods were updated to manage the address and its validation state.