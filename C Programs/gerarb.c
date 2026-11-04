int main() {
int a = 10, b = 20;
const int *p = &a;
p = &b;
printf("%d", *p);
}
