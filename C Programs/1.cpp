#include<stdio.h>
int main()
{
    char str1[20],rev[20],str2[20],strcopy[20],upper[20],lower[20],capital[20];
    int temp,i,same=0,diff=0;
    printf("Enter the string : ");
    gets(str1);
    //To print length of the string
    for (i=0;str1[i]!='\0';i++);
        printf("Length of the string is %d\n",i);
    temp=i;
    //To reverse the string
    for (i;i>=0;i--)
    {
        rev[temp-i]=str1[i];
        printf("%c",rev[temp-i]);
    }
    rev[temp]='\0';
    printf("The reverse string is : ");
    for (i=0;rev[i]!='\0';i++)
        printf("%c",rev[i]);
    //To check the similarities and differences between two strings
    printf("\nEnter another string : ");
    gets(str2);
    for (i=0; (str1[i]!='\0' && str2[i]!='\0');i++)
        if (str1[i]==str2[i])
            same++;
        else
            diff++;
    printf("There are %d similarities and %d differences in two string \n",same,diff);
    //To combine two strings
    for (i=0;str1[i]!='\0';i++)
        strcopy[i]=str1[i];

    for (i=0;str2[i]!='\0';i++)
        str1[temp+i]=str2[i];

    str1[temp+i]='\0';
    printf("The concatenated String is : ");
    for (i=0;str1[i]!='\0';i++)
        printf("%c",str1[i]);
    //To print whole string to uppercase
    for (i=0;str1[i]!='\0';i++)
        if (str1[i]>=97 && str1[i]<=123)
            upper[i]=char (int(str1[i])-32);
        else
            upper[i]=str1[i];

    upper[i]='\0';
    printf("\nThe uppercase string is : ");
    for (i=0;upper[i]!='\0';i++)
        printf("%c",upper[i]);
    // To print whole string to lowercase
    for (i=0;str1[i]!='\0';i++)
        if (str1[i]>=65 && str1[i]<=90)
            lower[i]=char (int(str1[i])+32);
        else
            lower[i]=str1[i];

    lower[i]='\0';
    printf("\nThe lowercase string is : ");
    for (i=0;lower[i]!='\0';i++)
        printf("%c",lower[i]);
    // To print whole string in capitalize form means starting of word with capital letter
    for (i=0;str1[i]!='\0';i++)
        if (str1[i-1]==' ')
            if (str1[i]>=97 && str1[i]<=123)
                capital[i]=char (int(str1[i])-32);
            else
                capital[i]=str1[i];
        else
            capital[i]=str1[i];
    capital[i]='\0';
    printf("\nThe capitalize string is : ");
    for (i=0;capital[i]!='\0';i++)
        printf("%c",capital[i]);
    return 0;
}

