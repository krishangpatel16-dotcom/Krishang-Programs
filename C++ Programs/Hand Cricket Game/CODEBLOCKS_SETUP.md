# Cricket Game GUI - Code::Blocks Setup Guide

## Step 1: Download and Install SFML

1. Go to https://www.sfml-dev.org/download.php
2. Download **SFML 2.5.1** for your Windows architecture (32-bit or 64-bit)
3. Extract to a folder like `C:\SFML` (or `D:\SFML`)

## Step 2: Download and Install Code::Blocks

1. Go to http://www.codeblocks.org/downloads
2. Download Code::Blocks with MinGW compiler (codeblocks-20.03mingw-setup.exe or latest version)
3. Install with default settings

## Step 3: Create New Project in Code::Blocks

1. Open Code::Blocks
2. Go to **File → New → Project**
3. Select **Console Application** → **Go**
4. Choose **C++** → **Next**
5. Project title: `CricketGame`
6. Create folder in your C++ Programs directory
7. Finish

## Step 4: Add Your Code

1. In the Project tree on the left, expand your project
2. Right-click on **Sources** folder → **Add Files**
3. Navigate to and select `CricketGameWithGUI.cpp`
4. Click **Open**
5. The file will be added to your project

## Step 5: Configure Project Settings for SFML

1. Right-click on **Project** (root) in the tree → **Properties**
2. Go to **Build targets** tab
3. Select **Debug** on the left

### 5A: Add Include Directories

1. In Project Properties, go to **Search directories → Compiler tab**
2. Click **Add** button
3. Browse to your SFML folder → Select **include** folder
   - Example: `C:\SFML\include`
4. Click **OK**

### 5B: Add Library Directories

1. Still in Project Properties, go to **Search directories → Linker tab**
2. Click **Add** button
3. Browse to your SFML folder → Select **lib** folder
   - Example: `C:\SFML\lib`
4. Click **OK**

### 5C: Link Libraries

1. Go to **Linker settings** tab in Project Properties
2. In the **Link libraries** box at the bottom, click **Add**
3. Add these libraries one by one:
   ```
   sfml-graphics
   sfml-window
   sfml-system
   ```
4. For each, click **Add** and type the library name
5. Click **OK** to close Project Properties

## Step 6: Set Compiler Flags (Important!)

1. Right-click on **Project** → **Properties**
2. Go to **Compiler settings** tab
3. In the **Other options** field, make sure you see:
   ```
   -std=c++17
   ```
4. If not, add it
5. Click **OK**

## Step 7: Build the Project

1. Go to **Build → Clean** (first time)
2. Go to **Build → Build** (or press Ctrl+F9)
3. Wait for compilation to complete
4. Check the **Build log** at the bottom for any errors

### If you get linking errors:

The most common issue is library order or missing libraries. Try this:

1. Right-click Project → **Properties**
2. **Linker settings** tab
3. Clear the current libraries and add in this exact order:
   ```
   sfml-graphics
   sfml-window
   sfml-system
   ```
4. Rebuild

## Step 8: Copy SFML DLL Files

**IMPORTANT:** Before running, you need to copy SFML runtime files:

1. Navigate to `C:\SFML\bin` (or wherever you extracted SFML)
2. Copy these files:
   ```
   sfml-graphics-2.dll
   sfml-window-2.dll
   sfml-system-2.dll
   ```
3. Paste them into your project's **bin/Debug** folder
   - Example: `D:\Krishang Programs\C++ Programs\CricketGame\bin\Debug\`

## Step 9: Run the Game

1. Go to **Build → Run** (or press Ctrl+F10)
2. The game window should open!
3. Press any number (1-6) to start the game

## Troubleshooting

### "Cannot find SFML headers"
- ✓ Check Search directories → Compiler tab has correct path
- ✓ Verify SFML extracted correctly with include/lib folders present

### "Undefined reference to sfml_..."
- ✓ Check Search directories → Linker tab is set correctly
- ✓ Verify libraries are added: sfml-graphics, sfml-window, sfml-system
- ✓ Make sure DLL files are copied to bin/Debug folder

### Program compiles but crashes on run
- ✓ DLL files are probably missing - copy them from SFML/bin to your project bin/Debug
- ✓ Verify all three DLL files are there

### "Visual C++ runtime error"
- ✓ You likely copied Release DLLs but compiled Debug - use matching versions
- ✓ Ensure DLLs are in the same folder as your .exe

## Verify Installation

To test if SFML is properly set up:

1. Create a simple test file with:
   ```cpp
   #include <SFML/Graphics.hpp>
   int main() {
       sf::RenderWindow window(sf::VideoMode(800, 600), "Test");
       return 0;
   }
   ```
2. Compile and run - window should open briefly
3. If this works, SFML is installed correctly

## Project Structure After Setup

```
CricketGame/
├── CricketGameWithGUI.cpp
├── CricketGame.cbp (project file)
├── obj/
│   └── Debug/
└── bin/
    └── Debug/
        ├── CricketGame.exe
        ├── sfml-graphics-2.dll
        ├── sfml-window-2.dll
        └── sfml-system-2.dll
```

## Quick Reference Checklist

- [ ] SFML downloaded and extracted to C:\SFML
- [ ] Code::Blocks installed with MinGW
- [ ] New Console Application project created
- [ ] CricketGameWithGUI.cpp added to project
- [ ] Include directory set: `C:\SFML\include`
- [ ] Library directory set: `C:\SFML\lib`
- [ ] Libraries linked: sfml-graphics, sfml-window, sfml-system
- [ ] DLL files copied to bin/Debug folder
- [ ] Project builds without errors
- [ ] Game runs successfully

## Still Having Issues?

1. Delete the **obj** and **bin** folders
2. Go to **Build → Clean**
3. Go to **Build → Build** again
4. Copy DLL files again
5. Run the game

This forces Code::Blocks to rebuild everything from scratch.
