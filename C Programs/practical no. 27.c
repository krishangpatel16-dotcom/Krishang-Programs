#include<stdio.h>

int n1=1,n2=1,count=3,total=2;
int fibonacci(int n);
int fibonacci(int n)
{
    int n3=n1+n2;
    printf("Month %d: %d Rs.\n",count,n3);
    total+=n3;
    n1=n2;
    n2=n3;
    count++;
    if (n==1)
        return 0;
    return fibonacci(n-1);
}
main()
{
    int a;
    printf("Enter the number for series");
    scanf("%d",&a);
    a-=2;
    printf("Month 1: %d Rs.\nMonth 2: %d Rs.\n",n1,n2);
    fibonacci(a);
    printf("Total savings till now is %d\n",total);
}
