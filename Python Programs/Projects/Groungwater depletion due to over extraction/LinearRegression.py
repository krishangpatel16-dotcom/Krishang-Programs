import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
data=pd.read_csv('Groundwater.csv')
x=data['Year'].values.reshape(-1,1)
y=data['Groundwater_Level_mbgl'].values.reshape(-1,1)
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=42)
model=LinearRegression()
model.fit(x_train,y_train) 
y_pred=model.predict(x_test)
print(model.score(x_test,y_test))
plt.scatter(x,y,color='blue')
plt.plot(x_test,y_pred)
plt.show()
