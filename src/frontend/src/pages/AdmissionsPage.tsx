import ContentBlock from '../components/ContentBlock';
import { useGetContentBlock } from '../hooks/usePublicContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function AdmissionsPage() {
  const { data: processBlock, isLoading: processLoading } = useGetContentBlock('admissions-process');
  const { data: requirementsBlock, isLoading: requirementsLoading } = useGetContentBlock('admissions-requirements');
  const { data: datesBlock, isLoading: datesLoading } = useGetContentBlock('admissions-dates');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Admissions</h1>
          <p className="text-lg text-muted-foreground">
            Join our community of learners. Learn about our admission process and requirements.
          </p>
        </div>

        {processLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : processBlock ? (
          <ContentBlock title={processBlock.title} content={processBlock.content} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admission Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Step 1: Application Submission</h3>
                  <p className="text-muted-foreground">
                    Complete and submit the admission application form with all required documents.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Step 2: Document Verification</h3>
                  <p className="text-muted-foreground">
                    Our admissions team will review and verify all submitted documents.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Step 3: Entrance Assessment</h3>
                  <p className="text-muted-foreground">
                    Students may be required to take an entrance assessment based on grade level.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Step 4: Admission Decision</h3>
                  <p className="text-muted-foreground">
                    Receive admission decision and complete enrollment formalities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {requirementsLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : requirementsBlock ? (
          <ContentBlock title={requirementsBlock.title} content={requirementsBlock.content} />
        ) : (
          <ContentBlock
            title="Required Documents"
            content="• Birth Certificate\n• Previous School Records\n• Proof of Residence\n• Passport-size Photographs\n• Medical Records\n• Parent/Guardian ID Proof"
          />
        )}

        {datesLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : datesBlock ? (
          <ContentBlock title={datesBlock.title} content={datesBlock.content} />
        ) : (
          <ContentBlock
            title="Important Dates"
            content="Admission applications are accepted throughout the year. Please contact our admissions office for specific deadlines and available seats for each grade level."
          />
        )}
      </div>
    </div>
  );
}
