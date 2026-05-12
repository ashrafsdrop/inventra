# Inventra ERP
## Web Engineering Project Report Draft

Course Code: CSE 3391
Course Name: Web Engineering

Submitted to
Name: Naeem Mia
Lecturer, Department of CSE

Submitted by
Group Details

| ID | Name |
| --- | --- |
| [Add ID] | [Add Name] |
| [Add ID] | [Add Name] |

Date of Submission: 11-05-2026

## Table of Contents

1. Introduction
2. Problem Statement
3. Background Research
4. Design and Architecture
5. Development of the System
6. Testing Results
7. Conclusion and Future Scope
8. References

## 1. Introduction

### 1.1 Overview of Web Engineering
Web Engineering is the systematic development of web-based applications using structured methods, modern tools, and user-centered design practices. It focuses on building systems that are scalable, secure, maintainable, and easy to use.

### 1.2 Role of Web Engineering in Modern Applications
Modern organizations depend on web applications to manage business operations, communicate with users, and process data in real time. Web Engineering helps ensure that these applications remain reliable, responsive, and adaptable as business needs grow.

### 1.3 Importance of Inventra ERP
Inventra ERP is a web-based enterprise resource planning system designed to manage core business activities from a single platform. It supports inventory, sales, purchases, customers, suppliers, accounts, and reporting in one integrated workflow. This reduces manual work, improves accuracy, and gives users better visibility into daily operations.

### 1.4 Objectives of the Report
The objectives of this report are to:
- Describe the purpose and scope of Inventra ERP.
- Explain the system design and development approach.
- Present the main modules and workflow of the application.
- Summarize the testing and validation process.
- Provide a foundation for adding screenshots, diagrams, and final documentation later.

### 1.5 Scope of the System
Inventra ERP covers the essential operational modules of a small to medium business platform. The system includes:
- User authentication through login and signup.
- Dashboard overview with quick access to business modules.
- Customer and supplier management.
- Inventory and product management.
- Purchase and sales workflows.
- Accounts and financial reporting.
- Category-based reporting for business analysis.

### 1.6 Methodology
The project follows an iterative web development approach. The front end is built with Next.js and React, while the backend is implemented with Django. The application uses a database-driven architecture so that business records can be stored, retrieved, and managed efficiently.

## 2. Problem Statement

### 2.1 Limitations of Manual Business Management
Many small business operations still rely on spreadsheets, paper records, or disconnected tools. This can lead to duplicated data, reporting errors, slow approvals, and difficulty tracking transactions across departments.

### 2.2 Challenges in a Disconnected System
- Inventory updates may not match sales and purchase records.
- Customer and supplier data can be scattered across files.
- Financial reporting may take too long to prepare.
- It is difficult to monitor business performance in real time.
- Users often need to switch between multiple tools to complete one task.

### 2.3 Objectives of the Proposed System
Inventra ERP is intended to:
- Centralize operational data in one system.
- Simplify sales, purchase, and inventory workflows.
- Provide a structured way to manage accounts and reports.
- Improve access to business information through a dashboard.
- Make the interface easy to use for day-to-day operations.

### 2.4 Success Criteria
The project can be considered successful if it:
- Supports the main ERP modules without errors.
- Stores and displays records correctly.
- Provides a responsive and intuitive user interface.
- Produces useful reports for operational review.
- Allows later insertion of screenshots, diagrams, and visual documentation.

## 3. Background Research

### 3.1 Evolution of Enterprise Web Applications
Enterprise web applications have evolved from simple record-keeping portals into integrated systems that manage finance, inventory, sales, and communication. Modern ERP platforms combine multiple workflows into a single interface.

### 3.2 Principles of Web Application Design
Good web applications should be secure, consistent, maintainable, and efficient. For ERP systems, usability is especially important because users interact with the software throughout the workday.

### 3.3 Common Models of Web Development
Inventra ERP follows a component-based front-end approach and a model-driven backend structure. The application separates presentation, business logic, and data storage to keep the codebase organized.

