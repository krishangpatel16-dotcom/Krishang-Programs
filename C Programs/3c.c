#include<stdio.h>
void main(){
    int a[]={22,19,17,36};
    int i,j,n=sizeof(a)/sizeof(int);
    int temp;
    for (i=0;i<n;++i)
        for (j=0;j<n;++j)
            if (a[i]>a[j]){
            temp=a[i];
            a[i]=a[j];
            a[j]=temp;}
    for (i=0;i<n;++i)
        printf("%d",a[i]);
        printf("\n");}
