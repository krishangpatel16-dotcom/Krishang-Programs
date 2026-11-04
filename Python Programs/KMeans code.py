import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
inertia=[]
df=pd.read_csv(r"filecsv\insuranc.csv")
x1=df[["age","have_insurance"]].values
for n in range(1,11):
    algo=(KMeans(n_clusters=n ,init='k-means++',\
                    n_init=10,max_iter=300,\
                        tol=0.0001,random_state=111,\
                            algorithm='elkan'))
    algo.fit(x1)
    inertia.append(algo.inertia_)
print(inertia)
labels1=algo.labels_
centroids1=algo.cluster_centers_
plt.scatter(x="age",y="have_insurance",data=df,c=labels1,s=50)
plt.scatter(x=centroids1[:,0],y=centroids1[:,1], s=300,c='red',alpha=0.5)
plt.ylabel('have_insurance'),plt.xlabel('age')
plt.show()
