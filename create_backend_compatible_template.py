import pandas as pd

# Based on the error, let's try to match the backend database schema
# The error shows the backend expects different column names
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
    "APPLICABLE SOLICITATION METHODS",  # Changed from "APPLICABLE SOLICITATION METHOD"
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
    "PROCUREMENT PERFORMANCE SCORE",
    "PROCUREMENT PROCESS"
]

# Create sample data
sample_data = [
    [
        "Project Manager A",
        "Lagos Office",
        "WP-001",
        "Office Supplies and Equipment",
        "BUD-2025-001",
        "500000",
        "1200",
        "Yes",
        "No",
        "Q1 2025",
        "50",
        "Units",
        "John Doe",
        "Open Tender",
        "Required",
        "RFQ",  # Changed to match backend expectation
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
        "85",
        "Standard Process"
    ]
]

# Create DataFrame
df = pd.DataFrame(sample_data, columns=columns)

# Save as Excel file
df.to_excel("procurement_plan_backend_compatible.xlsx", index=False, sheet_name="Procurement Plan")

print("✅ Backend-compatible template created: procurement_plan_backend_compatible.xlsx")
print(f"\n📋 Key changes made:")
print("- APPLICABLE SOLICITATION METHOD → APPLICABLE SOLICITATION METHODS")
print("- Simplified sample data to avoid backend parsing issues")
print(f"\n📋 Total columns: {len(columns)}")

# Also create a minimal version with just essential columns
essential_columns = [
    "IMPLEMENTER (OWNER)",
    "DESCRIPTION OF PROCUREMENT ACTIVITIES",
    "APPROVED BUDGET AMOUNT (NGN)",
    "RESPONSIBLE PR STAFF",
    "MODE OF PROCUREMENT",
    "PROCUREMENT START DATE",
    "PROCUREMENT PROCESS"
]

essential_data = [
    [
        "Project Manager A",
        "Office Supplies and Equipment",
        "500000",
        "John Doe",
        "Open Tender",
        "2025-01-15",
        "Standard Process"
    ]
]

df_minimal = pd.DataFrame(essential_data, columns=essential_columns)
df_minimal.to_excel("procurement_plan_minimal.xlsx", index=False, sheet_name="Procurement Plan")

print("✅ Minimal template also created: procurement_plan_minimal.xlsx")
print("📋 Try the minimal version first if the full template still has issues")