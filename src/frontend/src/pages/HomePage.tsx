import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetContentBlock } from '../hooks/usePublicContent';
import { BookOpen, Users, Newspaper, Image, Phone, GraduationCap } from 'lucide-react';

export default function HomePage() {
  const { data: welcomeBlock } = useGetContentBlock('home-welcome');
  const { data: missionBlock } = useGetContentBlock('home-mission');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {welcomeBlock?.title || 'Welcome to Government School'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {welcomeBlock?.content ||
                  'Empowering students with knowledge, values, and skills for a brighter future. Join us in our mission to provide quality education for all.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions">
                  <Button size="lg" className="text-base">
                    Apply Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="text-base">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-campus.dim_1600x600.png"
                alt="School Campus"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Explore Our School</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admissions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Admissions</CardTitle>
                  <CardDescription>Learn about our admission process and requirements</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/academics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Academics</CardTitle>
                  <CardDescription>Discover our curriculum and academic programs</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/staff">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Staff & Faculty</CardTitle>
                  <CardDescription>Meet our dedicated team of educators</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/notices">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>News & Notices</CardTitle>
                  <CardDescription>Stay updated with latest announcements</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/gallery">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Gallery</CardTitle>
                  <CardDescription>View photos from school events and activities</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>Get in touch with our administration</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {missionBlock && (
        <section className="py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl text-center">{missionBlock.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground text-center leading-relaxed whitespace-pre-wrap">
                  {missionBlock.content}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
