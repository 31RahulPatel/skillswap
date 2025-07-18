# 🎯 Skill Swap Platform - AamMunde Team

A modern web application where users can exchange skills and knowledge with each other. Built for Odoo Hackathon 2025.

Hacathon status: We got Selected 🏆 for Fisrt Round.

## 🌟 Features

### ✅ Complete User System
- **User Registration & Login** - Secure JWT authentication
- **Profile Management** - Photo upload, location, availability
- **Public/Private Profiles** - Privacy controls

### ✅ Skills Management
- **Skills I Can Teach** - List your expertise
- **Skills I Want to Learn** - Set learning goals
- **Skill Categories** - Organized skill system

### ✅ Advanced Search & Browse
- **Search by Name** - Find specific users
- **Search by Skills** - Find skill matches
- **Search by Location** - Local connections
- **Combined Filters** - Multi-criteria search

### ✅ Swap Request System
- **Send Requests** - Propose skill exchanges
- **Accept/Reject** - Manage incoming requests
- **Request Tracking** - Monitor all exchanges
- **Delete Requests** - Cancel pending requests

### ✅ Rating & Feedback
- **Post-Swap Reviews** - Rate experiences
- **User Ratings** - Build reputation
- **Feedback Comments** - Detailed reviews

### ✅ Modern UI/UX
- **Glassmorphism Design** - Modern visual effects
- **Dark/Light Themes** - User preference
- **Responsive Design** - Mobile-friendly
- **Real-time Notifications** - Instant feedback
- **Smooth Animations** - Professional interactions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication
- **Multer** - File uploads

### Database
- **PostgreSQL** - Relational database
- **Optimized Schema** - Efficient queries
- **Indexed Tables** - Fast performance

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/madhav-09/AamMunde-Odoohackathon25.git
cd AamMunde-Odoohackathon25
```

2. **Setup Database**
```bash
# Create database
psql -U postgres -c "CREATE DATABASE skillswap;"

# Run schema
psql -U postgres -d skillswap -f database/schema.sql
```

3. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
echo "PORT=5001
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=skillswap
DB_USER=postgres
DB_PASSWORD=your_password" > .env

# Start backend
npm run dev
```

4. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

5. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 📱 Usage

1. **Register Account** - Create your profile
2. **Add Skills** - List what you can teach/want to learn
3. **Browse Users** - Find skill matches
4. **Send Requests** - Propose skill swaps
5. **Manage Swaps** - Accept/reject requests
6. **Leave Reviews** - Rate your experiences

## 🎨 Design

The application follows a modern glassmorphism design with:
- Frosted glass effects
- Smooth animations
- Professional color scheme
- Intuitive navigation
- Mobile-responsive layout

## 🏆 Hackathon Highlights

### Innovation
- **Skill Exchange Economy** - Unique peer-to-peer learning
- **Smart Matching** - Advanced search algorithms
- **Community Building** - Social networking for skills

### Technical Excellence
- **Modern Architecture** - Clean, scalable code
- **Security First** - JWT auth, input validation
- **Performance Optimized** - Fast queries, efficient UI
- **User Experience** - Intuitive, accessible design

### Business Impact
- **Knowledge Sharing** - Democratize learning
- **Community Connection** - Local skill networks
- **Economic Value** - Skill-based economy

## 👥 Team AamMunde

Built with ❤️ for Odoo Hackathon 2025

## 📄 License

MIT License - See LICENSE file for details
