import json

# Replace 'your_file.json' with the path to your JSON file
file_path = '272345721190923 (1).json'

# Open and load the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

# Print the content of the JSON file
print(data)
