"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { getCategoryTree } from "@/actions/categories";
import { CategoryType } from "@prisma/client";
import type { CostItem } from "@/helpers/financialCalculations";

interface EditCostItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (data: {
    categoryType: "fixed" | "variable";
    categoryKey: string;
    itemIndex: number;
    item: {
      label: string;
      amount: number;
      category: string;
      details?: string;
    };
  }) => Promise<void>;
  categoryType: "fixed" | "variable";
  categoryKey: string;
  itemIndex: number;
  item: CostItem;
  costId: string;
}

interface Category {
  id: string;
  key: string;
  label: string;
  parentKey: string | null;
  type: CategoryType;
  children?: Category[];
}

export function EditCostItemDialog({
  open,
  onOpenChange,
  onEdit,
  categoryType,
  categoryKey,
  itemIndex,
  item,
  costId,
}: EditCostItemDialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    mainCategory: categoryKey,
    subcategory: item.category && item.category !== categoryKey ? item.category : "",
    label: item.label,
    amount: item.amount.toString(),
    details: item.details || "",
  });

  useEffect(() => {
    if (open) {
      loadCategories();
      setFormData({
        mainCategory: categoryKey,
        subcategory: item.category && item.category !== categoryKey ? item.category : "",
        label: item.label,
        amount: item.amount.toString(),
        details: item.details || "",
      });
    } else {
      setError(null);
    }
  }, [open, categoryKey, item]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await getCategoryTree();
      if (result.success && result.categories) {
        const filtered = result.categories.filter(
          (cat) =>
            cat.type === CategoryType.EXPENSE
        );
        setCategories(filtered);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedMainCategory = () => {
    return categories.find((cat) => cat.key === formData.mainCategory);
  };

  const getSubcategories = () => {
    const mainCategory = getSelectedMainCategory();
    return mainCategory?.children || [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.mainCategory) {
      setError("يرجى اختيار الفئة الرئيسية");
      return;
    }

    if (!formData.label.trim()) {
      setError("اسم العنصر مطلوب");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) < 0) {
      setError("المبلغ مطلوب ويجب أن يكون أكبر من أو يساوي صفر");
      return;
    }

    setSubmitting(true);

    try {
      const mainCategoryKey = formData.subcategory || formData.mainCategory;
      const categoryKey = formData.mainCategory;

      const updatedItem = {
        label: formData.label.trim(),
        amount: parseFloat(formData.amount),
        category: mainCategoryKey,
        details: formData.details.trim() || undefined,
      };

      await onEdit({
        categoryType,
        categoryKey,
        itemIndex,
        item: updatedItem,
      });

      setError(null);
      // Close dialog after successful edit
      onOpenChange(false);
    } catch (err) {
      setError("حدث خطأ أثناء تحديث العنصر");
      console.error("Edit item error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setFormData({
        mainCategory: categoryKey,
        subcategory: item.category && item.category !== categoryKey ? item.category : "",
        label: item.label,
        amount: item.amount.toString(),
        details: item.details || "",
      });
      setError(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تعديل عنصر التكلفة</DialogTitle>
          <DialogDescription>
            قم بتعديل تفاصيل عنصر التكلفة
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mainCategory">الفئة الرئيسية *</Label>
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <Select
                  value={formData.mainCategory}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      mainCategory: value,
                      subcategory: "",
                    });
                  }}
                >
                  <SelectTrigger id="mainCategory">
                    <SelectValue placeholder="اختر الفئة الرئيسية" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.key}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {formData.mainCategory && getSubcategories().length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="subcategory">الفئة الفرعية (اختياري)</Label>
                <Select
                  value={formData.subcategory || undefined}
                  onValueChange={(value) =>
                    setFormData({ ...formData, subcategory: value })
                  }
                >
                  <SelectTrigger id="subcategory">
                    <SelectValue placeholder="اختر الفئة الفرعية (اختياري)" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSubcategories().map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.key}>
                        {subcategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="label">اسم العنصر *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="مثال: راتب مطور"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">التفاصيل (اختياري)</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                placeholder="أضف أي تفاصيل إضافية..."
                rows={3}
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={submitting}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري التحديث...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}











