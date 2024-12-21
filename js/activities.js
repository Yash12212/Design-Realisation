// Activity card expansion
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't expand if clicking inside interactive content or buttons
        if (e.target.closest('.interactive-content') || e.target.closest('button')) return;
        
        // Toggle expanded class on clicked card
        card.classList.toggle('expanded');
    });
});

// Password Strength Checker
const passwordInput = document.getElementById('password-input');
const meterBar = document.querySelector('.meter-bar');
const feedback = document.querySelector('.password-feedback');
const criteria = document.querySelectorAll('.password-criteria li');

function checkPasswordStrength(password) {
    let strength = 0;
    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    // Update criteria icons and calculate strength
    criteria.forEach(item => {
        const criterion = item.getAttribute('data-criterion');
        const icon = item.querySelector('i');
        
        if (checks[criterion]) {
            icon.className = 'fas fa-check';
            item.classList.add('met');
            strength += 20;
        } else {
            icon.className = 'fas fa-times';
            item.classList.remove('met');
        }
    });

    // Update meter and feedback
    meterBar.style.width = `${strength}%`;
    
    if (strength < 40) {
        feedback.textContent = 'Weak password';
        feedback.style.color = 'var(--danger-color)';
        meterBar.style.background = 'var(--danger-color)';
    } else if (strength < 80) {
        feedback.textContent = 'Moderate password';
        feedback.style.color = 'var(--warning-color)';
        meterBar.style.background = 'var(--warning-color)';
    } else {
        feedback.textContent = 'Strong password!';
        feedback.style.color = 'var(--success-color)';
        meterBar.style.background = 'var(--success-color)';
    }
}

function generatePassword() {
    const length = 16;
    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let password = '';
    const types = Object.values(charset);
    
    // Ensure at least one character from each type
    types.forEach(chars => {
        password += chars[Math.floor(Math.random() * chars.length)];
    });

    // Fill remaining length with random characters
    const allChars = types.join('');
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    passwordInput.value = password;
    passwordInput.type = 'text'; // Show password temporarily
    checkPasswordStrength(password);

    // Hide password after 3 seconds
    setTimeout(() => {
        passwordInput.type = 'password';
    }, 3000);
}

// Initialize password checker
if (passwordInput) {
    passwordInput.addEventListener('input', (e) => checkPasswordStrength(e.target.value));
}

// Phishing Email Examples
const phishingExamples = [
    {
        from: 'paypal-security@secure-payments.co',
        subject: '⚠️ Unauthorized Login Attempt - Action Required',
        date: 'Today, 10:23 AM',
        content: `
            <p class="clickable-element">Dear PayPal Member,</p>
            <p>We've detected multiple login attempts to your account from an unrecognized device:</p>
            <ul>
                <li><strong>Location:</strong> Moscow, Russia</li>
                <li><strong>IP Address:</strong> 192.168.1.1</li>
                <li><strong>Device:</strong> Android Mobile</li>
            </ul>
            <p class="clickable-element">For your security, we've temporarily limited access to sensitive account features. To restore full access, please verify your identity within the next 12 hours by following these steps:</p>
            <ol>
                <li class="clickable-element">Click here to access our secure verification portal: <a href="#" class="suspicious-link">https://paypal-secure-center.com/verify</a></li>
                <li>Confirm your billing information</li>
                <li>Update your security questions</li>
            </ol>
            <p class="clickable-element">WARNING: Failure to verify your account may result in permanent account suspension.</p>
            <div style="margin-top: 20px; padding: 10px; border-left: 4px solid #ccc;">
                <p style="color: #666; font-size: 0.9em;">This message contains sensitive information. Never share your PayPal password or verification codes with anyone.</p>
            </div>
            <p>Best regards,<br>PayPal Security Team</p>
            <img src="https://www.paypal.com/logo.png" alt="PayPal Logo" style="width: 100px; margin-top: 20px;">
        `,
        indicators: {
            'paypal-security@secure-payments.co': 'Suspicious sender domain (not paypal.com)',
            '⚠️ Unauthorized Login Attempt - Action Required': 'Urgent warning symbols and threatening subject line',
            'Dear PayPal Member,': 'Generic greeting instead of using your name',
            'https://paypal-secure-center.com/verify': 'Suspicious URL - not the official PayPal domain',
            'WARNING: Failure to verify': 'Threatening language to pressure immediate action'
        }
    },
    {
        from: 'microsoft365-noreply@office-verify.net',
        subject: 'IMMEDIATE ACTION: Your Account Access Will Be Suspended',
        date: 'Today, 11:45 AM',
        content: `
            <p class="clickable-element">Dear Microsoft User,</p>
            <p>Our security system has detected unusual sign-in activity on your Microsoft 365 account:</p>
            <div class="alert-box" style="background: #f8f8f8; padding: 15px; margin: 10px 0; border-left: 4px solid #0078d4;">
                <p><strong>Alert Details:</strong></p>
                <ul>
                    <li>Multiple failed login attempts</li>
                    <li>Access from unrecognized locations</li>
                    <li>Potential security breach attempt</li>
                </ul>
            </div>
            <p class="clickable-element">To prevent unauthorized access and protect your data, immediate action is required. Your account access will be limited until you verify your identity:</p>
            <ol>
                <li class="clickable-element">Click to verify: <a href="#" class="suspicious-link">https://office365-verify-login.net/account</a></li>
                <li>Update your security settings</li>
                <li>Review recent activity</li>
            </ol>
            <p class="clickable-element">Your account will be permanently disabled if you don't verify within 24 hours.</p>
            <div style="margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: #f9f9f9;">
                <p style="color: #666;">This is an automated message. Please do not reply.</p>
            </div>
            <p>Regards,<br>Microsoft 365 Security Team</p>
            <img src="https://www.microsoft.com/logo.png" alt="Microsoft Logo" style="width: 120px; margin-top: 20px;">
        `,
        indicators: {
            'microsoft365-noreply@office-verify.net': 'Suspicious sender domain (not microsoft.com)',
            'IMMEDIATE ACTION: Your Account Access Will Be Suspended': 'Threatening subject line with urgency',
            'Dear Microsoft User,': 'Generic greeting instead of using your name',
            'https://office365-verify-login.net/account': 'Suspicious URL - not the official Microsoft domain',
            'Your account will be permanently disabled': 'Threatening language to force immediate action'
        }
    }
];

