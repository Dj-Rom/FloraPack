# 🌸 FloraPack

**FloraPack** is a modern React + TypeScript application designed to manage and share floral packaging sets. It supports multilingual functionality, WhatsApp and Gmail integration, local data persistence via IndexedDB, and Redux state management. Ideal for businesses dealing with packaging workflows.

🔗 **Live Demo:** [https://dj-rom.github.io/FloraPack/](https://dj-rom.github.io/FloraPack/)

---

## 🚀 Features

- 🌍 Multilingual UI (EN, PL, RU, DE, NL, UA)
- 📦 Create and manage packaging lists
- 📨 Share info via WhatsApp and Gmail
- 🧠 Local persistence using IndexedDB
- 🗂️ Redux Toolkit for scalable state logic
- ⚡ Lightning-fast builds with Vite

---

## 📁 Project Structure

```
src/
├── assets/                     # Icons and logos
├── classes/                   # IndexedDB utility
├── components/                # UI components and forms
├── data/                      # Initial data, packs, languages
├── helpers/                   # Messaging and UI logic
├── pages/                     # Main and info pages
├── redux/                     # Redux store and slices
├── styles/                    # CSS styles
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
public/
├── index.html                 # HTML template
```

---

## 🧪 Tech Stack

- **React + TypeScript**
- **Redux Toolkit**
- **Vite**
- **IndexedDB**
- **CSS Modules**

---

## 📥 Installation

```bash
git clone https://github.com/dj-rom/FloraPack.git
cd FloraPack
npm install
```

---

## 🧪 Development

```bash
npm run dev
```

---

## 🏗️ Build

```bash
npm run build
```

---

## 🌐 Supported Languages

- 🇺🇸 English
- 🇵🇱 Polish
- 🇷🇺 Russian
- 🇩🇪 German
- 🇳🇱 Dutch
- 🇺🇦 Ukrainian

Language switching is handled in `SelectLanguage.tsx` and configured in `data/languages.tsx`.

---

## 💬 Communication Features

- **WhatsApp**: Send packaging details using the WhatsApp web API.
- **Gmail**: Auto-generate Gmail messages.
- Logic handled in `SelectWhatsApp.tsx` and `whatsAppMessageAndGmail.tsx`.

---

## 🧠 Local Storage

Data is stored locally in the browser using IndexedDB, managed via `classes/indexedDB.tsx`, ensuring data persistence between sessions.

---


