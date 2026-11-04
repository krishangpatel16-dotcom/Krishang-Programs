def change(l1):
        l2=[]
        for i in l1:
                if i%2==0:
                        l2.append(i//2)
                else:
                        l2.append(i*2)
        return l2
l1=[9,2,5,31,24,8,54,67,85]
l2=change(l1)
print("Original list is ",l1)

print("New list is ",l2)
