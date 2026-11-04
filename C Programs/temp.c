#include<stdio.h>
int st(int f[4])
{
    int sum=0;
    double average;
    for (int i=0; i<4;i++)
    {
        sum=sum+f[i];
        //printf("%d",sum);

    }
    printf("%lf",average=sum/4.0);

}

int main()
{
    int a[4];
    for (int i=0;i<4;i++)
    {
        printf("Enter the number");
        scanf("%d",&a[i]);
    }
    st(a);
}
