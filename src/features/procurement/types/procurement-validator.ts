import { z } from "zod";

export const EOISchema = z.object({
  name: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
  // status: z.string(),
  financial_year: z.string().min(1, "Field is required"),
  categories: z.array(z.string()),
  eoi_number: z.string().min(1, "Field is required"),
  type: z.string().min(1, "Field is required"),
  solicitation: z.string().optional(),
});

export const PrequalificationCriteriaSchema = z.object({
  name: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
  stage: z.string(),
});

export const PrequalificationStagesSchema = z.object({
  name: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
});
export const QuestionairSchema = z.object({
  name: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
});

export const LotsSchema = z.object({
  name: z.string().min(1, "Field is required"),
  packet_number: z.number().min(1, "Field is required"),
});

export const VendorsRegistrationSchema = z.object({
  company_name: z.string().min(1, "Field is required"),
  company_registration_number: z.string().min(1, "Field is required"),
  year_or_incorperation: z
    .string()
    .min(1, "Field is required")
    .max(4, "Max length of four characters"),
  type_of_business: z.string().min(1, "Field is required"),
  nature_of_business: z.string().min(1, "Field is required"),
  company_address: z.string().min(1, "Field is required"),
  email: z.string().email().min(1, "Field is required"),
  website: z.string().min(1, "Field is required"),
  phone_numbers: z.string().min(1, "Field is required"),
  tin: z.string().min(1, "Field is required"),
  number_of_permanent_staff: z.any().optional(),
  submitted_categories: z.array(z.string()),
  company_chairman: z.string().min(1, "Field is required"),
  bank_address: z.string().min(1, "Field is required"),
  bank_name: z.string().min(1, "Field is required"),
  state: z.string().min(1, "Field is required"),
});

export const VendorsCompanySchema = z.object({
  branches: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      address: z.string().min(1, "Field is required"),
      phone_number: z.string().min(1, "Field is required"),
    })
  ),
  share_holders: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      address: z.string().min(1, "Field is required"),
      phone_number: z.string().min(1, "Field is required"),
    })
  ),
  key_staff: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      address: z.string().min(1, "Field is required"),
      phone_number: z.string().min(1, "Field is required"),
      qualification: z.string().min(1, "Field is required"),
    })
  ),
  associated_entities: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      address: z.string().min(1, "Field is required"),
      phone_number: z.string().min(1, "Field is required"),
      entity_type: z.string().min(1, "Field is required"),
    })
  ),
});

export const VendorsTechnicalSchema = z.object({
  production_equipments: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      manufacturer: z.string().min(1, "Field is required"),
      year: z.string().min(1, "Field is required"),
    })
  ),
  number_of_operational_work_shift: z.any().optional(),
  installed_capacity: z.string().min(1, "Field is required"),
  lagest_capacity_and_utilization: z.string().min(1, "Field is required"),
  brief_of_quality_control: z.string().min(1, "Field is required"),
  brief_of_sampling: z.string().min(1, "Field is required"),
});

export const VendorsQuestionnaireSchema = z.object({
  key_clients: z.array(
    z.object({
      name: z.string().min(1, "Field is required"),
      address: z.string().min(1, "Field is required"),
      phone_number: z.string().min(1, "Field is required"),
    })
  ),
});

export const VendorAttestationSchema = z.object({
  name: z.string().min(1, "Field is required"),
  organisation_name: z.string().min(1, "Field is required"),
  title: z.string().min(1, "Field is required"),
  date: z.string().min(1, "Field is required"),
  signature: z.string().min(1, "Field is required"),
});
export const VendorsSchema = z.object({
  passport: z.string().min(1, "Field is required"),
  approved_categories: z.array(z.string()),
});

