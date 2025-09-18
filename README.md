# Phishing Awareness Training Module

An interactive, mobile-first training module designed to educate users about phishing attacks, social engineering tactics, and security best practices. This module features engaging GSAP animations, interactive quizzes, and real-world examples to enhance learning and retention.

## Features

- **Mobile-First Design**: Fully responsive layout that works on all devices
- **Interactive Quizzes**: Randomized questions with instant feedback
- **Real-World Examples**: Practical examples of phishing attempts
- **GSAP Animations**: Smooth scrolling and engaging animations
- **Progress Tracking**: Visual indicators of progress through the training
- **Accessible**: Built with accessibility in mind

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for loading external resources)

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

## Usage

1. **Navigate through sections**: Use the navigation menu or scroll through the page
2. **Interactive elements**: Hover over and click on cards and buttons to see effects
3. **Take the quiz**: Test your knowledge with the interactive quiz
4. **View examples**: Click on "See Example" buttons to view real-world phishing scenarios

## Structure

```
phishing-awareness-training/
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js            # Core functionality
│   ├── quiz.js            # Quiz logic and questions
│   └── animations.js      # GSAP animations and interactions
├── images/                # Image assets
└── index.html             # Main HTML file
```

## Customization

### Adding Questions

To add or modify quiz questions, edit the `quizQuestions` array in `js/quiz.js`.

### Styling

- Main colors and variables are defined in `:root` in `css/styles.css`
- Animations can be adjusted in `js/animations.js`

## Best Practices

- Keep content up-to-date with current phishing trends
- Test on multiple devices and screen sizes
- Ensure all external links are secure (HTTPS)
- Regularly update dependencies

## Dependencies

- [GSAP](https://greensock.com/gsap/) - Animation library
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by real-world phishing attack scenarios
- Built with accessibility and user experience in mind
