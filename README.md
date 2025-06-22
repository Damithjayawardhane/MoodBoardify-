# 🎨 MoodBoardify - Personal Mood Board Generator

A beautiful, modern web application for creating visual mood boards with drag-and-drop functionality, built with Angular 15.

## ✨ Features

- **📷 Image Upload**: Drag and drop or select multiple images to add to your mood board
- **📝 Text Elements**: Add custom text with editable content and styling
- **🎯 Stickers**: Choose from a variety of emoji-based stickers
- **🎨 Background Colors**: Customize your mood board with different background colors
- **🖱️ Drag & Drop**: Intuitive drag and drop interface for arranging elements
- **📐 Grid Toggle**: Toggle grid background for better alignment
- **💾 Auto Save**: Your work is automatically saved to localStorage
- **📤 Export**: Export your mood board as PNG or JPG images
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moodboardify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## 🛠️ Built With

- **Angular 15** - Frontend framework
- **Angular CDK** - Drag and drop functionality
- **html2canvas** - Image export functionality
- **SCSS** - Advanced styling
- **TypeScript** - Type safety

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── moodboard/          # Main mood board component
│   │   ├── toolbar/            # Toolbar with upload and controls
│   │   └── export-panel/       # Export functionality
│   ├── services/               # Shared services
│   ├── app.component.*         # Main app component
│   └── app.module.ts          # App module configuration
├── assets/                     # Static assets
└── styles.scss                # Global styles
```

## 🎯 How to Use

1. **Add Images**: Click "Upload Images" to select image files from your device
2. **Add Text**: Type in the text input and click "Add" or use "Quick Text"
3. **Add Stickers**: Click "Stickers" to choose from the emoji collection
4. **Arrange Elements**: Drag items around the mood board to position them
5. **Customize**: Change background colors and toggle the grid
6. **Export**: Click "Export as Image" to download your creation

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- html2canvas for the export functionality
- All the open source contributors who made this possible

---

Made with ❤️ for creative minds everywhere!
