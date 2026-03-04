# Getting Started with Employee Management System

In the project directory, you can run:

1.  Install Dependencies
### `npm install`


2.  Run the Application
### `npm start`

- Open (http://localhost:3000) to view it in your browser.



# RUNNING TESTS

Run tests: 
### `npm test`

Run with coverage: 
### `npm test -- --coverage`



# Decisions

- Employees can be searched by both ID and Name. While the requirement specified search by ID, name-based search was included to improve usability and convenience. This ensures users can easily locate employee records even if the exact ID is not known.

- Added Employee Details Page to view complete information about a selected employee. Instead of displaying limited details within the table, this page presents full employee information in a structured and readable layout. It can be accessed by clicking on the employee’s name.

- Implemented pagination to efficiently manage and display large numbers of employees. This improves performance and enhances user experience by limiting the number of records shown per page.