### 3.4 Review of Related Systems
ERP platforms and business dashboards typically provide modules for inventory, sales, purchases, accounting, and analytics. Inventra ERP combines these features in a lightweight web-based system tailored for operational control and reporting.

## 4. Design and Architecture

### 4.1 Requirements Analysis
#### Functional Requirements
- User login and signup.
- Dashboard overview.
- Inventory and product management.
- Sales invoice and sale return workflow.
- Purchase order and purchase invoice workflow.
- Customer and supplier management.
- Account management and report browsing.

#### Non-Functional Requirements
- Responsive design for desktop and tablet use.
- Secure handling of application data.
- Clear navigation between modules.
- Maintainable component-based structure.
- Fast loading and smooth user interaction.

### 4.2 System Architecture
Inventra ERP uses a web application architecture with a Next.js front end and a Django backend. The front end renders user interfaces and communicates with backend APIs. The backend handles data processing, business rules, and persistence through the database.

[Insert architecture diagram here]

### 4.3 UML Diagrams
UML diagrams should be added here to show the structure and behavior of the system.

[Insert use case diagram here]
[Insert class diagram here]
[Insert sequence diagram here]

### 4.4 Activity Diagram
The activity diagram should show the main workflow of a user interacting with Inventra ERP, starting from authentication and continuing through module navigation, record management, and report viewing.

[Insert activity diagram here]

### 4.5 User Interface Design
The interface uses a modern dashboard layout with a sidebar, top-level navigation, and separate pages for each functional module. The design should highlight the main business areas clearly so users can move between accounts, inventory, sales, purchases, and reports with minimal effort.

[Insert homepage screenshot here]
[Insert dashboard screenshot here]
[Insert module page screenshot here]
[Insert report page screenshot here]

## 5. Development of the System

### 5.1 Development Environment and Tools
- Front end: Next.js, React, Tailwind CSS
- Back end: Django
- Language: JavaScript and Python
- Database: SQLite for development
- Editor: Visual Studio Code

### 5.2 Front-End Development
The front end is organized into reusable pages and components. Dashboard sections, cards, tables, forms, and sidebar navigation are separated into smaller UI pieces so the application remains easier to maintain and extend.

### 5.3 Back-End Development
The backend handles data processing, serializers, views, and routing for the business modules. Each module is separated into its own app structure so that inventory, sales, purchases, customers, suppliers, and accounts can evolve independently.

### 5.4 Database Implementation
The database stores records for business operations and supports structured access to users, customers, suppliers, accounts, products, purchases, and sales. Relationships between records are managed so the system can generate meaningful summaries and reports.

### 5.5 Security Implementation
Basic security practices should include authenticated access, protected form submission, and safe handling of user input. Additional measures can be added later depending on the deployment environment.

## 6. Testing Results

### 6.1 Testing Strategies
The system should be tested through functional checks, interface verification, and module-by-module validation. Important areas include form submission, navigation, data display, and report access.

### 6.2 Sample Test Cases and Results
- Login and signup forms load correctly.
- Dashboard navigation opens the correct module pages.
- Inventory, sales, purchase, and account pages render without layout issues.
- Report pages display the expected report categories.
- Responsive layout remains usable on smaller screens.

## 7. Conclusion and Future Scope

### 7.1 Achievements of the Project
Inventra ERP provides a unified web-based platform for managing essential business operations. The project demonstrates how a modern ERP-style interface can combine multiple workflows into one organized system.

### 7.2 Limitations
- Some modules may still need full data integration and validation.
- Report visuals and charts can be expanded further.
- Advanced permissions and multi-role controls can be improved.
- Final screenshots and diagrams are still to be inserted.

### 7.3 Future Enhancements
- Add richer analytics and chart-based reporting.
- Improve authentication and role-based access control.
- Extend module coverage for additional business workflows.
- Add export options for reports and transaction records.
- Insert final UI images, diagrams, and presentation visuals.

## 8. References

- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev
- Django Documentation: https://docs.djangoproject.com
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Inventra project source code and backend modules