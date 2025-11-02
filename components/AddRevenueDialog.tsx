'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { TrendingUp, Loader2 } from 'lucide-react';
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
import { addRevenue } from '@/actions/accounting';

interface AddRevenueDialogProps {
  onSuccess?: () => void;
}

export function AddRevenueDialog({ onSuccess }: AddRevenueDialogProps) {
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
      const result = await addRevenue({
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        category: formData.category || undefined,
        date: new Date(formData.date),
      });

      if (result.success) {
        setOpen(false);
        setFormData({
          amount: '',
          description: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
        });
        setError(null);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(result.error || (isArabic ? 'فشل في إضافة الإيراد' : 'Failed to add revenue'));
      }
    } catch (err) {
      setError(isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-teal-600 hover:bg-teal-700">
          <TrendingUp className="h-4 w-4 mr-2" />
          {isArabic ? 'إضافة إيراد' : 'Add Revenue'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isArabic ? 'إضافة إيراد' : 'Add Revenue'}</DialogTitle>
          <DialogDescription>
            {isArabic 
              ? 'قم بإضافة إيراد جديد'
              : 'Add a new revenue entry'}
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
                <SelectItem value="sales">{isArabic ? 'مبيعات' : 'Sales'}</SelectItem>
                <SelectItem value="subscriptions">{isArabic ? 'اشتراكات' : 'Subscriptions'}</SelectItem>
                <SelectItem value="services">{isArabic ? 'خدمات' : 'Services'}</SelectItem>
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
              placeholder={isArabic ? 'وصف الإيراد...' : 'Describe the revenue...'}
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
                  <TrendingUp className="h-4 w-4 mr-2" />
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

