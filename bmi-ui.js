/**
 * BMI Calculator UI Handler
 * Handles user interface interactions
 */

class BMIUI {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.calculateBtn = document.getElementById('calculate');
        this.resultDiv = document.getElementById('result');
        this.bmiValue = document.getElementById('bmi-value');
        this.categoryValue = document.getElementById('category');
        this.messageValue = document.getElementById('message');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        
        // Allow Enter key to trigger calculation
        [this.weightInput, this.heightInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculate();
                }
            });
        });
    }

    calculate() {
        try {
            const weight = parseFloat(this.weightInput.value);
            const height = parseFloat(this.heightInput.value);

            // Validate inputs
            if (!this.validateInputs(weight, height)) {
                return;
            }

            // Calculate BMI
            const result = BMICalculator.analyze(weight, height);

            // Display results
            this.displayResult(result);

        } catch (error) {
            this.showError(error.message);
        }
    }

    validateInputs(weight, height) {
        // Clear previous errors
        this.clearErrors();

        let isValid = true;

        if (isNaN(weight) || weight <= 0) {
            this.showInputError(this.weightInput, 'Please enter a valid weight (kg)');
            isValid = false;
        }

        if (isNaN(height) || height <= 0) {
            this.showInputError(this.heightInput, 'Please enter a valid height (m)');
            isValid = false;
        }

        return isValid;
    }

    showInputError(inputElement, message) {
        inputElement.classList.add('error');
        
        // Create or update error message
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8em';
        errorElement.style.marginTop = '5px';
    }

    clearErrors() {
        // Remove error styling
        [this.weightInput, this.heightInput].forEach(input => {
            input.classList.remove('error');
            
            // Remove error messages
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }
        });
    }

    displayResult(result) {
        this.bmiValue.textContent = result.bmi;
        this.categoryValue.textContent = result.message;
        this.messageValue.textContent = this.getHealthMessage(result.category);
        
        // Add category-based styling
        this.resultDiv.className = `result ${result.category}`;
        this.resultDiv.style.display = 'block';
    }

    getHealthMessage(category) {
        const messages = {
            underweight: 'Consider consulting a healthcare provider for nutritional advice.',
            normal: 'Great! Maintain your healthy lifestyle.',
            overweight: 'Consider increasing physical activity and improving diet.',
            obese1: 'Consult a healthcare provider for weight management advice.',
            obese2: 'Strongly recommended to seek medical advice for weight management.',
            obese3: 'Urgently recommended to consult healthcare professionals.'
        };

        return messages[category] || 'Please consult with a healthcare professional.';
    }

    showError(message) {
        this.resultDiv.innerHTML = `<div class="error">Error: ${message}</div>`;
        this.resultDiv.style.display = 'block';
    }

    // Utility method to reset the form
    reset() {
        this.weightInput.value = '';
        this.heightInput.value = '';
        this.resultDiv.style.display = 'none';
        this.clearErrors();
    }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BMIUI();
});