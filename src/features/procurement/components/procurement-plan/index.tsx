"use client";

import Card from "components/Card";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Button } from "components/ui/button";
import AddSquareIcon from "components/icons/AddSquareIcon";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import SearchIcon from "components/icons/SearchIcon";
import DataTable from "components/Table/DataTable";
import BreadcrumbCard from "components/Breadcrumb";
import UploadIcon from "components/icons/UploadIcon";
import { useState, useMemo } from "react";
import ProcurementPlanUploadModal from "./components/ProcurementPlanUploadModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { RouteEnum } from "constants/RouterConstants";
import IconButton from "components/IconButton";
import { Icon } from "@iconify/react";
import { useGetAllProcurementPlans, useDownloadProcurementPlanTemplate } from "../../controllers/procurementPlanController";
import { ProcurementPlanResultsData } from "../../types/procurementPlan";
import { Loading } from "components/Loading";
import { toast } from "sonner";

export default function ProcurementPlan() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // API call for procurement plans
  const {
    data: procurementPlansData,
    isLoading,
    error,
    refetch
  } = useGetAllProcurementPlans({
    page,
    size: pageSize,
    search: searchTerm,
    enabled: true
  });

  // Template download hook
  const { downloadTemplate } = useDownloadProcurementPlanTemplate();

  const breadcrumbs = [
    { name: "Procurement", icon: true },
    { name: "Procurement Plan", icon: false },
  ];

  // Handle modal close and refetch data
  const handleModalClose = () => {
    setModalOpen(false);
    refetch(); // Refresh data after upload
  };

  // Memoized data processing
  const procurementPlans = useMemo(() => {
    return procurementPlansData?.data?.results || [];
  }, [procurementPlansData]);

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Handle template download
  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate();
      toast.success("Template downloaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to download template");
    }
  };

  // Show error state
  if (error) {
    return (
      <section className='min-h-screen space-y-10'>
        <BreadcrumbCard list={breadcrumbs} />
        <Card className='p-8 text-center'>
          <div className='space-y-4'>
            <Icon icon='ph:warning-circle' className='mx-auto text-4xl text-red-500' />
            <h3 className='text-lg font-semibold text-red-600'>Error Loading Procurement Plans</h3>
            <p className='text-gray-600'>{error.message}</p>
            <Button onClick={() => refetch()} className='mt-4'>
              <Icon icon='ph:arrow-clockwise' className='mr-2' />
              Try Again
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className='min-h-screen space-y-10'>
      <BreadcrumbCard list={breadcrumbs} />

      <div className='flex items-center justify-end gap-4'>
        <Button
          variant='outline'
          onClick={handleDownloadTemplate}
          className='flex items-center gap-2'
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Template
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button className='flex gap-2 py-6'>
              <AddSquareIcon />
              New Procurement Plan
              <ArrowDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=' w-fit'>
            <div className='flex flex-col items-start justify-between gap-1'>
              <Button
                className='w-full flex items-center gap-2 justify-start'
                variant='ghost'
                onClick={() => setModalOpen(true)}
              >
                <UploadIcon /> Upload Procurement plan
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Card className='space-y-5'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center w-1/3 px-2 py-2 border rounded-lg'>
            <SearchIcon />
            <input
              placeholder='Search procurement plans...'
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              className='ml-2 h-full w-full border-none bg-none focus:outline-none outline-none'
            />
          </div>

          {isLoading && (
            <div className='flex items-center gap-2 text-gray-500'>
              <Icon icon='ph:spinner' className='animate-spin' />
              <span>Loading...</span>
            </div>
          )}
        </div>

        {procurementPlans.length === 0 && !isLoading ? (
          <div className='text-center py-12'>
            <Icon icon='ph:folder-open' className='mx-auto text-4xl text-gray-400 mb-4' />
            <h3 className='text-lg font-semibold text-gray-600 mb-2'>No Procurement Plans Found</h3>
            <p className='text-gray-500 mb-4'>
              {searchTerm
                ? `No plans match "${searchTerm}". Try a different search term.`
                : "Upload your first procurement plan to get started."
              }
            </p>
            <Button onClick={() => setModalOpen(true)}>
              <UploadIcon />
              Upload Procurement Plan
            </Button>
          </div>
        ) : (
          <DataTable
            data={procurementPlans}
            columns={columns}
            isLoading={isLoading}
          />
        )}

        <ProcurementPlanUploadModal
          isOpen={isModalOpen}
          onCancel={handleModalClose}
          onOk={handleModalClose}
        />
      </Card>
    </section>
  );
}

const columns: ColumnDef<ProcurementPlanResultsData>[] = [
  {
    header: "S/N",
    accessorKey: "id",
    size: 80,
    cell: ({ row }) => (
      <span className="font-medium">{row.index + 1}</span>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="font-medium truncate" title={row.original.description}>
          {row.original.description || "No description"}
        </p>
        {row.original.workplan_activity_object && (
          <p className="text-sm text-gray-500 truncate" title={row.original.workplan_activity_object.description}>
            Activity: {row.original.workplan_activity_object.description}
          </p>
        )}
      </div>
    ),
  },
  {
    header: "Financial Year",
    accessorKey: "financial_year",
    size: 120,
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {row.original.financial_year || "N/A"}
      </span>
    ),
  },
  {
    header: "Budget",
    accessorKey: "approved_budget",
    size: 120,
    cell: ({ row }) => (
      <span className="font-medium text-green-600">
        {row.original.approved_budget
          ? `₦${row.original.approved_budget.toLocaleString()}`
          : "N/A"
        }
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "procurement_process",
    size: 100,
    cell: ({ row }) => {
      const status = row.original.procurement_process || "pending";
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        ongoing: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };

      return (
        <span className={`px-2 py-1 rounded-full text-sm capitalize ${statusColors[status as keyof typeof statusColors] || statusColors.pending}`}>
          {status}
        </span>
      );
    },
  },
  {
    header: "Created",
    accessorKey: "created_at",
    size: 120,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.created_at
          ? new Date(row.original.created_at).toLocaleDateString()
          : "N/A"
        }
      </span>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    size: 80,
    cell: ({ row }) => <ActionListAction data={row.original} />,
  },
];

const ActionListAction = ({ data }: { data: ProcurementPlanResultsData }) => {
  return (
    <div className='flex gap-2 items-center justify-center'>
      <Link
        href={`/dashboard/procurement/procurement-plan/${data?.id}`}
        title="View Details"
      >
        <IconButton className='bg-[#F9F9F9] hover:text-primary border'>
          <Icon icon='ph:eye-duotone' fontSize={15} />
        </IconButton>
      </Link>
      {/* Add more actions as needed */}
    </div>
  );
};
