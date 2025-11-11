import { prisma } from '@/lib/prisma';
import { getTranslations } from 'next-intl/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function ContactMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admin' });

  const [messages, subjectLabels] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    Promise.resolve(t.raw('contactSubjectLabels') as Record<string, string>),
  ]);

  const dateFormatter = new Intl.DateTimeFormat(
    locale === 'ar' ? 'ar-SA' : 'en-GB',
    {
      dateStyle: 'medium',
      timeStyle: 'short',
    }
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t('contactMessages')}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t('contactMessagesDesc')}
        </p>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            {t('contactTotal')}
          </CardTitle>
          <CardDescription>{t('contactMessages')}</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-4xl font-black">{messages.length}</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t('contactMessages')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {messages.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              {t('noContactMessages')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('fullName')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('phone')}</TableHead>
                  <TableHead>{t('subject')}</TableHead>
                  <TableHead>{t('contactSubmitted')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => {
                  const readableSubject =
                    subjectLabels[message.subject] ?? message.subject;
                  const submittedAt = dateFormatter.format(message.createdAt);
                  return (
                    <TableRow key={message.id} className="align-top">
                      <TableCell className="font-medium">
                        <div>{message.fullName}</div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                          {message.message}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm">
                        <a
                          href={`mailto:${message.email}`}
                          className="hover:underline text-primary"
                        >
                          {message.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">
                        {message.phone ? (
                          <span dir="ltr" className="font-mono tracking-wide">
                            {message.phone}
                          </span>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        <Badge variant="secondary">{readableSubject}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {submittedAt}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