//
export const SampleMemoSchema = z.object({
  activity: z.string().optional(), // Made optional due to ActivityPlan vs ActivityPlanFromWorkPlan mismatch
  subject: z.string().min(1, "Field is required"),
  requested_date: z.string().min(1, "Field is required"),
  fconumber: z.array(z.string().min(1, "Field is required")),
  intervention_areas: z.array(z.string().min(1, "Field is required")),
  budget_line: z.array(z.string().min(1, "Field is required")),
  cost_categories: z.array(z.string().min(1, "Field is required")),
  cost_input: z.array(z.string().min(1, "Field is required")),
  funding_source: z.array(z.string().min(1, "Field is required")),
  comment: z.string().min(1, "Field is required"),
  copy: z.array(z.string().min(1, "Field is required")),
  created_by: z.string().min(1, "Field is required"),
  approved_by: z.string().min(1, "Field is required"),
  // reviewed_by: z.string().min(1, "Field is required"),
  // authorized_by: z.string().min(1, "Field is required"),
  through: z.array(z.string().min(1, "Field is required")),
  expenses: z.array(
    z.object({
      item: z.string().optional(),
      quantity: z.string().optional(),
      num_of_days: z.string().optional(),
      unit_cost: z.string().optional(),
      total_cost: z.number().optional(),
    })
  ),
});
//

export const PurchaseRequestSchema = z.object({
  items: z.array(
    z.object({
      quantity: z.union([
        z.string().min(1, "Field is required"),
        z.number().min(1, "Field is required"),
      ]),
      unit_cost: z.union([
        z.string().min(1, "Field is required"),
        z.number().min(1, "Field is required"),
      ]),
      amount: z.union([
        z.string().min(1, "Field is required"),
        z.number().min(1, "Field is required"),
      ]),
      item: z.string().min(1, "Field is required"),
      fco_number: z.array(z.string().min(1, "Field is required")),
    })
  ),
  request_memo: z.string().min(1, "Field is required"),
  ref_number: z.string().min(1, "Field is required"),
  date_of_request: z.string().min(1, "Field is required"),
  date_required: z.string().min(1, "Field is required"),
  requesting_department: z.string().min(1, "Field is required"),
  deliver_to: z.string().min(1, "Field is required"),
  special_instruction: z.string().min(1, "Field is required"),
  reviewed_by: z.string().min(1, "Field is required"),
  role_reviewed_by: z.string().min(1, "Field is required"),
  requested_by: z.string().min(1, "Field is required"),
  role_requested_by: z.string().min(1, "Field is required"),
  approved_by: z.string().min(1, "Field is required"),
  role_approved_by: z.string().min(1, "Field is required"),
  authorised_by: z.string().min(1, "Field is required"),
  role_authorised_by: z.string().min(1, "Field is required"),
});

export const PurchaseOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().optional(),
      item_id: z.string().min(1, "Field is required"),
      fco: z.string().min(1, "Field is required"),
      unit_cost: z.union([
        z.string().min(1, "Field is required"),
        z.number().min(1, "Field is required"),
      ]),
      quantity: z.union([
        z.string().min(1, "Field is required"),
        z.number().min(1, "Field is required"),
      ]),
    })
  ),
  purchase_request: z.string().min(1, "Field is required"),
  vendor: z.string().min(1, "Field is required"),
});

export const PurchaseOrderListSchema = z.object({
  items: z.array(
    z.object({
      item_id: z.string().optional(),
      fco: z.string().optional(),
      unit_cost: z.union([
        z.string(),
        z.number(),
      ]).optional(),
      quantity: z.union([
        z.string(),
        z.number(),
      ]).optional(),
      description: z.string().optional(),
      uom: z.string().optional(),
      total: z.union([
        z.string(),
        z.number(),
      ]).optional(),
      name: z.string().optional(),
      fco_number: z.array(z.string()).optional(),
    })
  ),
  purchase_request: z.string().min(1, "Field is required"),
  vendor: z.string().min(1, "Field is required"),
  payment_terms: z.string().optional(),
  delivery_lead_time: z.string().optional(),
});

export const SolicitationItemsSchema = z.object({
  items: z.array(
    z.object({
      // id:z.string().min(1, "Field is required"),
      quantity: z.number().min(1, "Field is required"),
      item: z.string().min(1, "Field is required"),
      lot: z.string().min(1, "Field is required"),
    })
  ),
  criteria: z.array(z.string().min(1, "Field is required")),
});

