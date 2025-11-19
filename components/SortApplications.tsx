'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortApplicationsProps {
  locale: string;
  currentSort?: string;
}

export function SortApplications({ locale, currentSort = 'newest' }: SortApplicationsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isArabic = locale === 'ar';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={isArabic ? 'ترتيب حسب' : 'Sort by'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">
            {isArabic ? 'الأحدث أولاً' : 'Newest First'}
          </SelectItem>
          <SelectItem value="oldest">
            {isArabic ? 'الأقدم أولاً' : 'Oldest First'}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}




