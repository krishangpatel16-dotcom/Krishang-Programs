f1=open("1.txt","r")
a=f1.read().split()
sum1=0
for i in a:
        try:
                b=int(i)
                sum1+=b
        except:
                for j in i:
                        if j.isdigit():
                                sum1+=int(j)
                continue
print(sum1)
