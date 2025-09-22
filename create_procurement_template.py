import pandas as pd

# Define the required columns
columns = [
    "IMPLEMENTER (OWNER)",
    "IMPLEMENTATION LOCATION",
    "WORKPLAN ACTIVITY REFERENCE",
    "DESCRIPTION OF PROCUREMENT ACTIVITIES",
    "BUDGET REFERENCE NUMBER",
    "APPROVED BUDGET AMOUNT (NGN)",
    "APPROVED BUDGET AMOUNT (USD)",
    "PPM",
    "NON-PPM",
    "FY25 TARGETS",
    "QUANTITY",
    "UOM",
    "RESPONSIBLE PR STAFF",
    "MODE OF PROCUREMENT",
    "PROCUREMENT COMMITTEE REVIEW",
    "APPLICABLE SOLICITATION METHOD",
    "PROCUREMENT START DATE",
    "PROCUREMENT METHOD",
    "START DATE OF RFQ",
    "CLOSING DATE OF RFQ",
    "EVALUATION DATE",
    "NEGOTIATION",
    "DATE CBA AND REPORT IS FINALISED",
    "DATE PURCHASE ORDER/PC IS ISSUED",
    "SELECTED SUPPLIER",
    "EXPECTED DELIVERY DUE DATE",
    "DELIVERY LEADTIME",
    "DELIVERY TO",
    "PROCUREMENT PERFORMANCE/MONITORING REMARKS",
    "PROCUREMENT PERFORMANCE SCORE"
]

# Create sample data
sample_data = [
    [
        "Project Manager A",
        "Lagos Office",
        "WP-001",
        "Office Supplies and Equipment",
        "BUD-2025-001",
        "500,000",
        "1,200",
        "Yes",
        "No",
        "Q1 2025",
        "50",
        "Units",
        "John Doe",
        "Open Tender",
        "Required",
        "RFQ",
        "2025-01-15",
        "Competitive Bidding",
        "2025-01-20",
        "2025-01-30",
        "2025-02-05",
        "2025-02-10",
        "2025-02-15",
        "2025-02-20",
        "ABC Suppliers Ltd",
        "2025-03-01",
        "10 days",
        "Lagos Office",
        "On track - procurement proceeding as planned",
        "85"
    ],
    [
        "Project Manager B",
        "Abuja Office",
        "WP-002",
        "IT Equipment Procurement",
        "BUD-2025-002",
        "2,000,000",
        "4,800",
        "No",
        "Yes",
        "Q2 2025",
        "20",
        "Units",
        "Jane Smith",
        "Restricted Tender",
        "Required",
        "RFP",
        "2025-02-01",
        "Competitive Bidding",
        "2025-02-10",
        "2025-02-28",
        "2025-03-05",
        "2025-03-12",
        "2025-03-20",
        "2025-03-25",
        "TechCorp Solutions",
        "2025-04-15",
        "21 days",
        "Abuja Office",
        "Pending vendor selection",
        "70"
    ]
]

# Create DataFrame
df = pd.DataFrame(sample_data, columns=columns)

# Save as Excel file
df.to_excel("procurement_plan_template.xlsx", index=False, sheet_name="Procurement Plan")

print("Excel template created: procurement_plan_template.xlsx")
print("\nColumn headers included:")
for i, col in enumerate(columns, 1):
    print(f"{i:2d}. {col}")