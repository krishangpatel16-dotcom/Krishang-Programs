while True:
    a1=int(input("Enter a number :- "))
    a2=int(input("Enter a number :- "))
    a3=int(input("Enter a number :- "))
    a4=int(input("Enter a number :- "))
    print("""
1.Average
2.Sum
3.Muliplication
4.Quit
""")
    b=int(input("Enter the number you want to calculate  "))
    if b==1:
        print("Average of 4 numbers is ",(a1+a2+a3+a4)/4)
        print()
    elif b==2:
        print("Sum of 4 numbers is ",(a1+a2+a3+a4))
        print()
    elif b==3:
        print("Multiplication of 4 numbers is ",(a1*a2*a3*a4))
        print()
    elif b==4:
        print()
        break
    else:
        print("Wrong input")

