# HelpCircle — Your Local Community Problem Solver 🤝

**Connecting people who need help with trusted people who can provide it.**

HelpCircle is a community-driven web application designed to connect people with nearby helpers, local service providers, volunteers, and community members. Whether someone needs a plumber, electrician, tutor, volunteer, or community assistance, HelpCircle makes it easier to request help and connect with the right people.

The platform aims to build stronger, safer, and more supportive communities across neighborhoods, universities, housing societies, and cities in Pakistan.

## 🌟 Project Vision

Finding reliable help when you need it can be difficult. HelpCircle aims to simplify this process through a centralized platform where people can post requests, discover relevant services, connect with helpers, and track their requests.

Our mission is to make community assistance more accessible, organized, and trustworthy.

## ✨ Key Features

### 🏠 Community Help Requests
- Create and publish help requests.
- Browse requests posted by other community members.
- Categorize requests by type of assistance.
- Search and filter requests by category and location.
- Track the progress of help requests.

### 📍 Nearby Helper Matching
- Connect users with relevant local helpers.
- Match requests by category and service area.
- Support location-based discovery when enabled.
- Help service providers discover relevant requests.

### 🔐 Authentication & User Accounts
- User registration and login.
- Secure password hashing.
- JWT-based authentication.
- Role-based access control.
- Protected routes and account management.

### 🛡️ Trust & Safety
- Helper profiles and verification workflows.
- Ratings and reviews.
- Report and block functionality.
- Privacy-conscious communication.
- Moderation tools for administrators.

### ❤️ Community Support
- Voluntary blood-donor directory.
- Community assistance requests.
- Volunteer registration.
- Urgent request prioritization with appropriate safeguards.

### 🔔 Notifications
- Notifications for relevant help requests.
- Updates when request status changes.
- Real-time notifications using Socket.IO.

### 🤖 AI-Powered Assistance — Planned
- Automatic categorization of help requests.
- Smart matching recommendations.
- Natural-language request assistance.
- Improved discovery of relevant helpers.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development and build tooling |
| Tailwind CSS v4 | Responsive styling |
| Lucide React | Icons |
| React Router | Client-side navigation |
| Axios | HTTP requests |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database schemas and models |
| JWT | Authentication |
| bcrypt / bcryptjs | Password hashing |
| Cloudinary | Image uploads |
| Socket.IO | Real-time communication |
| AI API | Planned intelligent features |

## 📁 Project Structure

```text
HelpCircle/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── assets/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

*Note: The structure may evolve as additional modules are implemented.*

## ⚙️ Getting Started

Follow these steps to run HelpCircle locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account
- [Git](https://git-scm.com/)
- A code editor such as Visual Studio Code

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd HelpCircle
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm install react-router-dom axios lucide-react sonner
npm install tailwindcss @tailwindcss/vite
```

Start the development server:

```bash
npm run dev
```

Vite will display the local URL in your terminal, typically `http://localhost:5173`.

### 3. Set Up the Backend

Open a second terminal:

```bash
cd HelpCircle/backend
npm install
```

Install the backend dependencies if they are not already present:

```bash
npm install express mongoose cors dotenv
npm install bcryptjs jsonwebtoken cookie-parser
npm install -D nodemon
```

Add the following scripts to the `scripts` section of `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Start the backend:

```bash
npm run dev
```

Make sure your backend entry point and configured port match your application.

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add other variables only when the corresponding services are configured.

**Important:** Never commit your `.env` file, database credentials, JWT secrets, or private API keys to GitHub. Use a `.env.example` file containing placeholder values for documentation.

## 🧩 How HelpCircle Works

1. **Register:** Users create an account and complete their profiles.
2. **Post a Request:** A user describes the assistance they need and selects a category.
3. **Discover Help:** Relevant helpers discover requests matching their skills and service areas.
4. **Connect:** The requester and helper communicate through the platform.
5. **Track Progress:** Request statuses are updated as assistance progresses.
6. **Build Trust:** Users can leave reviews and report suspicious behavior after an interaction.

## 🗺️ Development Roadmap

- [x] Define the project concept and technology stack.
- [ ] Configure the React frontend and Express backend.
- [ ] Build a responsive landing page and navigation.
- [ ] Implement registration, login, and protected routes.
- [ ] Develop help request creation and management.
- [ ] Add search, filters, and category-based discovery.
- [ ] Build helper profiles and matching functionality.
- [ ] Implement request tracking and notifications.
- [ ] Add reviews, reports, and admin moderation.
- [ ] Develop the voluntary blood-donor directory.
- [ ] Integrate AI-powered request categorization.
- [ ] Test, deploy, and document the application.

## 🔒 Security & Privacy

HelpCircle is intended to support safe community interactions. Important safeguards include:

- Hash passwords before storing them.
- Validate and sanitize user input on the server.
- Enforce authorization for protected operations.
- Rate-limit sensitive endpoints.
- Protect private contact information and precise location data.
- Verify helpers through a documented review process.
- Keep blood-donor participation voluntary and protect donor information.
- Never treat a platform profile or verification badge as a guarantee of personal safety.

HelpCircle is not an emergency-response service. Users should contact appropriate emergency services for urgent medical or other life-threatening situations.

## 🚀 Future Enhancements

- Progressive Web App (PWA) support.
- Urdu and English language support.
- Map-based helper discovery.
- Email and push notifications.
- AI-assisted request classification.
- Community groups for universities and housing societies.
- Analytics for community impact.
- Mobile-friendly and accessible user experiences.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your implementation.
5. Submit a pull request with a clear description.

## 📄 License

This project can be distributed under the MIT License once the repository includes a corresponding `LICENSE` file.

## 👨‍💻 Author

**Muhammad Shakir**

- GitHub: [MShakir7852](https://github.com/MShakir7852)
- LinkedIn: [Connect on LinkedIn](https://www.linkedin.com/in/muhammad-shakir-2a8242264/)
- Portfolio: [Visit Portfolio](https://portfolio-muhammad-shakir.vercel.app/)

---

**HelpCircle — Small acts of help can make a big difference. 💙**

*Built with the MERN stack to bring communities closer together.*