export const SolicitationQuotationSchema = z.object({
  title: z.string().min(1, "Please enter title"),
  rfq_id: z.string().min(1, "Please enter rfq id"),
  background: z.string().min(1, "Please enter background"),
  request_type: z.string().min(1, "Please select request type"),
  tender_type: z.string().min(1, "Please select tender type"),
  eoi_tender: z.string().optional(),
  categories: z.array(z.string()).optional().nullable(),
  documents: z
    .array(
      z.object({
        deliverable: z.string().optional(),
        number_of_days: z.string().optional(),
      })
    )
    .optional(),
  purchase_request: z
    .string()
    // .min(1, "Please select purchase request")
    .nullable()
    .optional(),
  procurement_type: z.string().min(1, "Please select purchase request"),
});

export const SolicitationProposalSchema = z.object({
  title: z.string().min(1, "Please enter title"),
  rfp_id: z.string().min(1, "Please enter rfq id"),
  background: z.string().min(1, "Please enter background"),
  tender_type: z.string().min(1, "Please select tender type"),
  eoi_tender: z.string().optional(),
  categories: z.array(z.string().optional()),
  documents: z.array(z.object({
    description: z.string().optional().or(z.literal("")),
    file: z.array(z.any()).optional(),
    title: z.string().optional().or(z.literal("")),
    document_type: z.string().optional().or(z.literal("")),
    deliverable: z.string().optional().or(z.literal("")),
    number_of_days: z.string().optional().or(z.literal("")),
  })).optional(),
});

export type TSolicitationProposalFormData = z.infer<
  typeof SolicitationProposalSchema
>;

export type TSolicitationQuotationFormData = z.infer<
  typeof SolicitationQuotationSchema
>;

export const SolicitationSchema = z.object({
  items: z.array(
    z.object({
      // id:z.string().min(1, "Field is required"),
      quantity: z.number().min(1, "Field is required"),
      item: z.string().min(1, "Field is required"),
      lot: z.number().min(1, "Field is required"),
    })
  ),
  criteria: z.array(
    z.object({ criteria: z.string().min(1, "Field is required") })
  ),
  name: z.string().min(1, "Field is required"),
  description: z.string().min(1, "Field is required"),
  opening_date: z.string().min(1, "Field is required"),
  closing_date: z.string().min(1, "Field is required"),
  tender_type: z.string().min(1, "Field is required"),
  request_type: z.string().min(1, "Field is required"),
  limited_vendors: z.array(z.string().min(1, "Field is required")),
  purchase_request: z.string().min(1, "Field is required"),
});

export const SolicitationSubmissionSchema = z.object({
  solicitation: z.string().min(1, "Field is required"),
  vendor: z.string().min(1, "Field is required"),
  bid_items: z.array(
    z.object({
      unit_price: z.string().min(1, "Field is required"),
      solicitation_item: z.string().min(1, "Field is required"),
      quantity: z.string().min(1, "Field is required"),
    })
  ),
  evaluations: z.array(
    z.object({
      response: z.string().min(1, "Field is required"),
      evaluation_criteria: z.string().min(1, "Field is required"),
    })
  ),
  // Additional submission details
  delivery_lead_time: z.string().min(1, "Delivery lead time is required"),
  payment_terms: z.string().min(1, "Payment terms is required"),
  tin: z.string().min(1, "TIN is required"),
  validity_period: z.string().min(1, "Validity period is required"),
  has_bank_account: z.string().min(1, "Bank account status is required"),
  is_cac_registered: z.string().min(1, "CAC registration status is required"),
  previous_experience: z.string().min(1, "Previous experience status is required"),
  email: z.string().email("Valid email is required"),
  currency: z.string().min(1, "Currency is required"),
  warranty: z.string().min(1, "Warranty is required"),
  brand_quoted: z.string().min(1, "Brand quoted is required"),
});

export const CbaSchema = z.object({
  cba_type: z.enum(['COMMITTEE', 'NON COMMITTEE'], {
    required_error: "CBA type is required",
  }),
  cba_date: z.string().min(1, "CBA date is required"),
  solicitation: z.string().uuid("Solicitation must be a valid UUID"),
  lot: z.string().uuid("Lot must be a valid UUID").optional(),
  assignee: z.string().uuid("Assignee must be a valid UUID").optional(),
  committee_members: z.array(z.string().uuid("Committee member must be a valid UUID")),
  remarks: z.string().optional(),
});

