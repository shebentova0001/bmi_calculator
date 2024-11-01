class BMICalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resultDiv = document.getElementById('result');
        this.bmiValue = document.getElementById('bmi-value');
        this.category = document.getElementById('category');
        this.categoryInfo = document.getElementById('category-info');
        
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
        
        // Validate inputs
        if (!this.validateInputs(weight, height)) {
            return;
        }
        
        // Calculate BMI
        const bmi = weight / (height * height);
        const roundedBMI = Math.round(bmi * 10) / 10;
        
        // Get category and info
        const categoryData = this.getBMICategory(roundedBMI);
        
        // Display results
        this.displayResults(roundedBMI, categoryData);
    }
    
    validateInputs(weight, height) {
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Please enter valid positive numbers for weight and height.');
            return false;
        }
        return true;
    }
    
    getBMICategory(bmi) {
        const categories = {
            underweight: { 
                range: [0, 18.4], 
                message: 'You may be underweight. Consider consulting a healthcare provider for nutritional advice.',
                color: 'underweight'
            },
            normal: { 
                range: [18.5, 24.9], 
                message: 'Great! You are in the healthy weight range. Maintain your current lifestyle.',
                color: 'normal'
            },
            overweight: { 
                range: [25, 29.9], 
                message: 'You may be overweight. Consider incorporating more physical activity and balanced nutrition.',
                color: 'overweight'
            },
            obese: { 
                range: [30, Infinity], 
                message: 'You may be obese. It is recommended to consult with a healthcare provider for guidance.',
                color: 'obese'
            }
        };
        
        for (const [category, data] of Object.entries(categories)) {
            if (bmi >= data.range[0] && bmi <= data.range[1]) {
                return { category, ...data };
            }
        }
        
        return categories.underweight; // Fallback
    }
    
    displayResults(bmi, categoryData) {
        this.bmiValue.textContent = bmi;
        this.category.textContent = categoryData.category;
        this.categoryInfo.textContent = categoryData.message;
        
        // Remove previous category classes
        this.resultDiv.classList.remove('underweight', 'normal', 'overweight', 'obese');
        // Add current category class
        this.resultDiv.classList.add(categoryData.color);
        
        // Show result section
        this.resultDiv.classList.remove('hidden');
        
        // Scroll to results
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
});