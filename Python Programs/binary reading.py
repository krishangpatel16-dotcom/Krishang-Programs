import pickle
f1=open("user.dat","rb")
try:
    while True:
        rec=pickle.load(f1)
        print(rec)
except EOFError:
    f1.close()