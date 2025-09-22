"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "components/Card";
import { Button } from "components/ui/button";
import { Icon } from "@iconify/react";
import BreadcrumbCard from "components/Breadcrumb";
import { Loading } from "components/Loading";
import { useGetSingleProcurementPlan } from "../../../controllers/procurementPlanController";
import { ProcurementPlanResultsData } from "../../../types/procurementPlan";
import { toast } from "sonner";

export default function ProcurementPlanDetail() {
  const params = useParams();
  const router = useRouter();
  const planId = params?.id as string;

  const {
    data: planData,
    isLoading,
    error,
    refetch
  } = useGetSingleProcurementPlan(planId, !!planId);

  const breadcrumbs = [
    { name: "Procurement", icon: true },
    { name: "Procurement Plan", icon: false, href: "/dashboard/procurement/procurement-plan" },
    { name: "Details", icon: false },
  ];

  if (isLoading) {
    return (
      <section className="min-h-screen space-y-10">
        <BreadcrumbCard list={breadcrumbs} />
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen space-y-10">
        <BreadcrumbCard list={breadcrumbs} />
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <Icon icon="ph:warning-circle" className="mx-auto text-4xl text-red-500" />
            <h3 className="text-lg font-semibold text-red-600">Error Loading Procurement Plan</h3>
            <p className="text-gray-600">{error.message}</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => refetch()}>
                <Icon icon="ph:arrow-clockwise" className="mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  const plan: ProcurementPlanResultsData = planData?.data || {};

  return (
    <section className="min-h-screen space-y-10">
      <BreadcrumbCard list={breadcrumbs} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Procurement Plan Details</h1>
          <p className="text-gray-600">
            View detailed information about this procurement plan
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <Icon icon="ph:arrow-left" className="mr-2" />
          Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 font-medium">{plan.description || "No description"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Financial Year</label>
                <p className="mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {plan.financial_year || "N/A"}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Approved Budget</label>
                <p className="mt-1 font-semibold text-green-600">
                  {plan.approved_budget
                    ? `₦${plan.approved_budget.toLocaleString()}`
                    : "Not specified"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Procurement Process</label>
                <p className="mt-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
                    {plan.procurement_process || "Pending"}
                  </span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project & Implementation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Project</label>
                <p className="mt-1">{plan.project || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Implementer</label>
                <p className="mt-1">{plan.implementer || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Implementation Location</label>
                <p className="mt-1">{plan.implementation_location || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">PR Staff</label>
                <p className="mt-1">{plan.pr_staff || "Not assigned"}</p>
              </div>
            </div>
          </Card>

          {plan.workplan_activity_object && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Workplan Activity</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Activity ID</label>
                  <p className="mt-1 font-mono text-sm">{plan.workplan_activity_object.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Activity Description</label>
                  <p className="mt-1">{plan.workplan_activity_object.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Reference</label>
                  <p className="mt-1">{plan.workplan_activity_reference || "N/A"}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status & Dates</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Created Date</label>
                <p className="mt-1 text-sm">
                  {plan.created_at
                    ? new Date(plan.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "N/A"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="mt-1 text-sm">
                  {plan.updated_at
                    ? new Date(plan.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "N/A"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Start Date</label>
                <p className="mt-1 text-sm">
                  {plan.start_date
                    ? new Date(plan.start_date).toLocaleDateString()
                    : "Not specified"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Expected Delivery</label>
                <div className="mt-1 space-y-1">
                  {plan.expected_delivery_date_1 && (
                    <p className="text-sm">
                      Phase 1: {new Date(plan.expected_delivery_date_1).toLocaleDateString()}
                    </p>
                  )}
                  {plan.expected_delivery_date_2 && (
                    <p className="text-sm">
                      Phase 2: {new Date(plan.expected_delivery_date_2).toLocaleDateString()}
                    </p>
                  )}
                  {!plan.expected_delivery_date_1 && !plan.expected_delivery_date_2 && (
                    <p className="text-sm text-gray-500">Not specified</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Mode of Procurement</label>
                <p className="mt-1 text-sm">{plan.mode_of_procurement || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">PPM Status</label>
                <p className="mt-1">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    plan.is_ppm
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {plan.is_ppm ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Committee Review</label>
                <p className="mt-1 text-sm">{plan.procurement_committee_review || "Pending"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Budget Line</label>
                <p className="mt-1 text-sm">{plan.budget_line || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Warehouses</label>
                <p className="mt-1 text-sm">{plan.ware_houses || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Selected Supplier</label>
                <p className="mt-1 text-sm">{plan.selected_supplier || "Not selected"}</p>
              </div>
            </div>
          </Card>

          {(plan.donor_remarks || plan.implenter_remarks) && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Remarks</h3>
              <div className="space-y-4">
                {plan.donor_remarks && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Donor Remarks</label>
                    <p className="mt-1 text-sm p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      {plan.donor_remarks}
                    </p>
                  </div>
                )}
                {plan.implenter_remarks && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Implementer Remarks</label>
                    <p className="mt-1 text-sm p-3 bg-green-50 border-l-4 border-green-400 rounded">
                      {plan.implenter_remarks}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}