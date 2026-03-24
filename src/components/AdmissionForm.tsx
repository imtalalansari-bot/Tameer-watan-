import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { CheckCircle, Loader2, Download, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const admissionSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  fatherName: z.string().min(3, "Father's name is required"),
  cnic: z.string().min(13, "Invalid CNIC/B-Form"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Full address is required"),
  classApplyingFor: z.string().min(1, "Select a class"),
  previousSchool: z.string().optional(),
  marks: z.number().min(0, "Invalid marks"),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export default function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<AdmissionFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: '',
      fatherName: '',
      cnic: '',
      phone: '',
      email: '',
      address: '',
      classApplyingFor: '',
      previousSchool: '',
      marks: 0,
    }
  });

  const onSubmit = async (data: AdmissionFormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'admissions'), {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      setSubmittedData(data);
      setIsSuccess(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#ffffff', '#064e3b']
      });
      reset();
    } catch (error) {
      console.error("Error submitting admission:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    if (!submittedData) {
      console.error("No submitted data found for PDF generation");
      return;
    }

    try {
      const doc = new jsPDF();
      const primaryColor: [number, number, number] = [16, 185, 129]; // Emerald Green

      // Header
      doc.setFillColor(2, 8, 4); // Dark background
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('TAMEER-E-WATAN SCHOOL', 105, 20, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('ADMISSION ACKNOWLEDGMENT RECEIPT', 105, 30, { align: 'center' });

      // Body
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text('Application Details', 20, 55);
      
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.line(20, 58, 65, 58);

      const tableData = [
        ['Full Name', submittedData.fullName],
        ['Father\'s Name', submittedData.fatherName],
        ['CNIC / B-Form', submittedData.cnic],
        ['Class Applying For', submittedData.classApplyingFor],
        ['Email', submittedData.email],
        ['Phone', submittedData.phone],
        ['Previous School', submittedData.previousSchool || 'N/A'],
        ['SSC Marks', submittedData.marks.toString()],
        ['Submission Date', new Date().toLocaleDateString()],
        ['Status', 'Pending Review']
      ];

      autoTable(doc, {
        startY: 65,
        head: [['Field', 'Information']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: primaryColor, textColor: [0, 0, 0] },
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
      });

      // Footer
      const finalY = (doc as any).lastAutoTable?.finalY || 150;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Note: This is an electronically generated receipt. Please keep it for your records.', 20, finalY + 20);
      doc.text('Our admissions office will contact you shortly for the next steps.', 20, finalY + 25);

      const fileName = `Admission_Receipt_${submittedData.fullName.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please try again or take a screenshot of this page.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center"
      >
        <div className="w-20 h-20 bg-[#10b981] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <CheckCircle className="text-black w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">Application Submitted!</h2>
        <p className="text-white/60 mb-8">
          Thank you for applying to Tameer-E-Watan. Your application has been received. You can download your receipt below.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={generatePDF}
            className="w-full sm:w-auto px-8 py-4 bg-[#10b981] hover:bg-[#059669] text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <Download className="w-5 h-5" />
            DOWNLOAD RECEIPT (PDF)
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setSubmittedData(null);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
          >
            Submit Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-white tracking-tighter mb-2">ADMISSION FORM</h2>
        <p className="text-white/40 uppercase tracking-widest text-xs">Academic Session 2026-27</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Full Name</label>
          <input
            {...register('fullName')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Father's Name</label>
          <input
            {...register('fatherName')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="Robert Doe"
          />
          {errors.fatherName && <p className="text-red-400 text-xs">{errors.fatherName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">CNIC / B-Form</label>
          <input
            {...register('cnic')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="12345-6789012-3"
          />
          {errors.cnic && <p className="text-red-400 text-xs">{errors.cnic.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Phone Number</label>
          <input
            {...register('phone')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="+92 300 1234567"
          />
          {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Email Address</label>
          <input
            {...register('email')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Class Applying For</label>
          <select
            {...register('classApplyingFor')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all appearance-none"
          >
            <option value="" className="bg-[#020804]">Select Class</option>
            <option value="9th" className="bg-[#020804]">9th Grade</option>
            <option value="10th" className="bg-[#020804]">10th Grade</option>
            <option value="11th" className="bg-[#020804]">11th Grade (FSc)</option>
            <option value="12th" className="bg-[#020804]">12th Grade (FSc)</option>
          </select>
          {errors.classApplyingFor && <p className="text-red-400 text-xs">{errors.classApplyingFor.message}</p>}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Full Address</label>
          <textarea
            {...register('address')}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all resize-none"
            placeholder="Street, City, District..."
          />
          {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Previous School</label>
          <input
            {...register('previousSchool')}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="School Name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/60 uppercase tracking-widest">Obtained Marks (SSC)</label>
          <input
            {...register('marks', { valueAsNumber: true })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] outline-none transition-all"
            placeholder="e.g. 950"
          />
          {errors.marks && <p className="text-red-400 text-xs">{errors.marks.message}</p>}
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#10b981] hover:bg-[#059669] text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "SUBMIT APPLICATION"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
