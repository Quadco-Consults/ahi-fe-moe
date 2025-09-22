"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFileSvg } from "assets/svgs/CAndGSvgs";
import FormButton from "@/components/FormButton";
import FormInput from "components/atoms/FormInput";
import FormSelect from "components/atoms/FormSelectField";
import { Button } from "components/ui/button";
import { Form } from "components/ui/form";
import { ChangeEvent, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import * as XLSX from "xlsx";
import { Input } from "components/ui/input";
import Modal from "react-modal";
import { useCreateProcurementPlan, useDownloadProcurementPlanTemplate } from "@/features/procurement/controllers/procurementPlanController";
import { toast } from "sonner";
import { useGetAllFinancialYearsManager } from "@/features/modules/controllers/config/financialYearController";
import { closeDialog } from "store/ui";
import { useDispatch } from "react-redux";
import { useGetAllProjects } from "@/features/projects/controllers/projectController";

type PropsType = {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const FormSchema = z.object({
  financial_year: z.string().min(1, "Please select a Financial Year"),
  file: z.string().min(1, "Please select a file to upload"),
  project: z.string().min(1, "Please select a Project"),
});

const ProcurementPlanUploadModal = (props: PropsType) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | Blob | null>(null);


  const { createProcurementPlan, isLoading: creatingPlan } = useCreateProcurementPlan();
  const { downloadTemplate } = useDownloadProcurementPlanTemplate();

  const { data: financialYear } = useGetAllFinancialYearsManager({
    size: 1000,
  });

  const { data: project } = useGetAllProjects({
    page: 1,
    size: 1000000,
  });
  // @ts-ignore
  const financialYearOptions = financialYear?.data.results.map(
    // @ts-ignore
    ({ year, id }) => ({
      label: year,
      value: id,
    })
  );

  // @ts-ignore
  const projectOptions = project?.data.results.map(({ title, id }) => ({
    label: title,
    value: id,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      financial_year: "",
      file: "1",
      project: "",
    },
  });

  const { handleSubmit } = form;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // Check if file is Excel
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only Excel files (.xlsx, .xls) are allowed.");
        e.target.value = ""; // Reset the input
        setFile(null);
        return;
      }
    }

    setFile(file);
  };

  const handleDownloadTemplate = async () => {
    try {
      await downloadTemplate();
      toast.success("Template downloaded successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to download template");
    }
  };

  const onSubmit = async (data: { financial_year: string | Blob; project: string | Blob }) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("financial_year", data?.financial_year as string);
    formData.append("project", data?.project as string);
    
    
    try {
      await createProcurementPlan(formData as any);
      toast.success("Procurement plan uploaded successfully!");
      form.reset();
      setFile(null);
      props.onCancel();
    } catch (error: any) {
      const errorMessage = error?.message || error?.data?.message || "An error occurred";
      
      // If it's a column validation error, show it more clearly
      if (errorMessage.includes("Missing required columns")) {
        toast.error(errorMessage, {
          duration: 8000, // Show longer for column errors
        });
      } else {
        toast.error(errorMessage);
      }
    }

    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   // @ts-ignore
    //   const data = new Uint8Array(e.target.result);
    //   const workbook = XLSX.read(data, { type: "array" });
    //   const sheetName = workbook.SheetNames[0];
    //   const worksheet = workbook.Sheets[sheetName];
    //   const jsonData = XLSX.utils.sheet_to_json(worksheet);
    //   props.onOk(jsonData);
    //   props.onCancel();
    // };

    // reader.readAsArrayBuffer(file as Blob);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onCancel}
      style={customStyles}
      ariaHideApp={false}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='font-bold text-[18px] text-center'>
            Upload Procurement Plan
          </h2>

          {/* Template Download Section */}
          <div className='mt-5 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-medium text-blue-900'>Need a template?</h3>
                <p className='text-sm text-blue-700'>Download the Excel template with sample data and required columns.</p>
              </div>
              <Button
                type='button'
                variant='outline'
                onClick={handleDownloadTemplate}
                className='flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-100'
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Template
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-2'>
              <FormSelect
                label='Financial Year'
                name='financial_year'
                required
                options={financialYearOptions}
              />
            </div>
            <div className='flex items-center gap-2'>
              <FormSelect
                label='Project'
                name='project'
                required
                options={projectOptions}
              />
            </div>
            <div className='w-full relative gap-x-3 h-[52px] rounded-[16.2px] border flex justify-center items-center px-5'>
              <UploadFileSvg />
              <div>
                <Input
                  type='file'
                  className='bg-inherit border-none cursor-pointer'
                  multiple={false}
                  accept='.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
                  onChange={handleFileChange}
                  name=''
                />

                <FormInput type='hidden' label='' name='file' />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <Button
                type='button'
                className='bg-[#FFF2F2] text-primary border-none'
                onClick={props.onCancel}
              >
                Cancel
              </Button>
              <FormButton
                className='bg-primary text-white border-none'
                loading={creatingPlan}
                disabled={creatingPlan || !file}
              >
                {creatingPlan ? "Uploading..." : "Upload"}
              </FormButton>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ProcurementPlanUploadModal;