export const CbaApprovalSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'COMPLETED'], {
    required_error: "Status is required",
  }),
  remarks: z.string().min(1, "Remarks are required for approval/rejection"),
});

export const CbaAnalysisSubmissionSchema = z.object({
  cba_id: z.string().uuid("CBA ID must be a valid UUID"),
  solicitation_id: z.string().uuid("Solicitation ID must be a valid UUID"),
  vendor_id: z.string().uuid("Vendor ID must be a valid UUID"),
  recommendation_note: z.string().optional(),
  selected_items: z.array(z.string().uuid("Item ID must be a valid UUID")).min(0, "At least one item can be selected"),
});

export const ProcurementMilestoneSchema = z.object({
  milestone_name: z.string().min(1, "Field is required"),
  milestone_description: z.string().min(1, "Field is required"),
});

export const ProcurementPlanSchema = z.object({
  description: z.string().min(1, "Field is required"),
  approved_budget: z.string().min(1, "Field is required"),
  total_quantity: z.string().min(1, "Field is required"),
  pr_staff: z.string().min(1, "Field is required"),
  mode_of_procurement: z.string().min(1, "Field is required"),
  procurement_committee_review: z.string().min(1, "Field is required"),
  procurement_process: z.string().min(1, "Field is required"),
  donor_remarks: z.string().min(1, "Field is required"),
  implenter_remarks: z.string().min(1, "Field is required"),
  start_date: z.string().min(1, "Field is required"),
  expected_delivery_date_1: z.string().min(1, "Field is required"),
  expected_delivery_date_2: z.string().min(1, "Field is required"),
  ware_houses: z.string().min(1, "Field is required"),
  workplan_activity: z.string().min(1, "Field is required"),
  selected_supplier: z.string().min(1, "Field is required"),
  budget_allocation: z.array(
    z.object({
      date_1: z.string().min(1, "Field is required"),
      date_2: z.string().min(1, "Field is required"),
      date_3: z.string().min(1, "Field is required"),
    })
  ),
});

// Updated schema to match actual database columns
export const ProcurementPlanListSchema = z.object({
  file: z.any(), // File upload
  financial_year: z.string().min(1, "Financial year is required"),
  project: z.string().min(1, "Project is required"),
});

// Manual Bid Submission

// Define UUID validation
const uuidSchema = z.string().uuid();

// Define bid item schema
const bidItemSchema = z.object({
  bid_submission: uuidSchema,
  solicitation_item: uuidSchema,
  unit_price: z
    .string()
    .or(z.number()) // Accepts both string and number formats
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "unit_price must be a valid positive number",
    }),
});

// Define evaluation schema
const evaluationSchema = z.object({
  bid_submission: uuidSchema,
  evaluation_criteria: uuidSchema,
  response: z.string().min(1, "Response is required"),
});

// Main schema
export const ManualBidCbaPrequalificationSchema = z.object({
  vendor: uuidSchema,
  solicitation: uuidSchema,
  bid_items: z
    .array(bidItemSchema)
    .nonempty("At least one bid item is required"),
  evaluations: z
    .array(evaluationSchema)
    .nonempty("At least one evaluation is required"),
});

// Manual Bid Submission end

// Enhanced RFQ Types
export const SolicitationItemSchema = z.object({
  id: z.string().uuid().optional(),
  item: z.string().uuid(),
  item_detail: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    uom: z.string(),
  }).optional(),
  lot: z.string().uuid().optional(),
  lot_detail: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }).optional(),
  description: z.string().optional(),
  specification: z.string().optional(),
  quantity: z.number().min(1),
  frequency: z.number().min(1).default(1),
  number_of_days: z.number().min(1).default(1),
});

