#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Global inventory data
int bookId[] = {1, 2, 3, 4, 5};
char bookname[5][40] = {"Chemistry", "Maths", "CCP", "Physics", "English"};
const int TOTAL_BOOKS = 5;

void displayBooks()
{
    printf("\n--- Available Books ---\n");
    for (int i = 0; i < TOTAL_BOOKS; i++)
    {
        printf("%d. %s\n", bookId[i], bookname[i]);
    }
    printf("-----------------------\n");
}

int getTotalBooks()
{
    return TOTAL_BOOKS;
}

void borrowBook(char bookToFind[40])
{
    int available = 0;
    printf("Searching for book: %s...\n", bookToFind);
    for (int i = 0; i < TOTAL_BOOKS; i++)
    {
        if (strcmp(bookname[i], bookToFind) == 0)
        {
            available = 1;
            break;
        }
    }
    if (available == 1)
        printf("\nThis book is available at our store & you can borrow it!\n");
    else
        printf("\nThe book you entered ('%s') is not available at our store.\n", bookToFind);
}

float calculateFine(int daysLate)
{
    return daysLate * 100.0f;
}

void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main()
{
    int choice;
    int days_late;
    float fine_amount;
    char book_to_borrow[40];

    do {
        printf("\n--- Library Manager Menu ---\n");
        printf("1. To display books\n");
        printf("2. To get the total number of books\n");
        printf("3. To borrow a book from the store\n");
        printf("4. To display how much fine you have to give\n");
        printf("5. Quit\n");
        printf("Enter any of your choice from (1 to 5) : ");
        if (scanf("%d", &choice) != 1) {
            printf("\nInvalid input for choice. Please enter a number.\n");
            clearInputBuffer();
            continue;
        }
        clearInputBuffer();

        switch (choice)
        {
            case 1:
                displayBooks();
                break;
            case 2:
                printf("Total number of books are: %d\n", getTotalBooks());
                break;
            case 3:
                printf("Enter the book name you want to borrow (e.g., Maths): ");
                if (fgets(book_to_borrow, 40, stdin) != NULL) {
                    book_to_borrow[strcspn(book_to_borrow, "\n")] = '\0';
                    borrowBook(book_to_borrow);
                }
                break;
            case 4:
                printf("Enter how many days late you submitted the book: ");
                if (scanf("%d", &days_late) != 1) {
                    printf("\nInvalid input for days late. Please enter a number.\n");
                    clearInputBuffer();
                    break;
                }
                clearInputBuffer();

                fine_amount = calculateFine(days_late);
                printf("Total fine to be submitted to the store is: %.2f\n", fine_amount);
                break;
            case 5:
                printf("Thank You! Exiting program.\n");
                return 0;
            default:
                printf("Wrong choice entered. Please enter again (1-5).\n");
        }
    } while (1);
}
