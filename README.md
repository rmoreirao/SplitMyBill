# SplitMyBill 💸

A modern, accessible Progressive Web App for effortlessly splitting bills with friends.

🔗 **[Try it live!](https://rmoreirao.github.io/SplitMyBill/)**

## ✨ Features

- **Easy Bill Splitting** - Enter the number of friends, their names, and their expenses to calculate who owes whom
- **Multiple Bills per Person** - Add up to 10 separate bill entries per friend
- **Locale-Aware Formatting** - Automatically formats numbers according to your browser's locale settings
- **Minimal Transactions** - Calculates the optimal way to settle debts with the fewest payments
- **Progressive Web App** - Install on your device for offline access
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Accessible** - Built with accessibility in mind, including proper ARIA labels and keyboard navigation
- **Fun Easter Eggs** - Hidden surprises for the curious! 🦄

## 🚀 Getting Started

### Using the App

1. Visit [https://rmoreirao.github.io/SplitMyBill/](https://rmoreirao.github.io/SplitMyBill/)
2. Select the number of friends splitting the bill (2-20)
3. Enter each friend's name and their individual expenses
4. Click "Split Evenly" to see the summary of who owes whom

### Installing as PWA

For quick access, you can install SplitMyBill as an app on your device:
- **Desktop (Chrome/Edge)**: Click the install icon in the address bar
- **Mobile**: Use "Add to Home Screen" from your browser menu

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, flexbox, and grid layouts
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **[Pico.css](https://picocss.com/)** - Minimal CSS framework for base styling
- **[Animate.css](https://animate.style/)** - CSS animations library
- **[Google Fonts](https://fonts.google.com/)** - JetBrains Mono & Inter typefaces
- **[Phosphor Icons](https://phosphoricons.com/)** - Icon set
- **Service Worker** - Offline caching capabilities

## 💻 Local Development

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/rmoreirao/SplitMyBill.git

# Navigate to project directory
cd SplitMyBill

# Serve with any static file server, for example:
npx serve .
# or
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) (or the port shown by your server) in your browser.

## 📁 Project Structure

```
SplitMyBill/
├── index.html        # Main HTML entry point
├── app.js            # Application logic (ES6+)
├── styles.css        # Custom styles
├── service-worker.js # PWA offline support
├── manifest.json     # PWA manifest
└── docs/             # Documentation and prompts
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for friends who share meals together
