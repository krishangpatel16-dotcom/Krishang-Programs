import pandas as pd
from sklearn.linear model import LinearRegression
from sklearn.metrics import r2_score
import numpy as np
def train_and_predict(X, y, user_year):
        model-Linear Regression().
        model.fit(X,y)
        predicted_waste-model.predict([[user_year]])
        print(f"Predicted waste generation for the year (user_year): (predicted_waste[0]:.2f} tonnes")
        return model
def calculate_r2_score (model, x, y):
        y_pred-model.predict(X)
        r2=r2_score(y,y_pred)
        print(f"R-squared score of the model {r2:.4f}")
data-pd.read_csv(r"waste_gener.csv")
X-data[['year']]
y-data['waste_generation_in_tonnes']
user_year-int(input("Enter the year for waste generation prediction: "))
trained_model-train_and_predict(x, y, user_year)
calculate_r2_score(trained_model, x, y)
