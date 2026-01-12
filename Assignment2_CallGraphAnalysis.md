# Assignment 2: Execution-Based Call Graph Impact Analysis
**Name:** Rahimi - U2101345
**Repository:** deans-frontend  
**Target Module:** `src/containers/PageReport/`, its child components, and `redux/actions.js`  
**Graph Selected:** Call Graph (functions/methods and runtime interactions)

---

## 1. Addressed Component / Module (1 mark)

**Focus:**  
This analysis targets the *PageReport* crisis reporting feature, specifically:
- The container component in `src/containers/PageReport/`
- Its core child (form) component(s)
- Runtime data-fetching and submission logic in `redux/actions.js`

This module governs the user flow for reporting a crisis, managing both UI rendering (React) and state/data management (Redux).

---

## 2. Call Graph (Execution-Based) and Completeness (3 marks)

### A. **Starting Impact Set (SIS), Justification**

**SIS:** `PageReport.componentDidMount()`  
*Reasoning:* According to Chapter 6, the SIS is the first executed function in the relevant execution path. In this feature, componentDidMount() is the first executed method when the PageReport page is accessed. It initiates all subsequent runtime behavior, including data fetching, Redux dispatches, and rendering. Therefore, it correctly represents the SIS.

---

### B. **Identified Call Graph Nodes (Functions / Methods)**

Below are the explicit nodes in the call graph. Each node represents a callable unit that executes at runtime.

1. Entry / Initialization Nodes

- N1: PageReport.componentDidMount() (SIS)

- N2: fetchTypes() (invoked via props)

- N3: getCrises() (invoked via props)

2. Redux / Async Processing Nodes

- N4: fetchTypes Redux thunk (redux/actions.js)

- N5: getCrises Redux thunk (redux/actions.js)

- N6: Backend API calls (e.g. get crisis types, assistance types, agencies, crises)

- N7: Redux reducers / store update

These are grouped conceptually as Redux Processing, consistent with lecture-level abstraction.

3. Rendering and UI Nodes

- N8: PageReport.render()

- N9: CrisisReportForm (child component render)

5. User Interaction / Event Handler Nodes

- N10: CrisisReportForm.handleSelect() (location selection)

- N11: Geocoding utilities (geocodeByAddress, getLatLng)

- N12: CrisisReportForm.handleSubmit()

6. Submission / Completion Nodes

- N13: reportCrises() Redux action

- N14: reportCrises Redux thunk

- N15: Backend API submission

- N16: setComplete() / local state update

### C. **Call Graph Edges (Invocation Relationships)**

Each arrow below represents "may invoke during execution", exactly as defined in the lecture call graph.

1. Initialization Phase

- N1 → N2: componentDidMount() invokes fetchTypes()

- N1 → N3: componentDidMount() invokes getCrises()

2. Redux Execution Phase

- N2 → N4: fetchTypes() dispatches Redux thunk

- N3 → N5: getCrises() dispatches Redux thunk

- N4 → N6: thunk invokes backend API

- N5 → N6: thunk invokes backend API

- N6 → N7: API responses update Redux store

3. Render Propagation

- N7 → N8: Redux state change triggers render()

- N8 → N9: PageReport renders CrisisReportForm

4. User Interaction

- N9 → N10: user selects address (event handler)

- N10 → N11: geocoding utilities invoked

- N9 → N12: user submits form

5. Submission Flow

- N12 → N13: form dispatches reportCrises()

- N13 → N14: Redux thunk executed

- N14 → N15: backend API submission

- N15 → N16: success response triggers completion state

---

## 3. Impact / Insights Gained (1 mark)

### A. **Candidate Impact Set (CIS)**

*Per Chapter 6, CIS is the closure of all nodes (functions/components) directly or indirectly invoked from the SIS (`componentDidMount()`). This includes:*
- All runtime data fetch thunks and their result-handling reducers.
- All render-triggered React method edges (re-render can affect UI, child props, handlers).
- All handler methods in `CrisisReportForm`, including event handlers, validation, and submission logic.
- Redux action creator(s) dispatched during form submission and their corresponding reducers.

**Direct Impacts:**  
- Any modification to `componentDidMount` (SIS) immediately impacts API initialization flows, page data rendering and form props.

**Indirect Impacts (Ripple Effect):**  
- Changing form submission logic or Redux actions can affect API contract, reducer flows and UI consistency due to Redux subscription-driven re-renders.
- Form error handling and state updates can propagate through user experience, potentially causing UX issues if errors are not managed or delayed updates occur (e.g., network latency).
- Changing the initialization sequence (SIS) can have high fan-out and ripple if the order or data shape changes, as all children depend on up-to-date data.

### B. **Insights and Issues**

- **Fan-Out:** The SIS (`componentDidMount`) triggers two independent data-fetch flows and both affect the page's runtime state and render.
- **Runtime Propagation:** Redux's `mapStateToProps` and async thunks increase the ripple effect, as multiple state changes can propagate a cascade of re-renders and event handler rebindings.
- **Bug:** Current `CrisisReportForm.handleSubmit` appends `"crisis_assistance_description"` with the wrong value, which can lead to data corruption. For example, ripple effect reaching the data backend via call graph propagation.

### C. **Refactoring Recommendations**

- **Reduce fan-out**: Factor out sequential async logic in `fetchTypes` to ensure order and error handling consistency.
- **Isolate side effects**: Move geocoding logic and field normalization into utility functions, invoked outside of render logic to avoid tight runtime coupling.
- **Minimize ripple**: Pass only minimal, necessary data as props by storing derived data centrally in Redux (e.g., normalize crisis data) for ease of comparison, validation and debouncing.
- **Improve maintainability**: Add error boundaries and structured error handling throughout Redux and form flows.

---



**Keywords:** SIS, CIS, execution flow, call graph, ripple effect, Redux, React, async, fan-out, maintainability