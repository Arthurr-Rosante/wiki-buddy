## What is _WikiBuddy_?

WikiBuddy is a web application built with **Next.js** that helps users extract relevant information from **Wikipedia** using [**TextRazor's** NLP API](https://www.textrazor.com).

Users can:

- Ask for information on a specific topic.
- Paste text from an article or blog, and WikiBuddy will extract key topics and provide related Wikipedia articles.

## 🚀 Features

✅ Query Wikipedia for information.  
✅ Process and analyze text to find related topics.  
✅ Provide insights using **TextRazor's** NLP engine.

### 🎯 How to Use WikiBuddy?

1. Enter a search query or paste text into the input field.
2. Click the Analyze button.
3. WikiBuddy will fetch relevant Wikipedia articles and related topics.
4. Browse and explore the extracted information.

## 🛠 Installation & Setup

Follow these steps to set up WikiBuddy locally:

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/Arthurr-Rosante/wiki-buddy.git
```

```bash
cd wiki-buddy
```

### 2️⃣ Install dependencies:

Using **npm**:

```bash
npm install
```

Or using **pnpm**:

```bash
pnpm install
```

### 3️⃣ Set up environment variables:

Create a .env.local file at the root of the project and add:

```bash
API_KEY="your_textrazor_api_key"
API_URL="https://api.textrazor.com"
```

👉 Get your API Key: Sign up at [TextRazor](https://www.textrazor.com/signup).

### 4️⃣ Run the development server:

```bash
npm run dev
```

Or with **pnpm**:

```bash
pnpm dev
```

### 5️⃣ Open the app:

Go to: http://localhost:3000 🚀

Or check the experimental version at: (wiki-buddy.vercel.app)[https://wiki-buddy.vercel.app]

### 📜 License

This project is licensed under the **MIT License**.
