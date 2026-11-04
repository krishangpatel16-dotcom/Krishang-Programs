a=int(input("Enter the first number :- "))
b=int(input("Enter the second number :- "))
while a<0 or b<0:
    if a<0:
        print("First number is invalid")
        a=int(input("Enter the first number again :- "))
    elif b<0:
        print("Second number is invalid")
        b=int(input("Enter the second number again :- "))
    else :
        break
if a==0:
    a=1
print("Prime numbers are between",a," and ",b,"are :- ")
for i in range(a+1,b+1):
    f=0
    for j in range(2,i):
        if i%j==0 :
            f=1
    if f==0:
        print(i)

