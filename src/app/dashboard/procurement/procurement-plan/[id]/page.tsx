"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";

const ProcurementPlanDetail = dynamic(
  () => import("@/features/procurement/components/procurement-plan/components/ProcurementPlanDetail"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function ProcurementPlanDetailPage() {
  return <ProcurementPlanDetail />;
}