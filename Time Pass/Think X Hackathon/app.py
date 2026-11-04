# app.py
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Mock Database
ALUMNI_DATA = [
    {"id": 1, "name": "Arjun Mehta", "role": "Senior Architect", "company": "Google", "year": "2015"},
    {"id": 2, "name": "Sara Khan", "role": "Founder", "company": "Solaris Tech", "year": "2018"}
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/alumni')
def get_alumni():
    return jsonify(ALUMNI_DATA)

if __name__ == '__main__':
    app.run(debug=True)