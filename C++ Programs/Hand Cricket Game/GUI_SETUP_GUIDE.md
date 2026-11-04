# Cricket Game with GUI - Setup Guide

## Features
- Visual cricket field with grass and pitch
- Batsman and bowler stick figures
- Animated ball
- Interactive scoreboard
- Real-time score tracking
- Input system (Press numbers 1-6 for choices)

## Prerequisites - Installation Steps

### 1. Install SFML Library

#### On Windows (Using MinGW/g++):

**Option A: Using vcpkg (Recommended)**
```bash
# Install vcpkg if you don't have it
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\vcpkg integrate install

# Install SFML
.\vcpkg install sfml:x64-windows
```

**Option B: Manual Installation**
1. Download SFML from https://www.sfml-dev.org/download.php (select Windows version)
2. Extract to a folder (e.g., C:\SFML)
3. Add the include and lib directories to your compiler paths

### 2. Compilation Instructions

#### Using g++ (MinGW):
```bash
g++ -c CricketGameWithGUI.cpp -I"C:\SFML\include"
g++ CricketGameWithGUI.o -o CricketGame -L"C:\SFML\lib" -lsfml-graphics -lsfml-window -lsfml-system
```

#### Using Visual Studio:
1. Create a new C++ Console Project
2. Copy the code into a .cpp file
3. Project Properties → VC++ Directories:
   - Include Directories: Add SFML\include
   - Library Directories: Add SFML\lib
4. Project Properties → Linker → Input:
   - Add: sfml-graphics.lib; sfml-window.lib; sfml-system.lib
5. Build and Run

#### Using Code::Blocks:
1. File → New → Project → Console Application
2. Copy the code into main.cpp
3. Project → Build options:
   - Search Directories → Compiler: Add SFML\include
   - Search Directories → Linker: Add SFML\lib
   - Linker settings → Add: sfml-graphics, sfml-window, sfml-system

#### Using CMake:
Create a CMakeLists.txt file with:
```cmake
cmake_minimum_required(VERSION 3.10)
project(CricketGame)

set(CMAKE_CXX_STANDARD 17)

find_package(SFML 2.5 COMPONENTS graphics window system REQUIRED)

add_executable(CricketGame CricketGameWithGUI.cpp)
target_link_libraries(CricketGame sfml-graphics sfml-window sfml-system)
```

Then:
```bash
mkdir build
cd build
cmake ..
cmake --build .
```

### 3. Running the Game

After compilation, run:
```bash
./CricketGame
```

## How to Play

1. **Start Game**: Press any number (1-6) to begin
2. **Batting Round**:
   - Press a number from 1-6 to choose your shot
   - Press SPACE to submit your choice
   - Computer makes random choice
   - Same numbers = Wicket (out)
   - Different numbers = Runs added
3. **Game Flow**: 
   - First innings (you bat)
   - Second innings (computer bats)
   - Result displayed at end
4. **Exit**: Press any key on result screen

## GUI Elements

- **Oval Green Field**: Cricket field boundary
- **Tan Pitch**: Playing area with crease lines
- **Blue Figure**: Batsman with bat
- **Red Figure**: Bowler
- **Red Ball**: Cricket ball
- **Scoreboard**: Shows runs, wickets, and balls bowled
- **Controls Panel**: Shows your current choice
- **Message Display**: Game updates and results

## Troubleshooting

**"Cannot find SFML headers"**
- Ensure SFML include path is correctly set in compiler

**"Undefined reference to sfml..."**
- Link libraries in this order: sfml-graphics, sfml-window, sfml-system
- Ensure SFML lib directory is in linker paths

**Font rendering issues**
- The program looks for Arial.ttf in Windows Fonts folder
- If missing, the game runs but text may not display (fallback is automatic)

**Window doesn't appear**
- Ensure SFML graphics library is properly linked
- Check if display drivers are up to date

## Features Explained

✓ Inheritance: Player → HumanPlayer, ComputerPlayer
✓ Polymorphism: Virtual getChoice() and getType() methods
✓ GUI Graphics: Cricket field, players, ball animation
✓ Input Handling: Keyboard input for number selection
✓ Score Tracking: Real-time scoreboard updates
✓ Game Logic: Two innings, 12 balls per innings, 2 wickets max

## Next Steps (Optional Enhancements)

- Add sound effects for runs and wickets
- Implement team selection screen
- Add difficulty levels for computer
- Persistent high scores
- Animated ball trajectory
- Crowd sounds and animations
- Statistics tracking
