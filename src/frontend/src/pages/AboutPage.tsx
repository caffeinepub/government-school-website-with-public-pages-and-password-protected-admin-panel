import ContentBlock from '../components/ContentBlock';
import { useGetContentBlock } from '../hooks/usePublicContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { data: historyBlock, isLoading: historyLoading } = useGetContentBlock('about-history');
  const { data: visionBlock, isLoading: visionLoading } = useGetContentBlock('about-vision');
  const { data: valuesBlock, isLoading: valuesLoading } = useGetContentBlock('about-values');

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Our School</h1>
          <p className="text-lg text-muted-foreground">
            Learn about our history, vision, and commitment to excellence in education.
          </p>
        </div>

        {historyLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : historyBlock ? (
          <ContentBlock title={historyBlock.title} content={historyBlock.content} />
        ) : (
          <ContentBlock
            title="Our History"
            content="Government School has been serving the community for decades, providing quality education to generations of students. Our institution stands as a pillar of academic excellence and character development."
          />
        )}

        {visionLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : visionBlock ? (
          <ContentBlock title={visionBlock.title} content={visionBlock.content} />
        ) : (
          <ContentBlock
            title="Our Vision"
            content="To be a leading educational institution that nurtures well-rounded individuals equipped with knowledge, skills, and values to contribute meaningfully to society."
          />
        )}

        {valuesLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : valuesBlock ? (
          <ContentBlock title={valuesBlock.title} content={valuesBlock.content} />
        ) : (
          <ContentBlock
            title="Our Values"
            content="Excellence • Integrity • Respect • Innovation • Community\n\nWe believe in fostering an environment where every student can thrive academically, socially, and emotionally."
          />
        )}
      </div>
    </div>
  );
}
