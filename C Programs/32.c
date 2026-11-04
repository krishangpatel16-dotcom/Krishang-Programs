#include <stdio.h>
#include <string.h>

void reverseWord(char word[])
{
    int i, len = strlen(word);
    for(i = len - 1; i >= 0; i--)
    {
        printf("%c", word[i]);
    }
}

int main()
{
    FILE *fp;
    char word[100];

    fp = fopen("Demo.txt", "r");

    if(fp == NULL)
    {
        printf("Error: Cannot open Demo.txt file.\n");
        fclose(fp);
        return 1;
    }

    printf("Reversed words output:\n\n");

    while(fscanf(fp, "%s", word) != EOF)
    {
        reverseWord(word);
        printf(" ");
    }

    fclose(fp);
    return 0;
}
