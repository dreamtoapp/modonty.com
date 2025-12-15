'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Edit, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InvoiceImageUpload } from './InvoiceImageUpload';
import { updateTransaction } from '@/actions/accounting';

interface Transaction {
  id: string;
  type: 'EXPENSE' | 'REVENUE';
  amount: number;
  description: string;
  category: string | null;
  date: Date;
  invoiceImageUrl: string | null;
  invoiceImagePublicId: string | null;
}

interface EditTransactionDialogProps {
  transaction: Transaction;
  onSuccess?: () => void;
}

export function EditTransactionDialog({ transaction, onSuccess }: EditTransactionDialogProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    amount: transaction.amount.toString(),
    description: transaction.description,
    category: transaction.category || '',
    date: new Date(transaction.date).toISOString().split('T')[0],
    invoiceImageUrl: transaction.invoiceImageUrl || '',
    invoiceImagePublicId: transaction.invoiceImagePublicId || '',
  });

  useEffect(() => {
    if (open) {
      setFormData({
        amount: transaction.amount.toString(),
        description: transaction.description,
        category: transaction.category || '',
        date: new Date(transaction.date).toISOString().split('T')[0],
        invoiceImageUrl: transaction.invoiceImageUrl || '',
        invoiceImagePublicId: transaction.invoiceImagePublicId || '',
      });
      setError(null);
    }
  }, [open, transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError(isArabic ? 'المبلغ مطلوب ويجب أن يكون أكبر من صفر' : 'Amount is required and must be greater than 0');
      return;
    }

    if (!formData.description.trim()) {
      setError(isArabic ? 'الوصف مطلوب' : 'Description is required');
      return;
    }

    setSubmitting(true);

    try {
      const result = await updateTransaction(transaction.id, {
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        category: formData.category || undefined,
        date: new Date(formData.date),
        ...(transaction.type === 'EXPENSE' ? {
          invoiceImageUrl: formData.invoiceImageUrl || undefined,
          invoiceImagePublicId: formData.invoiceImagePublicId || undefined,
        } : {}),
      });

      if (result.success) {
        setOpen(false);
        setError(null);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(result.error || (isArabic ? 'فشل في تعديل المعاملة' : 'Failed to update transaction'));
      }
    } catch {
      setError(isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          {isArabic ? 'تعديل' : 'Edit'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? 'تعديل المعاملة' : 'Edit Transaction'}
          </DialogTitle>
          <DialogDescription>
            {isArabic 
              ? 'قم بتعديل بيانات المعاملة'
              : 'Update transaction details'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">
                {isArabic ? 'المبلغ' : 'Amount'} *
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                disabled={submitting}
                placeholder={isArabic ? '0.00' : '0.00'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">
                {isArabic ? 'التاريخ' : 'Date'} *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              {isArabic ? 'الفئة' : 'Category'} (اختياري / Optional)
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              disabled={submitting}
            >
              <SelectTrigger>
                <SelectValue placeholder={isArabic ? 'اختر الفئة' : 'Select category'} />
              </SelectTrigger>
              <SelectContent>
                {transaction.type === 'EXPENSE' ? (
                  <>
                    <SelectItem value="salaries">{isArabic ? 'رواتب' : 'Salaries'}</SelectItem>
                    <SelectItem value="marketing">{isArabic ? 'إعلانات' : 'Marketing'}</SelectItem>
                    <SelectItem value="operations">{isArabic ? 'تشغيل' : 'Operations'}</SelectItem>
                    <SelectItem value="office">{isArabic ? 'مكتب' : 'Office'}</SelectItem>
                    <SelectItem value="utilities">{isArabic ? 'مرافق' : 'Utilities'}</SelectItem>
                    <SelectItem value="other">{isArabic ? 'أخرى' : 'Other'}</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="sales">{isArabic ? 'مبيعات' : 'Sales'}</SelectItem>
                    <SelectItem value="subscriptions">{isArabic ? 'اشتراكات' : 'Subscriptions'}</SelectItem>
                    <SelectItem value="services">{isArabic ? 'خدمات' : 'Services'}</SelectItem>
                    <SelectItem value="other">{isArabic ? 'أخرى' : 'Other'}</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {isArabic ? 'الوصف' : 'Description'} *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              disabled={submitting}
              rows={3}
              placeholder={isArabic ? 'وصف المعاملة...' : 'Describe the transaction...'}
            />
          </div>

          {transaction.type === 'EXPENSE' && (
            <div className="space-y-2">
              <Label>
                {isArabic ? 'صورة الفاتورة' : 'Invoice Image'} (اختياري / Optional)
              </Label>
              <InvoiceImageUpload
                currentImageUrl={formData.invoiceImageUrl}
                onUploadSuccess={(url, publicId) => {
                  setFormData({ ...formData, invoiceImageUrl: url, invoiceImagePublicId: publicId });
                }}
                onUploadError={(error) => {
                  setError(error);
                }}
                disabled={submitting}
              />
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isArabic ? 'جاري الحفظ...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  {isArabic ? 'حفظ' : 'Save'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}














