# SOCIALIZE 📱

"SOCIALIZE" is a social media platform that allows users to share photos, interact with content, and follow each other. The project aims to provide a seamless and enjoyable user experience through a simple and functional interface.

## ✨ Key Features

- **User Profile:** 👤
  - Each user has a dedicated profile page showcasing all their posts.
  - Users can edit their profile, including changing their profile picture, cover photo, and name.
  - Privacy settings allow users to hide their liked posts, shares, and lists of followers/following.
- **Posts and Interactions:** 🖼️
  - Users can publish photos with a title or any text content.
  - Interact with posts through Likes, Shares, and Comments.
  - Users can delete their own posts.
- **Following System:** 🤝
  - Users can follow other users.
  - Followers and Following lists are displayed on the profile page.
- **Content Discovery:** 🔍
  - **"For You":** A section that displays the latest posts from all users on the platform.
  - **"Following":** A section that shows posts only from the users you follow.
- **Account Management:** 🔒
  - Easy login/signUp functionality.
  - Easy logout functionality.
  - Option to permanently delete the account.
- **Multi-Language and Theme Support:** 🌐
  - The application supports **Arabic and English**, based on the user's browser settings.
  - Users can switch between two themes: **Dark** and **Light** mode.

---

## 🛠️ Technologies Used

This project was built using a powerful and modern stack of technologies:

### Backend

- **Laravel:** A robust and efficient PHP framework for building web applications.

  ![Laravel Logo](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)

### Frontend

- **React:** A JavaScript library for building interactive user interfaces.

  ![React Logo](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

- **Redux:** A predictable state container for managing application state.

  ![Redux Logo](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

- **MUI (Material-UI):** A React component library for easy UI design.

  ![MUI Logo](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)

- **Axios:** A promise-based HTTP client for the browser and Node.js.

  ![Axios Logo](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

### Database

- **MySQL:** An open-source relational database management system.

  ![MySQL Logo](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

---

## Getting Started

### 1. Prerequisites

- Node.js (latest LTS recommended)
- PHP >= 8.1
- Composer
- MySQL Server

### 2. Backend Setup (Laravel)

```bash
cd laravel
composer install
cp .env.example .env
# Edit your database credentials in the .env file
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

- **Note:** Make sure MySQL is running and your database credentials are correct in `.env`.

### 3. Frontend Setup (React)

```bash
cd ../react
npm install
npm run dev
```

- **Note:** You can update the API base URL in the frontend `.env` file if needed.

---

## Developer Tips

- Follow RESTful conventions for any new API endpoints.
- Use Redux for any global state management in the frontend.
- Use ESLint and Prettier to maintain code quality in the frontend.

---

## Support & Contact

For any questions or suggestions, please contact me on x.com https://x.com/nooreldin_wd.

---

<div align="center">

**Wishing you a enjoyable experience with SOCIALIZE!**

</div>
