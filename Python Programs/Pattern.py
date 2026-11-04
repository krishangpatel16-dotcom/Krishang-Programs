a=int(input("Enter a number "))
for i in range(a):
          for j in range(a-i-1):
                    print("  ",end="  ")
          for j in range(i*2+1):
                    print("*",end="  ")
          print()
for i in range(a-1):
          for j in range(i+1):
                    print("  ",end="  ")
          for j in range(a*2-(i*2)-3):
                    print("*",end="  ")
          print()
