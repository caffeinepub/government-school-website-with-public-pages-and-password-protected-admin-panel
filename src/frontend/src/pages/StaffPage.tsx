import { useGetStaffList } from '../hooks/usePublicContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export default function StaffPage() {
  const { data: staffList, isLoading } = useGetStaffList();

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Staff & Faculty</h1>
          <p className="text-lg text-muted-foreground">
            Meet our dedicated team of educators committed to student success.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : staffList && staffList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffList.map((staff) => (
              <Card key={staff.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={staff.photoUrl} alt={staff.name} />
                      <AvatarFallback className="text-2xl">
                        {staff.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{staff.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{staff.position}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{staff.biography}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Staff information will be available soon. Please check back later.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
