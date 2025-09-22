"use client";

import LongArrowLeft from "components/icons/LongArrowLeft";
import { useRouter, useParams } from "next/navigation";
import EditPurchaseRequestForm from "./form";
import BreadcrumbCard from "components/Breadcrumb";
import { useGetPurchaseRequestById } from "@/features/procurement/controllers/purchaseRequestController";
import { useGetActivityMemo } from "@/features/procurement/controllers/activityMemoController";
import { LoadingSpinner } from "components/Loading";

function PurchaseRequestEdit() {
  const router = useRouter();
  const { id } = useParams();

  // Get purchase request data
  const { data: purchaseRequest, isLoading: isPRLoading } = useGetPurchaseRequestById(id as string);

  // Get activity memo data if available
  const activityMemoId = purchaseRequest?.data?.request_memo;
  const { data: activityMemo, isLoading: isAMLoading } = useGetActivityMemo(activityMemoId as string, !!activityMemoId);


  const goBack = () => {
    router.back();
  };

  const breadcrumbs = [
    { name: "Procurement", icon: true },
    { name: "Purchase Request", icon: true },
    { name: "Edit", icon: false },
  ];

  if (isPRLoading || isAMLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='space-y-6'>
      <BreadcrumbCard list={breadcrumbs} />

      <button
        onClick={goBack}
        className='w-[3rem] aspect-square rounded-full drop-shadow-md bg-white flex items-center justify-center'
      >
        <LongArrowLeft />
      </button>

      <span className='block space-y-2'>
        <h3 className='font-semibold text-xl text-black text-[24px]'>
          Edit Purchase Request
        </h3>
        <p className='text-gray-600'>
          REF: {purchaseRequest?.data?.ref_number || 'N/A'}
        </p>
      </span>

      <EditPurchaseRequestForm
        purchaseRequestData={purchaseRequest?.data}
        activityMemoData={activityMemo?.data}
        purchaseRequestId={id as string}
      />
    </section>
  );
}

export default PurchaseRequestEdit;