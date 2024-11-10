/**
 * BMI Calculator Module
 * Calculates BMI and determines health category
 */

class BMICalculator {
    /**
     * Calculate BMI based on weight and height
     * @param {number} weight - Weight in kilograms
     * @param {number} height - Height in meters
     * @returns {number} BMI value
     */
    static calculateBMI(weight, height) {
        if (weight <= 0 || height <= 0) {
            throw new Error('Weight and height must be positive numbers');
        }
        return weight / (height * height);
    }

    /**
     * Classify BMI into health categories
     * @param {number} bmi - BMI value
     * @returns {Object} Category information
     */
    static classifyBMI(bmi) {
        const categories = {
            underweight: { min: 0, max: 18.4, message: 'Underweight' },
            normal: { min: 18.5, max: 24.9, message: 'Normal weight' },
            overweight: { min: 25, max: 29.9, message: 'Overweight' },
            obese1: { min: 30, max: 34.9, message: 'Obese (Class I)' },
            obese2: { min: 35, max: 39.9, message: 'Obese (Class II)' },
            obese3: { min: 40, max: Infinity, message: 'Obese (Class III)' }
        };

        for (const [key, category] of Object.entries(categories)) {
            if (bmi >= category.min && bmi <= category.max) {
                return {
                    category: key,
                    message: category.message,
                    bmi: bmi
                };
            }
        }

        return {
            category: 'unknown',
            message: 'Unable to classify',
            bmi: bmi
        };
    }

    /**
     * Calculate and classify BMI in one step
     * @param {number} weight - Weight in kilograms
     * @param {number} height - Height in meters
     * @returns {Object} Complete BMI analysis
     */
    static analyze(weight, height) {
        const bmi = this.calculateBMI(weight, height);
        const classification = this.classifyBMI(bmi);
        
        return {
            ...classification,
            weight: weight,
            height: height,
            bmi: parseFloat(bmi.toFixed(1))
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMICalculator;
}