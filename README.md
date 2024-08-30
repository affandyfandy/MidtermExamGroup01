# POS Management System

## Overview
This project is a web-based POS (Point of Sale) management system that allows for managing customers, products, and invoices. The application is built using Angular for the frontend and Spring Boot for the backend. The backend handles CRUD operations and business logic, while the frontend provides a user interface for interacting with the application.

## Technologies Used
### [Backend](backend) (Spring Boot Application)
- Spring Boot: A Java framework for building robust and scalable web applications.
- MySQL: A relational database management system used to store data.
- Swagger (Springdoc OpenAPI): For API documentation and testing.
- Apache POI: A Java library for reading and writing Microsoft documents.
- Lombok: A Java library that minimizes boilerplate code.
- iTextPDF: A library for creating and manipulating PDF documents.

### [Frontend](frontend) (Angular Application)
- Angular: A framework for building client-side applications with HTML, CSS, and JavaScript/TypeScript.
- Angular Material: A UI component library for Angular applications.
- RxJS: A library for reactive programming using observables.
- Bootstrap: A framework for building responsive web applications.
- HTML & CSS: For the structure and styling of the web application.
- Tailwind: For styling of the web application.

## Running the Application
### Backend
- Create a MySQL database named mid1.
- Configure the database username and password in the [application.properties](backend/src/main/resources/application.properties) file located in the src/main/resources directory.
- Execute mvn spring-boot:run in the backend project directory.
- The backend application will be accessible at http://localhost:8080.

### Frontend
- Navigate to the frontend project directory and run npm install to install all dependencies.
- Execute ng serve in the frontend project directory.
- The frontend application will be accessible at http://localhost:4200.

## Member
| GitHub                                                               | Name                            |
|----------------------------------------------------------------------|---------------------------------|
| [manuellaiv](https://github.com/manuellaiv)                          | Manuella Ivana Uli Sianipar     |
| [irhamnaufal8](https://github.com/irhamnaufal8)                      | Muhammad Irham Naufal Al Machdi |
| [ryuzakijebi](https://github.com/ryuzakijebi)                                              | Jebi Hendardi                   |