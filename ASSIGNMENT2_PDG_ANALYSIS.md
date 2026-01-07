# Assignment 2: Program Dependency Graph (PDG) Analysis
## Dean's Frontend Component
**Student Name:** eisraq  
**Branch:** assignment2_eisraq  
**Repository:** deans-frontend  

---

## Assignment Description

### Component/Module Addressed (1 mark)

This analysis focuses on the **deans-frontend** component of the Dean's Crisis Management System, specifically examining the React-Redux web application that serves as the user interface for crisis reporting and monitoring. The analyzed system encompasses:

- **Application Bootstrap Layer** (index.js) - Entry point and routing configuration
- **State Management Layer** (Redux store, reducers, actions) - Centralized state architecture
- **API Service Layer** (api/index.js) - Backend communication interface with CSRF/authentication
- **Component Layer** (React containers and presentational components) - UI implementation
- **External Dependencies** (npm libraries) - Third-party library integration including React, Redux, Axios, Google Maps

The analysis covers 6 core files and multiple component modules, representing the complete data and control flow from user interaction through state management to backend API communication.

### Graph Completeness (3 marks)

The PDG created for this analysis is comprehensive and includes:

**1. Statement-Level Granularity (58 Internal Nodes)**
   - **N1-N9**: Entry point nodes covering imports, App component, Provider setup, routing, and ReactDOM rendering
   - **N10-N13**: Redux store configuration including createStore, middleware, and enhancers
   - **N14-N20**: Reducer functions with switch statements, state initialization, and combineReducers
   - **N21-N29**: Action creators covering crisis fetching, type loading, and real-time tracking
   - **N30-N42**: API service methods including HTTP operations (GET/POST/PUT) and authentication helpers (CSRF/Auth tokens)
   - **N43-N58**: Component lifecycle methods, event handlers, and conditional rendering logic

**2. External Library Dependencies (10 External Nodes)**
   - **EXT1-EXT10**: Core libraries (React, Redux, Axios) and specialized libraries (Google Maps, Ant Design, Places Autocomplete)
   - 19 external dependency edges showing coupling between internal nodes and external libraries

**3. Multiple Dependency Types**
   - **Data Dependencies**: 35+ edges showing data flow (imports, function calls, state propagation)
   - **Control Dependencies**: 16+ edges showing conditional execution (switch cases, lifecycle hooks, conditionals)
   - **External Dependencies**: 19 edges showing library coupling and vendor lock-in risks

**4. Multi-Level Abstraction**
   - **Statement-Level PDG**: Fine-grained analysis showing individual function calls and statements
   - **Module-Level PDG**: High-level view showing dependencies between 8 major modules (M1-M8)


**5. Critical Path Analysis**
   - 4 critical execution paths identified: Bootstrap, Data Fetch, Authentication Flow, Map Rendering
   - Each path traces dependencies from entry point through external libraries to backend API

### Impact and Insights (1 mark)

**Key Insights Gained:**

1. **Architectural Understanding**: The PDG reveals a well-structured Redux architecture with clear separation between presentation (components), business logic (actions), and state management (reducers). The unidirectional data flow pattern is clearly visible through dependency chains.

2. **External Coupling Risks**: Analysis identified **high vendor lock-in risk** with google-map-react (EXT8) affecting the GMap component, while the API layer shows **low coupling risk** with Axios due to good abstraction practices. This insight enables strategic planning for library migrations.

3. **Critical Nodes Identification**: Four high-impact nodes were identified:
   - **N12 (createStore)**: Application-critical - failure prevents entire app from functioning
   - **N24 (getCrises API)**: Feature-critical - affects map, tables, and status displays
   - **N37-N42 (Axios methods)**: Well-abstracted and easily replaceable
   - **N51 (GMap component)**: High external dependency requiring interface abstraction

4. **Maintainability Insights**: The PDG shows that changes to the Redux state structure (N14-N20) have **high ripple effects** across all components, while adding new API endpoints (N30-N42) has **low impact** due to isolation. This guides development prioritization and testing strategies.

5. **Refactoring Opportunities**: The analysis revealed that wrapping Ant Design (EXT9) and Google Maps (EXT8) in custom interfaces would reduce coupling risk from **HIGH to MEDIUM**, making future migrations significantly easier.

**Practical Applications:**
- **Testing Strategy**: Focus on critical paths and high-impact nodes (N12, N24) for test coverage
- **Migration Planning**: Prioritize abstracting Google Maps interface to reduce vendor lock-in
- **Code Reviews**: Pay special attention to changes in reducers (N14-N20) due to system-wide impact
- **Performance Optimization**: The dependency graph shows async action flows (N21-N29) as potential bottlenecks

---

## 1. Introduction

This document presents a Program Dependency Graph (PDG) analysis of the Dean's Crisis Management System frontend. The PDG shows **data dependencies** and **control dependencies** between program components, including **external library dependencies**.

---

## 2. Scope

**Files Analyzed:**
- `index.js` - Entry point
- `redux/store.js` - Store config
- `redux/reducers.js` - State reducers
- `redux/actions.js` - Action creators
- `api/index.js` - API layer
- `components/*` - React components

---

## 3. Node Definitions (58 Internal + 10 External)

### Internal Nodes (N1-N58)

**Entry Point (index.js):** N1-N9  
**Store (store.js):** N10-N13  
**Reducers (reducers.js):** N14-N20  
**Actions (actions.js):** N21-N29  
**API (api/index.js):** N30-N42  
**Components:** N43-N58

### External Library Nodes (EXT1-EXT10)

| Node | Library | Usage |
|------|---------|-------|
| EXT1 | react | Component framework |
| EXT2 | react-dom | DOM rendering |
| EXT3 | react-redux | Redux bindings |
| EXT4 | redux | State management |
| EXT5 | redux-thunk | Async actions |
| EXT6 | react-router-dom | Routing |
| EXT7 | axios | HTTP client |
| EXT8 | google-map-react | Map component |
| EXT9 | antd | UI library |
| EXT10 | react-places-autocomplete | Geocoding |


## 4. Dependency Analysis
### 4.1 Critical Paths

**Path 1: Bootstrap**
EXT2→N9→N7←EXT3←N1←N13

**Path 2: Data Fetch**
EXT1→N45→N21←EXT5→N24→EXT7→N37→Backend→Reducers→Store

**Path 3: Map Rendering**
N51←EXT8←EXT10 (High external coupling risk)

### 4.2 High-Impact Nodes

| Node | Impact | External Risk |
|------|--------|---------------|
| N12 (createStore) | Critical | High - Redux core |
| N24 (getCrises) | High | Medium - Axios |
| N37/N40/N42 (axios) | High | Low - Well abstracted |
| N51 (GMap) | Medium | High - Google Maps vendor lock-in |



## 5. External Dependencies Impact

### 5.1 Coupling Risk

| Library | Modules Affected | Risk | Migration Effort |
|---------|------------------|------|------------------|
| react | All | Critical | Complete rewrite |
| redux | M2, M3, M4 | High | Major refactor |
| axios | M5 | Low | Easy - well abstracted |
| google-map-react | M6 (GMap) | High | Component rewrite |
| antd | M6, M7 | Medium | UI replacement |

### 5.2 Recommendations

1. **Abstract Google Maps** - Create MapProvider interface
2. **Wrap Ant Design** - Custom component wrappers
3. **Keep API abstraction** - Current axios usage is good
4. **Pin critical versions** - React, Redux
5. **Regular security updates** - Axios

