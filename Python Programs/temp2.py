from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

# Create a new Word document
doc = Document()

# Title
title = doc.add_heading("Flowchart for 'Game of Cricket' C Program", level=1)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.add_paragraph("This document contains two flowcharts representing the program flow:").bold = True
doc.add_paragraph("1. High-Level Flowchart – Summarizes main stages of gameplay.\n"
                  "2. Detailed Flowchart – Includes all decision-making and loops.")

# ----------------------------
# HIGH LEVEL FLOWCHART
# ----------------------------
doc.add_heading("1. High-Level Flowchart", level=2)

high_level_steps = [
    "Start",
    "Display Game Instructions",
    "Perform Toss (heads/tails)",
    "If User Wins Toss → Choose to Bat/Bowl",
    "Else → Computer Chooses Bat/Bowl",
    "First Innings Begins (Batting/Bowling as per Toss)",
    "Loop: For 12 Balls or Until 2 Wickets → Input Numbers & Update Score",
    "End of First Innings → Show Target",
    "Second Innings Begins (Roles Reversed)",
    "Loop: For 12 Balls or Until 2 Wickets → Input Numbers & Update Score",
    "End of Second Innings → Show Final Score",
    "Compare Runs → Display Result (Win/Lose/Tie)",
    "End"
]

for step in high_level_steps:
    doc.add_paragraph(f"→ {step}", style='List Bullet')

# ----------------------------
# DETAILED FLOWCHART
# ----------------------------
doc.add_heading("2. Detailed Flowchart", level=2)

doc.add_paragraph("This version includes detailed control flow with loops, conditions, and user inputs.")

detailed_steps = [
    "Start Program",
    "Display instructions",
    "Initialize random seed (time(0))",
    "Perform Toss: User chooses heads/tails, Computer randomly selects 1 or 2",
    "If Toss result matches user → user_won_toss = 1 → User chooses Bat/Ball",
    "Else → Computer chooses Bat/Ball randomly",
    "Determine Bat_first and Ball_first based on toss outcome",
    "Set runs_1 = wickets_1 = balls_1 = 0",
    "While (wickets_1 < 2 AND balls_1 < 12):",
    "    User inputs number (1–6)",
    "    Computer randomly generates number (1–6)",
    "    If (numbers are same): wicket++",
    "    Else if (User batting): add user number to runs",
    "    Else if (Computer batting): add computer number to runs",
    "    Increment balls_1",
    "Display First Innings Score and End when 12 balls or 2 wickets",
    "Set target = runs_1 + 1",
    "Second Innings Starts → runs_2 = wickets_2 = balls_2 = 0",
    "While (wickets_2 < 2 AND balls_2 < 12 AND runs_2 <= runs_1):",
    "    User inputs number (1–6)",
    "    Computer randomly generates number (1–6)",
    "    If (numbers are same): wicket++",
    "    Else if (User bowling): add computer’s number to runs",
    "    Else if (User batting): add user’s number to runs",
    "    Increment balls_2",
    "Display Second Innings Score and End when 12 balls or 2 wickets or target reached",
    "Compare runs_1 and runs_2",
    "If (runs_1 > runs_2): Team batting first wins by runs difference",
    "Else if (runs_2 > runs_1): Team batting second wins by wickets remaining",
    "Else: Match tied",
    "End Program"
]

for step in detailed_steps:
    doc.add_paragraph(f"→ {step}", style='List Bullet')

# Save document
doc.save("Game_of_Cricket_Flowchart.docx")

print("✅ Word document 'Game_of_Cricket_Flowchart.docx' has been created successfully!")
