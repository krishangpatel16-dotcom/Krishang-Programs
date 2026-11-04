import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt
data=pd.read_csv(r"waste_gener.csv")
X=data[['year']]
y=data["waste_generation_in_tonnes"]
model-LinearRegression()
model.fit(X,y)
future_years-np.arange(data['year'].max()+1,data['year'].max()+11).reshape(-1,1)
future_prediction-model.predict(future_years)
plt.figure(figsize-(10,6))
plt.scatter(X,y, label="Original Data")
plt.plot(X,model.predict(X),color="red", label="Linear Regression")
#plt.plot(future_years, future_prediction,color="purple", linestyle-"dashed", label="Future Prediction")
plt.title('linear regression for Waste Generationprediction')
plt.xlabel('Year')
plt.ylabel('Waste Generation in Tonnes')
plt.legend()
plt.show()
