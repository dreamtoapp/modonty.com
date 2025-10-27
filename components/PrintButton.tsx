'use client';

import { Printer } from 'lucide-react';
import { Button } from './ui/button';

interface PrintButtonProps {
  label: string;
}

export function PrintButton({ label }: PrintButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
    >
      <Printer className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}









