import { useGetNotices } from '../hooks/usePublicContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function NoticesListPage() {
  const { data: notices, isLoading } = useGetNotices();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">News & Notices</h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest announcements and updates from our school.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : notices && notices.length > 0 ? (
          <div className="space-y-6">
            {notices.map((notice) => (
              <Card key={notice.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(notice.date)}</span>
                  </div>
                  <CardTitle className="text-2xl">{notice.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-base">
                    {notice.body.substring(0, 200)}
                    {notice.body.length > 200 ? '...' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/notices/$id" params={{ id: notice.id.toString() }}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No notices available at the moment. Please check back later.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
