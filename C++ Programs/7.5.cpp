#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <limits>

void processFile(const std::string& path) {
    std::ifstream file(path);
    std::string line;
    int lineNum = 0;
    double totalSum = 0;
    int validCount = 0;

    std::cout << "\n--- Processing Report ---\n";

    while (std::getline(file, line)) {
        lineNum++;
        if (line.empty()) continue; // Skip empty lines

        std::stringstream ss(line);
        double value;

        // Try to extract a number from the line
        if (ss >> value) {
            // Check if there's trailing non-numeric "garbage" on the same line
            std::string extra;
            if (ss >> extra) {
                std::cerr << "[Line " << lineNum << "] Warning: Corrupted data (ignored extra text: " << extra << ")\n";
            }
            totalSum += value;
            validCount++;
        } else {
            // Extraction failed
            std::cerr << "[Line " << lineNum << "] Error: Non-numeric data found (\"" << line << "\")\n";
        }
    }

    if (validCount > 0) {
        std::cout << "\nSummary:\n- Lines Processed: " << validCount
                  << "\n- Average Value: " << (totalSum / validCount) << "\n";
    } else {
        std::cout << "No valid numeric data was found in the file.\n";
    }
}

int main() {
    std::string filePath;
    bool success = false;

    // Retry Mechanism
    while (!success) {
        std::cout << "Enter the file path (or type 'exit' to quit): ";
        std::cin >> filePath;

        if (filePath == "exit") break;

        std::ifstream testFile(filePath);
        if (testFile.is_open()) {
            testFile.close(); // Close it so processFile can open it fresh
            processFile(filePath);
            success = true;
        } else {
            std::cerr << "Error: Could not open file '" << filePath << "'. Please try again.\n";
        }
    }

    return 0;
}
