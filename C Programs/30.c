#include<stdio.h>

int main()
{
    int i,j,*p;
    int arr[10];
    for (i=0;i<3;i++)
    {
        printf("Enter the number : ");
        scanf("%d",&arr[i]);
    }
    p=arr;
    printf("\nSorted Array :\n");
    for (i=0;i<3;i++)
    {
        for (j=0;j<3;j++)
        {
            if (*(p+j) > *(p+j+1) )
            {
                int temp=*(p+j);
                *(p+j)=*(p+j+1);
                *(p+j+1)=temp;
            }
        }
    }
    for (i=0;i<3;i++)
    {
        printf("%2d",*(p+i));
    }
}

