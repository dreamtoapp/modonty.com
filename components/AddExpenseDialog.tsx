'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Plus, Loader2 } from 'lucide-react';
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
import { InvoiceImageUpload } from '@/components/InvoiceImageUpload';
import { addExpense } from '@/actions/accounting';

interface AddExpenseDialogProps {
  onSuccess?: () => void;
}

export function AddExpenseDialog({ onSuccess }: AddExpenseDialogProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    invoiceImageUrl: '',
    invoiceImagePublicId: '',
  });

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
      const result = await addExpense({
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        category: formData.category || undefined,
        date: new Date(formData.date),
        invoiceImageUrl: formData.invoiceImageUrl || undefined,
        invoiceImagePublicId: formData.invoiceImagePublicId || undefined,
      });

      if (result.success) {
        setOpen(false);
        setFormData({
          amount: '',
          description: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          invoiceImageUrl: '',
          invoiceImagePublicId: '',
        });
        setError(null);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(result.error || (isArabic ? 'فشل في إضافة المصروف' : 'Failed to add expense'));
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
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          {isArabic ? 'إضافة مصروف' : 'Add Expense'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isArabic ? 'إضافة مصروف' : 'Add Expense'}</DialogTitle>
          <DialogDescription>
            {isArabic 
              ? 'قم بإضافة مصروف جديد مع إمكانية رفع صورة الفاتورة'
              : 'Add a new expense with optional invoice image upload'}
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
                <SelectItem value="salaries">{isArabic ? 'رواتب' : 'Salaries'}</SelectItem>
                <SelectItem value="marketing">{isArabic ? 'إعلانات' : 'Marketing'}</SelectItem>
                <SelectItem value="operations">{isArabic ? 'تشغيل' : 'Operations'}</SelectItem>
                <SelectItem value="office">{isArabic ? 'مكتب' : 'Office'}</SelectItem>
                <SelectItem value="utilities">{isArabic ? 'مرافق' : 'Utilities'}</SelectItem>
                <SelectItem value="other">{isArabic ? 'أخرى' : 'Other'}</SelectItem>
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
              placeholder={isArabic ? 'وصف المصروف...' : 'Describe the expense...'}
            />
          </div>

          <div className="space-y-2">
            <Label>
              {isArabic ? 'صورة الفاتورة' : 'Invoice Image'} (اختياري / Optional)
            </Label>
            <InvoiceImageUpload
              onUploadSuccess={(url, publicId) => {
                setFormData({ ...formData, invoiceImageUrl: url, invoiceImagePublicId: publicId });
              }}
              onUploadError={(error) => {
                setError(error);
              }}
              disabled={submitting}
            />
          </div>

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
                  {isArabic ? 'جاري الإضافة...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  {isArabic ? 'إضافة' : 'Add'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

