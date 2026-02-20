# 📌 Personal tech blog

A simple frontend application for creating, managing, and searching posts, with integration of an external API for generating content.

## 🚀 Features

- ✍️ Create custom posts (title + content)
- 🗑️ Clear all posts
- 🔢 Live posts counter
- 🌐 Load random posts from external API
- 🔄 Reload posts with simulated delay
- 🔍 Search posts by title
- ♻️ Restore original posts after filtering
- 📱 Fully responsive layout (mobile-friendly)

## 🧠 How It Works

The application uses a **state-driven approach** for managing UI:

- `idle` – initial state
- `loading` – fetching posts
- `success` – posts loaded successfully
- `error` – error handling
- `filtered` – displaying filtered results
- `noResults` – no matches found

Posts from API are cached to allow:
- efficient filtering
- restoring original data without refetching

## 🛠️ Tech Stack

- **HTML5** – semantic markup (valid structure)
- **CSS3** – responsive layout (Flexbox / adaptive design)
- **TypeScript** – type safety and better code structure
- **JavaScript (ES6+)** – DOM manipulation
- **Fetch API** – working with external API

## 🌍 API Used

- https://uselessfacts.jsph.pl/  
  Used to generate random post content.
## 📦 Project Structure
```
project-root/
│── index.html
│── login_form.html
│── signup_form.html
│── techblog.html
│── assets
│ └── img
│── styles/
│ ├── style.css
| ├── techblog.css
│ ├── signup.css
│ └── login.css
│── scripts/
│ ├── script.js
│ ├── posts.js
│ ├── techblog.js
│ └── dist/
│── src
│ ├── index.ts
│ ├── main.ts
│ ├── postsApi.ts
│ ├── types.ts
│ └── validator.ts
```
## 🔗 Live Demo

### 👉 [GitHub Pages](https://bohdansharubin.github.io/web-technologies/)  

## ⚙️ Installation & Run

```bash
# clone repository
git clone git@github.com:BohdanSharubin/web-technologies.git

# open project folder
cd web-techologies
```
Then simply open index.html in your browser
(or use Live Server for development).

## 🧩 Key Concepts Implemented

- State management without frameworks

- TypeScript interfaces and union types

- Async/await with API calls

- Separation of data and UI state

- DOM rendering based on state

### ⚠️ Notes

- API requests are asynchronous, so loading state is simulated with delay

-Cached posts are used to avoid unnecessary API calls

-Ensure TypeScript is compiled before running (/dist folder)

## 👨‍💻 Author

GitHub: [Bohdan Sharubin](https://github.com/BohdanSharubin)