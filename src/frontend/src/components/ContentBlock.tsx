import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentBlockProps {
  title: string;
  content: string;
  className?: string;
}

export default function ContentBlock({ title, content, className = '' }: ContentBlockProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
}
