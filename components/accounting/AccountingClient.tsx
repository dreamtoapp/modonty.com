'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AddExpenseDialog } from './AddExpenseDialog';
import { AddRevenueDialog } from './AddRevenueDialog';
import { EditTransactionDialog } from './EditTransactionDialog';
import { Calculator, TrendingUp, TrendingDown, Eye, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getTransactions, getTrialBalance, deleteTransaction, TrialBalance } from '@/actions/accounting';

interface Transaction {
  id: string;
  type: 'EXPENSE' | 'REVENUE';
  amount: number;
  description: string;
  category: string | null;
  date: Date;
  invoiceImageUrl: string | null;
  invoiceImagePublicId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AccountingClientProps {
  initialTransactions: Transaction[];
  initialTrialBalance: TrialBalance;
}

export function AccountingClient({
  initialTransactions,
  initialTrialBalance,
}: AccountingClientProps) {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [trialBalance, setTrialBalance] = useState<TrialBalance>(initialTrialBalance);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; transactionId: string | null }>({
    open: false,
    transactionId: null,
  });
  const [deleting, setDeleting] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [newTransactions, newTrialBalance] = await Promise.all([
        getTransactions(),
        getTrialBalance(),
      ]);
      setTransactions(newTransactions as Transaction[]);
      setTrialBalance(newTrialBalance);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCategoryLabel = (category: string | null) => {
    if (!category) return isArabic ? 'غير محدد' : 'Uncategorized';
    
    const labels: Record<string, { ar: string; en: string }> = {
      salaries: { ar: 'رواتب', en: 'Salaries' },
      marketing: { ar: 'إعلانات', en: 'Marketing' },
      operations: { ar: 'تشغيل', en: 'Operations' },
      office: { ar: 'مكتب', en: 'Office' },
      utilities: { ar: 'مرافق', en: 'Utilities' },
      sales: { ar: 'مبيعات', en: 'Sales' },
      subscriptions: { ar: 'اشتراكات', en: 'Subscriptions' },
      services: { ar: 'خدمات', en: 'Services' },
      other: { ar: 'أخرى', en: 'Other' },
    };

    return labels[category] ? labels[category][locale as 'ar' | 'en'] : category;
  };

  const handleDelete = async () => {
    if (!deleteConfirm.transactionId) return;

    setDeleting(true);
    try {
      const result = await deleteTransaction(deleteConfirm.transactionId);
      if (result.success) {
        setDeleteConfirm({ open: false, transactionId: null });
        await refreshData();
      } else {
        alert(result.error || (isArabic ? 'فشل في حذف المعاملة' : 'Failed to delete transaction'));
      }
    } catch {
      alert(isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const getTransactionToDelete = () => {
    if (!deleteConfirm.transactionId) return null;
    return transactions.find(t => t.id === deleteConfirm.transactionId);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-3 mb-6 justify-end">
        <AddExpenseDialog onSuccess={refreshData} />
        <AddRevenueDialog onSuccess={refreshData} />
      </div>

      {/* Trial Balance Card */}
      <Card className="mb-8 border-emerald-200 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            {isArabic ? 'الميزان التجريبي' : 'Trial Balance'}
          </CardTitle>
          <CardDescription>
            {isArabic
              ? 'ملخص شامل للمصاريف والإيرادات'
              : 'Complete summary of expenses and revenues'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  {isArabic ? 'إجمالي المصاريف' : 'Total Expenses'}
                </span>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(trialBalance.totalExpenses)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {isArabic ? 'إجمالي الإيرادات' : 'Total Revenue'}
                </span>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(trialBalance.totalRevenue)}
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              trialBalance.netProfit >= 0
                ? 'bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/30'
                : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Calculator className={`h-5 w-5 ${
                  trialBalance.netProfit >= 0
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-orange-600 dark:text-orange-400'
                }`} />
                <span className={`text-sm font-medium ${
                  trialBalance.netProfit >= 0
                    ? 'text-teal-700 dark:text-teal-300'
                    : 'text-orange-700 dark:text-orange-300'
                }`}>
                  {isArabic ? 'صافي الربح/الخسارة' : 'Net Profit/Loss'}
                </span>
              </div>
              <p className={`text-2xl font-bold ${
                trialBalance.netProfit >= 0
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-orange-600 dark:text-orange-400'
              }`}>
                {formatCurrency(trialBalance.netProfit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? 'جميع المعاملات' : 'All Transactions'}</CardTitle>
          <CardDescription>
            {isArabic
              ? 'قائمة بجميع المصاريف والإيرادات'
              : 'List of all expenses and revenues'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              {isArabic ? 'جاري التحديث...' : 'Updating...'}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {isArabic ? 'لا توجد معاملات' : 'No transactions yet'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? 'التاريخ' : 'Date'}</TableHead>
                  <TableHead>{isArabic ? 'النوع' : 'Type'}</TableHead>
                  <TableHead>{isArabic ? 'الوصف' : 'Description'}</TableHead>
                  <TableHead>{isArabic ? 'الفئة' : 'Category'}</TableHead>
                  <TableHead className="text-right">{isArabic ? 'المبلغ' : 'Amount'}</TableHead>
                  <TableHead>{isArabic ? 'الفاتورة' : 'Invoice'}</TableHead>
                  <TableHead className="text-center">{isArabic ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === 'EXPENSE' ? 'destructive' : 'default'}
                        className={
                          transaction.type === 'EXPENSE'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        }
                      >
                        {transaction.type === 'EXPENSE'
                          ? isArabic
                            ? 'مصروف'
                            : 'Expense'
                          : isArabic
                            ? 'إيراد'
                            : 'Revenue'}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getCategoryLabel(transaction.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      {transaction.invoiceImageUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedInvoice(transaction.invoiceImageUrl!)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض' : 'View'}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          {isArabic ? 'لا يوجد' : 'N/A'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <EditTransactionDialog 
                          transaction={transaction} 
                          onSuccess={refreshData} 
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm({ open: true, transactionId: transaction.id })}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {isArabic ? 'حذف' : 'Delete'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Invoice View Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'صورة الفاتورة' : 'Invoice Image'}</DialogTitle>
            <DialogDescription>
              {isArabic ? 'عرض صورة الفاتورة' : 'View invoice image'}
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="relative w-full h-[600px] rounded-lg border overflow-hidden bg-muted">
              <Image
                src={selectedInvoice}
                alt="Invoice"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onOpenChange={(open) => setDeleteConfirm({ open, transactionId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isArabic ? 'تأكيد الحذف' : 'Confirm Delete'}</DialogTitle>
            <DialogDescription>
              {isArabic 
                ? 'هل أنت متأكد من حذف هذه المعاملة؟ لا يمكن التراجع عن هذا الإجراء.'
                : 'Are you sure you want to delete this transaction? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          {getTransactionToDelete() && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">
                {isArabic ? 'تفاصيل المعاملة:' : 'Transaction Details:'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'النوع:' : 'Type:'} {getTransactionToDelete()!.type === 'EXPENSE' 
                  ? (isArabic ? 'مصروف' : 'Expense')
                  : (isArabic ? 'إيراد' : 'Revenue')}
              </p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'المبلغ:' : 'Amount:'} {formatCurrency(getTransactionToDelete()!.amount)}
              </p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'الوصف:' : 'Description:'} {getTransactionToDelete()!.description}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm({ open: false, transactionId: null })}
              disabled={deleting}
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isArabic ? 'جاري الحذف...' : 'Deleting...'}
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isArabic ? 'حذف' : 'Delete'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}















