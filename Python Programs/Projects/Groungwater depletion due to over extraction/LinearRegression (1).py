import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

# 1. Load data
data = pd.read_csv('Groundwater.csv')

# 2. Reshape features and targets
# Ensure there are no NaN values which would break the model
data = data.dropna(subset=['Year', 'Groundwater_Level_mbgl'])

X = data['Year'].values.reshape(-1, 1)
y = data['Groundwater_Level_mbgl'].values

# 3. Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# 5. Visualization
plt.figure(figsize=(10, 6))
plt.scatter(X, y, color='blue', label='Actual Data', alpha=0.5)

# To plot a clean regression line, we predict over the full range of X
X_range = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)
y_range_pred = model.predict(X_range)

plt.plot(X_range, y_range_pred, color='red', linewidth=2, label='Regression Line')
plt.xlabel('Year')
plt.ylabel('Groundwater Level (mbgl)')
plt.title('Groundwater Level Prediction')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)
plt.show()

# 6. Predict for user input
try:
    user_year = int(input("Enter the year you want to check the groundwater level: "))
    # Wrap user_year in a 2D array format to match training data shape
    prediction_input = np.array([[user_year]])
    predicted_level = model.predict(prediction_input)
    
    print(f"\nPredicted groundwater level for the year {user_year}: {predicted_level[0]:.2f} mbgl")
except ValueError:
    print("Please enter a valid numerical year.")

# 7. Evaluation
accuracy = model.score(X_test, y_test)*100
print(f"\nModel R^2 Score: {accuracy:.4f}")
