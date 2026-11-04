def power(a,b):
        c=a**b
        return c

def cube (s):
        volume=power(s,3)
        return volume

a=int(input("Enter the side of cube "))
vol=cube(a)
print("Volume of the cube is ",vol)
