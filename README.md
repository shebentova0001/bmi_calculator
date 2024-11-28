## BMI Calculator - Usage Instructions

### Overview
This is a simple Body Mass Index (BMI) calculator that calculates your BMI and classifies it into health categories with appropriate health messages.

### Files Structure
- `index.html` - Main HTML file with the user interface
- `styles.css` - Styling for the calculator
- `bmi-calculator.js` - Core BMI calculation logic
- `bmi-ui.js` - User interface handling and validation

### How to Use

1. **Open the Application**
   - Open `index.html` in a web browser
   - No server required - works directly in the browser

2. **Enter Your Information**
   - **Weight**: Enter your weight in kilograms (kg)
   - **Height**: Enter your height in meters (m)
   - Example: 70 kg weight and 1.75 m height

3. **Calculate BMI**
   - Click the "Calculate BMI" button
   - Or press Enter after entering your height

4. **View Results**
   - Your BMI value will be displayed
   - Health category (Underweight, Normal, Overweight, Obese)
   - Health message with recommendations

### BMI Categories
- **Underweight**: BMI < 18.5
- **Normal weight**: BMI 18.5 - 24.9
- **Overweight**: BMI 25 - 29.9
- **Obese Class I**: BMI 30 - 34.9
- **Obese Class II**: BMI 35 - 39.9
- **Obese Class III**: BMI ≥ 40

### Features
- ✅ Input validation
- ✅ Error handling
- ✅ Responsive design
- ✅ Color-coded results
- ✅ Health recommendations
- ✅ Mobile-friendly
- ✅ Keyboard support (Enter key)

### Technical Notes
- BMI Formula: `weight (kg) / (height (m) * height (m))`
- Results are rounded to 1 decimal place
- All calculations follow WHO BMI classification standards

### Browser Compatibility
Works in all modern browsers including:
- Chrome, Firefox, Safari, Edge

### Note
This calculator provides general health information. For medical advice, always consult with healthcare professionals.