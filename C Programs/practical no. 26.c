#include<stdio.h>
#include<math.h>
double s1,s2,s3;

double input()
{
    printf("Enter 3 numbers :");
    scanf("%lf %lf %lf",&s1,&s2,&s3);

    if (s1<=0 || s2<=0 || s3<=0)
    {
        printf("Side lengths must be positive numbers");
        return 0.0;
    }
    if (isvalid(s1,s2,s3))
        return area(s1,s2,s3);

    else
    {
        printf("The given lengths do not form a triangle");
        return 0.0;
    }
}
int isvalid(double s1, double s2,double s3)
{
    if (s1+s2>s3 && s1+s3>s2 && s2+s3>s1)
        return 1;
    else
        return 0;
}
int area(double s1, double s2, double s3)
{
    double s=(s1+s2+s3)/2.0;
    return (double) (sqrt(s*(s-s1)*(s-s2)*(s-s3)));

}
main()
{
    double area_of_triangle=input();
    if(area_of_triangle)
        printf("Area of trianlge is %lf\n",area_of_triangle);
}

