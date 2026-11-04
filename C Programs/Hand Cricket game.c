#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>


void instructions();

void instructions()
{
    printf("Instructions:\n");
    printf("1. You have to select any random number from 1 to 6.\n");
    printf("2. The computer will also select a number.\n");
    printf("3. While batting, if the number selected by you and computer is different, your number will add to your runs.\n");
    printf("   If the number selected by you and computer is same, you will lose your wicket.\n");
    printf("4. While bowling, if the number selected by you and computer is different, the computer's number will add to its runs.\n");
    printf("   If the number selected by you and computer is same, the computer will lose its wicket.\n");
    printf("5. Each player will get 2 wickets and 2 overs (12 balls) for batting and bowling.\n");
    printf("6. The innings will end after either 2 wickets fall or overs end.\n");
    printf("7. The player with maximum runs wins.\n\n");
}

int main() {
    printf("~~~~~~~~~~ Game of Cricket ~~~~~~~~~~\n\n");
    instructions();

    printf("---------- Start Game ----------\n");

    srand(time(0));

    // Toss
    char toss[10], u_opt[10], c_opt[10];
    int random_toss = rand() % 2 + 1; // 1 = heads, 2 = tails
    int random_opt = rand() % 2 + 1;  // 1 = bat, 2 = ball

    printf("\nHere comes the Toss\n");
    printf("Choose heads or tails: ");
    scanf("%s", toss);

    int user_won_toss = 0;
    if ((random_toss == 1 && strcmp(toss, "heads") == 0) ||
        (random_toss == 2 && strcmp(toss, "tails") == 0)) {
        user_won_toss = 1;
        printf("\nYou won the toss\n");
        printf("Choose bat or ball: ");
        scanf("%s", u_opt);
    } else {
        printf("\nYou lost the toss\n");
        if (random_opt == 1) strcpy(c_opt, "bat");
        else strcpy(c_opt, "ball");
        printf("Computer chose to %s\n", c_opt);
    }

    // Determine who bats first
    char Bat_first[10], Ball_first[10];
    if (user_won_toss && strcmp(u_opt, "bat") == 0) {
        strcpy(Bat_first, "You");
        strcpy(Ball_first, "Computer");
    } else if (user_won_toss && strcmp(u_opt, "ball") == 0) {
        strcpy(Bat_first, "Computer");
        strcpy(Ball_first, "You");
    } else if (!user_won_toss && strcmp(c_opt, "bat") == 0) {
        strcpy(Bat_first, "Computer");
        strcpy(Ball_first, "You");
    } else {
        strcpy(Bat_first, "You");
        strcpy(Ball_first, "Computer");
    }

    printf("\n---------- First Innings Begins ----------\n");
    int runs_1 = 0, wickets_1 = 0, balls_1 = 0;
    while (wickets_1 != 2 && balls_1 != 12) {
        int u_choice, c_choice;
        printf("\nChoose any number from 1 to 6: ");
        scanf("%d", &u_choice);

        if (u_choice < 1 || u_choice > 6) {
            printf("Please choose a value from 1 to 6.\n");
            continue;
        }

        c_choice = rand() % 6 + 1;
        printf("Your choice: %d\nComputer's choice: %d\n", u_choice, c_choice);

        if (u_choice == c_choice) {
            wickets_1++;
        } else {
            if (strcmp(Bat_first, "You") == 0)
                runs_1 += u_choice;
            else
                runs_1 += c_choice;
        }

        balls_1++;
        printf("Score = %d/%d\n", runs_1, wickets_1);
        if (balls_1 == 6) printf("End of Over 1\n");
        else if (balls_1 == 12) printf("End of Over 2\n");
        printf("Balls remaining: %d\n", 12 - balls_1);
    }

    printf("\n---------- End of Innings ----------\n");
    printf("Final Score:\nRuns = %d\nWickets = %d\n", runs_1, wickets_1);
    printf("%s needs %d runs to win.\n", Ball_first, runs_1 + 1);

    // Second innings
    printf("\n---------- Second Innings Begins ----------\n");
    int runs_2 = 0, wickets_2 = 0, balls_2 = 0;
    while (wickets_2 != 2 && balls_2 != 12 && runs_2 <= runs_1) {
        int u_choice, c_choice;
        printf("\nChoose any number from 1 to 6: ");
        scanf("%d", &u_choice);

        if (u_choice < 1 || u_choice > 6) {
            printf("Please choose a value from 1 to 6.\n");
            continue;
        }

        c_choice = rand() % 6 + 1;
        printf("Your choice: %d\nComputer's choice: %d\n", u_choice, c_choice);

        if (u_choice == c_choice) {
            wickets_2++;
        } else {
            if (strcmp(Bat_first, "Computer") == 0)
                runs_2 += u_choice;
            else
                runs_2 += c_choice;
        }

        balls_2++;
        printf("Score = %d/%d\n", runs_2, wickets_2);
        if (balls_2 == 6) printf("End of Over 1\n");
        else if (balls_2 == 12) printf("End of Over 2\n");
        if (runs_2 <= runs_1 && balls_2 < 12 && wickets_2 != 2)
            printf("To win: %d runs needed from %d balls.\n", runs_1 - runs_2 + 1, 12 - balls_2);
    }

    printf("\n---------- End of Innings ----------\n");
    printf("Final Score:\nRuns = %d\nWickets = %d\n", runs_2, wickets_2);

    // Result
    printf("\n~~~~~~~~~~ Result ~~~~~~~~~~\n");
    if (runs_1 > runs_2) {
        if (strcmp(Bat_first, "You") == 0)
            printf("Congratulations! You won the match by %d runs.\n", runs_1 - runs_2);
        else
            printf("Better luck next time! Computer won the match by %d runs.\n", runs_1 - runs_2);
    } else if (runs_2 > runs_1) {
        if (strcmp(Bat_first, "Computer") == 0)
            printf("Congratulations! You won the match by %d wickets.\n", 2 - wickets_2);
        else
            printf("Better luck next time! Computer won the match by %d wickets.\n", 2 - wickets_2);
    } else {
        printf("The match is a tie. No one wins.\n");
    }

    return 0;
}

