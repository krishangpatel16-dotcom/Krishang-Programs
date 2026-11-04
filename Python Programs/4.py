'''a=100
for i in range(2,a-1):
    for j in range(2,i):
        if i%j==0:
            break
        else:
            print(i,"It is a prime number")'''

for num in range(2,101):
    prime = True
    for i in range(2,num):
        if (num%i==0):
            prime = False
    if prime:
        print (num)
