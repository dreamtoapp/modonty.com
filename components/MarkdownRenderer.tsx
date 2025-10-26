import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-slate dark:prose-invert max-w-none"
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mb-4 mt-8 border-b pb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="mb-4 leading-7">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-7">{children}</li>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-border">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-muted">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-start text-sm font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm border-b">{children}</td>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          return isInline ? (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ) : (
            <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
              {children}
            </code>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-4">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

