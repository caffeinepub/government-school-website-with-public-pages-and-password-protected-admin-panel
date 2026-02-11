import ContentBlock from '../components/ContentBlock';
import { useGetContentBlock } from '../hooks/usePublicContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function AcademicsPage() {
  const { data: curriculumBlock, isLoading: curriculumLoading } = useGetContentBlock('academics-curriculum');
  const { data: programsBlock, isLoading: programsLoading } = useGetContentBlock('academics-programs');
  const { data: facilitiesBlock, isLoading: facilitiesLoading } = useGetContentBlock('academics-facilities');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Academics</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive curriculum designed to foster academic excellence and holistic development.
          </p>
        </div>

        {curriculumLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : curriculumBlock ? (
          <ContentBlock title={curriculumBlock.title} content={curriculumBlock.content} />
        ) : (
          <ContentBlock
            title="Our Curriculum"
            content="Our curriculum follows the national education framework, providing a balanced approach to academic learning. We offer comprehensive programs from primary through secondary education, emphasizing core subjects including Mathematics, Science, Languages, Social Studies, and Arts."
          />
        )}

        {programsLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : programsBlock ? (
          <ContentBlock title={programsBlock.title} content={programsBlock.content} />
        ) : (
          <ContentBlock
            title="Academic Programs"
            content="Primary Education (Grades 1-5)\nMiddle School (Grades 6-8)\nSecondary Education (Grades 9-10)\nSenior Secondary (Grades 11-12)\n\nWe also offer specialized programs in Science, Commerce, and Humanities streams for senior secondary students."
          />
        )}

        {facilitiesLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : facilitiesBlock ? (
          <ContentBlock title={facilitiesBlock.title} content={facilitiesBlock.content} />
        ) : (
          <ContentBlock
            title="Facilities & Resources"
            content="• Well-equipped Science Laboratories\n• Computer Labs with modern technology\n• Comprehensive Library\n• Sports Facilities\n• Art and Music Rooms\n• Smart Classrooms"
          />
        )}
      </div>
    </div>
  );
}
