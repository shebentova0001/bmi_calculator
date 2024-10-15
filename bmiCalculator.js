class BMICalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultDiv = document.getElementById('result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculateBMI());
        
        // Allow Enter key to trigger calculation
        [this.weightInput, this.heightInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculateBMI();
                }
            });
        });
    }
    
    calculateBMI() {
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value) / 100; // Convert cm to meters
        
        // Input validation
        if (!this.validateInputs(weight, height)) {
            return;
        }
        
        const bmi = this.calculateBMIScore(weight, height);
        const category = this.getBMICategory(bmi);
        
        this.displayResult(bmi, category);
    }
    
    validateInputs(weight, height) {
        if (isNaN(weight) || isNaN(height)) {
            this.showError('Please enter valid numbers for weight and height.');
            return false;
        }
        
        if (weight <= 0 || height <= 0) {
            this.showError('Weight and height must be positive numbers.');
            return false;
        }
        
        if (weight > 500) {
            this.showError('Please enter a realistic weight (max 500 kg).');
            return false;
        }
        
        if (height > 300) {
            this.showError('Please enter height in centimeters (max 300 cm).');
            return false;
        }
        
        return true;
    }
    
    calculateBMIScore(weight, height) {
        return weight / (height * height);
    }
    
    getBMICategory(bmi) {
        if (bmi < 18.5) {
            return {
                category: 'Underweight',
                class: 'underweight',
                message: 'You are underweight. Consider consulting a healthcare provider.'
            };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return {
                category: 'Normal weight',
                class: 'normal',
                message: 'You have a healthy weight! Keep up the good work.'
            };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return {
                category: 'Overweight',
                class: 'overweight',
                message: 'You are overweight. Consider a balanced diet and regular exercise.'
            };
        } else {
            return {
                category: 'Obese',
                class: 'obese',
                message: 'You are obese. Please consult a healthcare provider for guidance.'
            };
        }
    }
    
    displayResult(bmi, category) {
        this.resultDiv.innerHTML = `
            <h3>Your BMI Result</h3>
            <p><strong>BMI Score:</strong> ${bmi.toFixed(1)}</p>
            <p><strong>Category:</strong> ${category.category}</p>
            <p>${category.message}</p>
        `;
        
        this.resultDiv.className = `result ${category.class}`;
        this.resultDiv.style.display = 'block';
    }
    
    showError(message) {
        this.resultDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
        `;
        this.resultDiv.className = 'result';
        this.resultDiv.style.display = 'block';
        this.resultDiv.style.background = '#fff5f5';
        this.resultDiv.style.color = '#ff6b6b';
    }
}

// Initialize the BMI Calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
});