// Quiz functionality for Phishing Awareness Training

document.addEventListener('DOMContentLoaded', function() {
    // Quiz state
    const quizState = {
        currentQuestionIndex: 0,
        score: 0,
        questions: [],
        userAnswers: [],
        quizCompleted: false
    };

    // DOM elements
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const feedbackElement = document.querySelector('.quiz-feedback');
    const nextButton = document.getElementById('next-question');
    const questionNumberElement = document.getElementById('question-number');
    const totalQuestionsElement = document.getElementById('total-questions');

    // Quiz questions with answers and explanations
    const quizQuestions = [
        {
            question: "You receive an email from your bank asking you to click a link to verify your account information. What should you do?",
            options: [
                "Click the link and enter your information",
                "Forward the email to your bank's security team and delete it",
                "Reply to the email asking if it's legitimate",
                "Forward the email to your coworkers to warn them"
            ],
            correctAnswer: 1,
            explanation: "Legitimate banks will never ask you to verify sensitive information via email. Forwarding suspicious emails to your bank's security team helps them track phishing attempts."
        },
        {
            question: "Which of the following is a common sign of a phishing email?",
            options: [
                "Personalized greeting with your full name",
                "Professional logo and branding",
                "Urgent request for immediate action",
                "Company contact information in the footer"
            ],
            correctAnswer: 2,
            explanation: "Phishing emails often create a sense of urgency to pressure you into acting quickly without thinking carefully."
        },
        {
            question: "What should you do if you accidentally click on a suspicious link in a phishing email?",
            options: [
                "Close the browser tab and forget about it",
                "Run a full system antivirus scan and change any exposed passwords",
                "Send an email to the sender asking if it was legitimate",
                "Take no action unless you notice something wrong with your computer"
            ],
            correctAnswer: 1,
            explanation: "If you click a suspicious link, immediately run a security scan and change any passwords that might have been compromised to prevent unauthorized access."
        },
        {
            question: "Which of these URLs is most likely to be a phishing attempt?",
            options: [
                "https://www.paypal.com/account/login",
                "https://www.paypal.com.security-update.com/login",
                "https://www.paypal.com/help/security",
                "https://www.paypal.com/business/security"
            ],
            correctAnswer: 1,
            explanation: "The domain is actually 'security-update.com', not 'paypal.com'. Phishers often use subdomains or similar-looking domains to trick users."
        },
        {
            question: "What is 'spear phishing'?",
            options: [
                "A type of fishing with a spear",
                "A targeted phishing attack on specific individuals or organizations",
                "A security feature in email clients",
                "A method of encrypting emails"
            ],
            correctAnswer: 1,
            explanation: "Spear phishing is a highly targeted attack where the attacker researches the victim to make the scam more convincing, often using personal information to gain trust."
        },
        {
            question: "Which of the following is NOT a recommended security practice?",
            options: [
                "Using the same password for multiple accounts",
                "Enabling two-factor authentication",
                "Regularly updating your software",
                "Being cautious with email attachments"
            ],
            correctAnswer: 0,
            explanation: "Using the same password for multiple accounts is a security risk. If one account is compromised, all accounts with the same password are vulnerable."
        },
        {
            question: "You receive a call from someone claiming to be from IT support, asking for your password. What should you do?",
            options: [
                "Provide your password since they're from IT",
                "Ask for their employee ID and verify with the IT department",
                "Hang up and report the call to your security team",
                "Give them a fake password to see what they do"
            ],
            correctAnswer: 2,
            explanation: "Legitimate IT support will never ask for your password. Hang up and report the call to your organization's security team."
        },
        {
            question: "What does HTTPS in a website URL indicate?",
            options: [
                "The website is secure and can be trusted completely",
                "The connection between your browser and the website is encrypted",
                "The website is owned by a legitimate company",
                "The website is free from malware"
            ],
            correctAnswer: 1,
            explanation: "HTTPS indicates that the connection is encrypted, but it doesn't guarantee the website is legitimate or safe. Phishing sites can also use HTTPS."
        },
        {
            question: "What is 'vishing'?",
            options: [
                "A type of visual phishing using images",
                "Phishing attacks conducted via voice calls",
                "A security protocol for emails",
                "A method of encrypting voice messages"
            ],
            correctAnswer: 1,
            explanation: "Vishing (voice phishing) involves phone calls where scammers try to trick people into revealing sensitive information or granting access to systems."
        },
        {
            question: "You receive an email with an unexpected attachment. What should you do?",
            options: [
                "Open it immediately if it's from someone you know",
                "Scan it with antivirus software before opening",
                "Forward it to your work email to check it there",
                "Contact the sender to verify they sent the attachment"
            ],
            correctAnswer: 3,
            explanation: "Always verify with the sender through a different communication channel before opening unexpected attachments, even if they appear to be from someone you know."
        },
        {
            question: "What is 'smishing'?",
            options: [
                "Phishing attacks via SMS/text messages",
                "A type of malware that spreads through social media",
                "A secure messaging protocol",
                "A method of encrypting text messages"
            ],
            correctAnswer: 0,
            explanation: "Smishing (SMS phishing) uses text messages to trick people into revealing personal information or downloading malware."
        },
        {
            question: "Which of these is a red flag in an email?",
            options: [
                "The sender's email address doesn't match the company's domain",
                "The email contains your name",
                "The email has a professional signature",
                "The email has a clear subject line"
            ],
            correctAnswer: 0,
            explanation: "If the sender's email address doesn't match the company's official domain, it's a strong indicator of a phishing attempt."
        },
        {
            question: "What should you do if you suspect you've fallen for a phishing scam?",
            options: [
                "Ignore it and hope for the best",
                "Change all your passwords immediately and notify relevant parties",
                "Delete the suspicious email and empty the trash",
                "Forward the email to your friends to warn them"
            ],
            correctAnswer: 1,
            explanation: "Immediately change any exposed passwords, enable two-factor authentication, and notify your organization's IT or security team if it involves work accounts."
        },
        {
            question: "What is 'whaling' in the context of cybersecurity?",
            options: [
                "A type of malware that targets whales (large marine mammals)",
                "Phishing attacks that target high-profile individuals like executives",
                "A security protocol for large organizations",
                "A method of encrypting large files"
            ],
            correctAnswer: 1,
            explanation: "Whaling is a type of spear phishing that specifically targets high-profile individuals like CEOs or other executives to steal sensitive information or money."
        },
        {
            question: "Which of these is NOT a good security practice?",
            options: [
                "Using a password manager",
                "Sharing passwords with trusted colleagues",
                "Enabling automatic software updates",
                "Using a VPN on public Wi-Fi"
            ],
            correctAnswer: 1,
            explanation: "You should never share your passwords with anyone, even trusted colleagues. Each person should have their own unique login credentials."
        }
    ];

    // Shuffle function to randomize questions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize the quiz
    function initQuiz() {
        // Shuffle questions and select first 10
        quizState.questions = shuffleArray([...quizQuestions]).slice(0, 10);
        quizState.totalQuestions = quizState.questions.length;
        quizState.currentQuestionIndex = 0;
        quizState.score = 0;
        quizState.userAnswers = [];
        quizState.quizCompleted = false;
        
        // Update UI
        totalQuestionsElement.textContent = quizState.totalQuestions;
        showQuestion();
    }

    // Display the current question
    function showQuestion() {
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        
        // Update question number
        questionNumberElement.textContent = quizState.currentQuestionIndex + 1;
        
        // Display question
        questionElement.textContent = currentQuestion.question;
        
        // Clear previous options and feedback
        optionsElement.innerHTML = '';
        feedbackElement.innerHTML = '';
        feedbackElement.className = 'quiz-feedback';
        
        // Disable next button until an option is selected
        nextButton.disabled = true;
        nextButton.textContent = 'Next Question';
        
        // Create and append options
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(optionElement);
        });
    }

    // Handle option selection
    function selectOption(selectedIndex) {
        if (quizState.quizCompleted) return;
        
        const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
        const isCorrect = selectedIndex === currentQuestion.correctAnswer;
        
        // Store user's answer
        quizState.userAnswers[quizState.currentQuestionIndex] = selectedIndex;
        
        // Update score if correct
        if (isCorrect) {
            quizState.score++;
        }
        
        // Show feedback
        showFeedback(isCorrect, currentQuestion.explanation);
        
        // Highlight selected and correct answers
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.disabled = true;
            
            if (index === currentQuestion.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Enable next button
        nextButton.disabled = false;
    }

    // Show feedback for the selected answer
    function showFeedback(isCorrect, explanation) {
        feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.innerHTML = `
            <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
            <p>${explanation}</p>
        `;
        feedbackElement.classList.add('show');
    }

    // Show quiz results
    function showResults() {
        const percentage = Math.round((quizState.score / quizState.totalQuestions) * 100);
        let message, emoji;
        
        if (percentage >= 80) {
            message = 'Excellent! You have a strong understanding of phishing awareness.';
            emoji = '🎉';
        } else if (percentage >= 60) {
            message = 'Good job! You know the basics, but there\'s room for improvement.';
            emoji = '👍';
        } else {
            message = 'Keep learning! Review the training materials and try again.';
            emoji = '📚';
        }
        
        questionElement.innerHTML = `
            <div class="quiz-results">
                <div class="results-emoji">${emoji}</div>
                <h3>Quiz Complete!</h3>
                <p>You scored ${quizState.score} out of ${quizState.totalQuestions} (${percentage}%)</p>
                <p>${message}</p>
                <button id="retry-quiz" class="button">Retry Quiz</button>
            </div>
        `;
        
        optionsElement.innerHTML = '';
        feedbackElement.innerHTML = '';
        nextButton.style.display = 'none';
        
        // Add retry functionality
        document.getElementById('retry-quiz').addEventListener('click', () => {
            // Reset quiz
            quizState.currentQuestionIndex = 0;
            quizState.score = 0;
            quizState.userAnswers = [];
            quizState.quizCompleted = false;
            
            // Reset UI
            nextButton.style.display = 'inline-block';
            initQuiz();
        });
    }

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        if (quizState.quizCompleted) return;
        
        // Move to next question or show results
        quizState.currentQuestionIndex++;
        
        if (quizState.currentQuestionIndex < quizState.questions.length) {
            showQuestion();
        } else {
            // Quiz completed
            quizState.quizCompleted = true;
            showResults();
        }
    });

    // Initialize the quiz when the page loads
    initQuiz();
});
