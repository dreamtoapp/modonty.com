import { getTranslations } from 'next-intl/server';
import { Calculator } from 'lucide-react';
import { AccountingClient } from '@/components/AccountingClient';
import { getTransactions, getTrialBalance } from '@/actions/accounting';

export default async function AccountingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('admin');

  const [transactions, trialBalance] = await Promise.all([
    getTransactions(),
    getTrialBalance(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
            <Calculator className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {t('accounting')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {locale === 'ar'
                ? 'نظام محاسبة بسيط لتتبع مصاريف ومدخولات نظام مدونتي - ينمو معنا'
                : 'Simple accounting system to track Modonty system expenses and income - grows with us'}
            </p>
          </div>
        </div>
      </div>

      <AccountingClient 
        initialTransactions={transactions}
        initialTrialBalance={trialBalance}
      />
    </div>
  );
}

