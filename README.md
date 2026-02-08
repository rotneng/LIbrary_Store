LIBRARY CATALOG A full-stack Book Management Library application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to view available books, while administrators can manage the inventory by adding, editing, and deleting books.

✨ Features

Authentication & Authorization:
User Signup & Login with secure password hashing (bcrypt).
JWT (JSON Web Token) based session management.
Show/Hide Password toggle for better UX.
Role-based access (Admin vs. Regular User).
Book Management (CRUD):
Create: Admins can add new books with details like title, author, category, stock, and cover image.
Read: Browse the complete collection of books.
Update: Edit book details (stock, location, descriptions).
Delete: Remove books from the library.
User Experience:

Responsive and clean UI.
No Alerts: Native browser alerts have been replaced with modern, inline success/error status messages.
Auto-redirects after successful actions (Login, Signup, Add Book).
🛠️ Tech Stack

Frontend React.js: Component-based UI. React Router DOM: For seamless page navigation. Axios: For making HTTP requests to the backend. CSS: Custom styling for a clean, card-based layout.

Backend Node.js & Express.js: Server-side logic and RESTful API architecture. MongoDB & Mongoose: NoSQL database for storing user and book data. Bcrypt.js: For password encryption. JsonWebToken (JWT): For secure authentication. Cors: To handle Cross-Origin Resource Sharing.