let currentExampleIndex = 0;
let foundIndicators = new Set();

// Initialize first example
function initializePhishingExample() {
    const example = phishingExamples[currentExampleIndex];
    document.getElementById('email-from').textContent = example.from;
    document.getElementById('email-subject').textContent = example.subject;
    document.getElementById('email-date').textContent = example.date;
    document.getElementById('email-body').innerHTML = example.content;
    
    // Add click handlers to new elements
    document.querySelectorAll('.clickable-element').forEach(element => {
        element.addEventListener('click', () => handlePhishingClick(element));
    });
}

// Call initialization on page load
document.addEventListener('DOMContentLoaded', initializePhishingExample);

function handlePhishingClick(element) {
    const text = element.textContent;
    const currentExample = phishingExamples[currentExampleIndex];
    
    if (currentExample.indicators[text] && !foundIndicators.has(text)) {
        foundIndicators.add(text);
        element.classList.add('found');
        
        const hint = document.createElement('div');
        hint.className = 'found-hint';
        hint.innerHTML = `<i class="fas fa-check-circle"></i> ${currentExample.indicators[text]}`;
        
        document.querySelector('.indicator-list').appendChild(hint);
        updatePhishingScore();
        
        // Show success message when 5 indicators are found
        if (foundIndicators.size >= 5) {
            showSuccess('Great job! You\'ve identified the key phishing indicators.');
        }
    }
}

function updatePhishingScore() {
    const score = document.getElementById('phishing-score');
    score.textContent = Math.min(foundIndicators.size, 5);
}

function showSuccess(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h4>Excellent Work!</h4>
        <p>${message}</p>
    `;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.opacity = '0';
        setTimeout(() => successMsg.remove(), 300);
    }, 3000);
}

function loadNextPhishingExample() {
    // Move to next example, loop back to start if at end
    currentExampleIndex = (currentExampleIndex + 1) % phishingExamples.length;
    const example = phishingExamples[currentExampleIndex];
    
    // Update email content
    document.getElementById('email-from').textContent = example.from;
    document.getElementById('email-subject').textContent = example.subject;
    document.getElementById('email-date').textContent = example.date;
    document.getElementById('email-body').innerHTML = example.content;
    
    // Reset state
    foundIndicators.clear();
    document.querySelectorAll('.clickable-element').forEach(el => el.classList.remove('found'));
    document.querySelector('.indicator-list').innerHTML = '<h4>Phishing Indicators Found:</h4>';
    updatePhishingScore();
    
    // Hide any existing success message
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
        successMsg.remove();
    }
    
    // Add click handlers to new elements
    document.querySelectorAll('.clickable-element').forEach(element => {
        element.addEventListener('click', () => handlePhishingClick(element));
    });
}

function showPhishingHints() {
    const currentExample = phishingExamples[currentExampleIndex];
    const indicatorList = document.querySelector('.indicator-list');
    
    // Clear existing hints
    indicatorList.innerHTML = '<h4>All Phishing Indicators:</h4>';
    
    // Show all indicators for current example
    Object.entries(currentExample.indicators).forEach(([text, hint]) => {
        const hintElement = document.createElement('div');
        hintElement.className = 'found-hint';
        const isFound = foundIndicators.has(text);
        
        hintElement.innerHTML = `
            <i class="fas ${isFound ? 'fa-check-circle' : 'fa-circle'}"></i>
            <span>${hint}</span>
        `;
        
        if (!isFound) {
            hintElement.style.opacity = '0.7';
        }
        
        indicatorList.appendChild(hintElement);
    });
}

// Initialize phishing detection
document.querySelectorAll('.clickable-element').forEach(element => {
    element.addEventListener('click', () => handlePhishingClick(element));
});

// Back to top functionality
const fab = document.querySelector('.fab');
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    if (fab) {
        fab.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
    
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    }
});

if (fab) {
    fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Export functions for HTML
window.generatePassword = generatePassword;
window.loadNextPhishingExample = loadNextPhishingExample;
window.showPhishingHints = showPhishingHints;
