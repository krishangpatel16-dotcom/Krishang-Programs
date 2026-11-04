# MiniBank

The project combines the MiniBank work from the practicals into one Java 17 application.
Its sources are under `src/main/java`; JUnit tests are under `src/test/java`.

From this folder, build and test with Maven:

```powershell
mvn test
mvn package
java -jar target/minibank-1.0.0.jar
```

If Maven is unavailable, compile and package the Java 17 sources in PowerShell:

```powershell
$sources = Get-ChildItem src\main\java -Filter *.java -Recurse
New-Item -ItemType Directory -Force out | Out-Null
javac --release 17 -d out $sources.FullName
jar --create --file minibank.jar --main-class minibank.MiniBank -C out .
java -jar minibank.jar
```

The console menu supports account creation, deposits, withdrawals, transfers, statements,
account listing, reports, and batch deposits. Account data and transaction logs are written
under `data/` when the program runs.
