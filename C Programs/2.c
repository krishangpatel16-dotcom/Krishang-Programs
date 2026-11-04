#include<stdio.h>

int main()
{   int choice,no_books,books[10],i,temp,rev=0,search,j,max,min,average=0,k,len;
    printf("===== Library Book Code Management System =====\n");
    printf("1. Enter Book Codes\n");
    printf("2. Transform Book Codes\n");
    printf("3. Sort Book Codes (Ascending)\n");
    printf("4. Sort Book Codes (Descending)\n");
    printf("5. Search for a Book Code\n");
    printf("6. Find Statistics (Highest, Lowest, Average)\n");
    printf("7. Display Current Book Codes\n");
    printf("8. Exit\n");
    printf("-----------------------------------------------\n");
    for (k=0;k<1000;k++)
    {
    printf("\nEnter your choice: ");
    scanf("%d",&choice);
    switch (choice)
    {case 1:
        printf("Enter number of books: ");
        scanf("%d",&no_books);
        printf("Enter book codes: ");
        for (i=0;i<no_books;i++)
        {
            scanf("%d",&books[i]);
        }
        break;
    case 2:
        printf("Transformed Book Codes: ");
        for (i=0;i<no_books;i++)
        {
            if (books[i]%2==0)
            {
                temp=books[i];
                start:
                rev=rev*10+temp%10;
                temp/=10;
                if (temp>0)
                    goto start;

                printf("%d -> %d\n",books[i],rev);
                books[i]=rev;

            }
            else
            {
                printf("%d -> %d\n",books[i],books[i]*books[i]*books[i]);
                books[i]=books[i]*books[i]*books[i];
            }
        }
            printf("\nCurrent List : ");
            for (i=0;i<no_books;i++)
            {
                printf("%d  ",books[i]);
            }
        break;
    case 3:
        printf("Sorted in Ascending Order: ");
        for (i=0;i<no_books-1;i++)
        {
            for (j=0;j<no_books-1;j++)
            {
                if (books[j]>books[j+1])
                {
                    temp=books[j];
                    books[j]=books[j+1];
                    books[j+1]=temp;
                }
            }
        }
        for (i=0;i<no_books;i++)
        {
            printf("  %d  ",books[i]);
        }
        break;
    case 4:
        printf("Sorted in Descending Order: ");
        for (i=0;i<no_books-1;i++)
        {
            for (j=0;j<no_books-1;j++)
            {
                if (books[j]<books[j+1])
                {
                    temp=books[j];
                    books[j]=books[j+1];
                    books[j+1]=temp;
                }
            }
        }
        for (i=0;i<no_books;i++)
        {
            printf("  %d  ",books[i]);
        }
        break;
    case 5:
        printf("Enter code to search:");
        scanf("%d",&search);
        for (i=0;i<no_books;i++)
        {
            if (books[i]==search)
                printf("Book Code %d found at position %d (1-based index).",search,i+1);
        }
        break;
    case 6:
        max=books[0];
        min=books[0];
        average=0;
        for (i=1;i<no_books;i++)
        {
            average+=books[i];
            if (books[i]>max)
                max=books[i];
        }
        for (i=1;i<no_books;i++)
        {
            if (books[i]<min)
                min=books[i];
        }
        printf("\nStatistics:");
        printf("\nHighest Code: %d",max);
        printf("\nLowest Code: %d",min);
        printf("\nAverage of Codes: %d",(average/no_books));
        break;
    case 7:
        printf("Current Book Codes: ");
        for (i=0; i<no_books;i++)
        {
            printf(" %d ",books[i]);
        }
        break;
    case 8:
        printf("Exiting Program... Thank you!");
        k=1005;
        break;
    }}
}
