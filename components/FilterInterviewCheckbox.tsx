'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarClock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilterInterviewCheckboxProps {
  locale: string;
  currentValue?: boolean;
}

export function FilterInterviewCheckbox({ locale, currentValue = false }: FilterInterviewCheckboxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(currentValue);
  const isArabic = locale === 'ar';

  useEffect(() => {
    setChecked(currentValue);
  }, [currentValue]);

  const handleCheckedChange = (checked: boolean) => {
    setChecked(checked);
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('hasInterview', 'true');
    } else {
      params.delete('hasInterview');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <Checkbox
        id="filter-interview"
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />
      <label
        htmlFor="filter-interview"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
      >
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
        <span>{isArabic ? 'عرض من لديهم مقابلة فقط' : 'Show only with interview'}</span>
      </label>
    </div>
  );
}


