export default async function ModontyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // This layout only exists to prevent WhatsApp button from showing
  // Navigation and Footer are handled by parent layout
  await params; // Ensure params is awaited to satisfy TypeScript
  return <>{children}</>;
}

