#include <stdio.h>
#include <string.h>


struct Book {
    int accessionNumber;
    char title[50];
    char author[50];
    float price;
    char issued;
};

int main() {
    struct Book b;

    printf("Enter Accession Number: ");
    scanf("%d", &b.accessionNumber);

    printf("Enter Book Title: ");
    scanf("%s", b.title);

    printf("Enter Author Name: ");
    scanf("%s", b.author);

    printf("Enter Book Price: ");
    scanf("%f", &b.price);
    getchar();
    printf("Is the book issued? : ");
    scanf("%c", &b.issued);

    printf("\nBook Details Entered \n");
    printf("Accession Number : %d\n", b.accessionNumber);
    printf("Title            : %s\n", b.title);
    printf("Author           : %s\n", b.author);
    printf("Price            : %.2f\n", b.price);

    if (b.issued == 1)
        printf("Status           : Issued\n");
    else
        printf("Status           : Available\n");

    return 0;
}
