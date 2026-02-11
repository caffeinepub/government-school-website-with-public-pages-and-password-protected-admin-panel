import { useParams, Link } from '@tanstack/react-router';
import { useGetNoticeById } from '../hooks/usePublicContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function NoticeDetailPage() {
  const { id } = useParams({ from: '/notices/$id' });
  const { data: notice, isLoading } = useGetNoticeById(BigInt(id));

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">Notice not found.</p>
              <Link to="/notices">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Notices
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/notices">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notices
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(notice.date)}</span>
            </div>
            <CardTitle className="text-3xl md:text-4xl">{notice.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{notice.body}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
