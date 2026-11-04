a=input("Enter anythinig")
b=0
c=""
d=0
for i in a:
    if i.isdigit():
        d+=int(i)
        c+=i
    else:
        pass
if d>0:
    print(a," has the digits ",c," which sum to ",d)
else :
    print(a,"Has no digits")
    