export const SolicitationCriteriaSchema = z.object({
  id: z.string().uuid().optional(),
  criteria: z.string().uuid(),
  criteria_details: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
  }).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const EnhancedSolicitationSchema = z.object({
  id: z.string().uuid().optional(),
  rfq_id: z.string(),
  purchase_request: z.string().uuid().optional().nullable(),
  eoi_tender: z.string().uuid().optional().nullable(),
  title: z.string(),
  background: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED']),
  opening_date: z.string().optional().nullable(),
  closing_date: z.string().optional().nullable(),
  rfq_type: z.enum(['PROCUREMENT', 'ADMIN']).optional(),
  tender_type: z.enum([
    'SINGLE SOURCE',
    'CLOSED SOURCE',
    'OPENED SOURCE',
    'LIMITED SOLICITATION',
    'NATIONAL OPEN TENDER'
  ]),
  request_type: z.enum([
    'REQUEST FOR QUOTATION',
    'REQUEST FOR PROPOSAL',
    'INVITATION TO TENDER'
  ]),
  procurement_type: z.string().optional(),
  specification_document: z.string().optional(),
  specification_document_detail: z.string().optional(),
  solicitation_items: z.array(SolicitationItemSchema),
  solicitation_evaluations: z.array(SolicitationCriteriaSchema),
});

export const CreateSolicitationRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  rfq_id: z.string().min(1, 'RFQ ID is required'),
  background: z.string().optional(),
  request_type: z.enum([
    'REQUEST FOR QUOTATION',
    'REQUEST FOR PROPOSAL',
    'INVITATION TO TENDER'
  ]),
  tender_type: z.enum([
    'SINGLE SOURCE',
    'CLOSED SOURCE',
    'OPENED SOURCE',
    'LIMITED SOLICITATION',
    'NATIONAL OPEN TENDER'
  ]),
  rfq_type: z.enum(['PROCUREMENT', 'ADMIN']).optional(),
  procurement_type: z.string().optional(),
  purchase_request: z.string().uuid().optional().nullable(),
  eoi_tender: z.string().uuid().optional().nullable(),
  opening_date: z.string().optional(),
  closing_date: z.string().optional(),
  specification_document: z.instanceof(File).optional(),
  solicitation_items: z.array(z.object({
    item: z.string().uuid(),
    quantity: z.number().min(1),
    description: z.string().optional(),
    specification: z.string().optional(),
    frequency: z.number().min(1).default(1),
    number_of_days: z.number().min(1).default(1),
    lot: z.string().uuid().optional(),
  })),
  solicitation_evaluations: z.array(z.object({
    criteria: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional(),
  })),
});

export const VendorBidItemSchema = z.object({
  id: z.string().uuid().optional(),
  bid_submission: z.string().uuid().optional(),
  solicitation_item: z.string().uuid(),
  unit_price: z.number().min(0),
  quantity: z.number().min(1),
  total_amount: z.number().min(0).optional(),
});

export const VendorEvaluationResponseSchema = z.object({
  id: z.string().uuid().optional(),
  bid_submission: z.string().uuid().optional(),
  evaluation_criteria: z.string().uuid(),
  response: z.string().min(1, 'Response is required'),
});

export const VendorBidSubmissionSchema = z.object({
  id: z.string().uuid().optional(),
  vendor: z.string().uuid(),
  solicitation: z.string().uuid(),
  total_amount: z.number().min(0).optional(),
  status: z.enum(['PENDING', 'PASSED', 'FAILED']).optional(),
  bid_items: z.array(VendorBidItemSchema),
  evaluations: z.array(VendorEvaluationResponseSchema),
});

// Type exports
export type ISolicitationItem = z.infer<typeof SolicitationItemSchema>;
export type ISolicitationCriteria = z.infer<typeof SolicitationCriteriaSchema>;
export type ISolicitation = z.infer<typeof EnhancedSolicitationSchema>;
export type ICreateSolicitationRequest = z.infer<typeof CreateSolicitationRequestSchema>;
export type IVendorBidItem = z.infer<typeof VendorBidItemSchema>;
export type IVendorEvaluationResponse = z.infer<typeof VendorEvaluationResponseSchema>;
export type IVendorBidSubmission = z.infer<typeof VendorBidSubmissionSchema>;

// Enhanced RFQ Types End
