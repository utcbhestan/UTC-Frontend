import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Users } from "lucide-react";
import { client } from '@/utils/sanityClient';
import { urlFor } from '@/utils/sanityClient';

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  qualifications: string;
  experience: string;
  subjects: string[];
  bio: string;
  profileImage: any;
}

const Faculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const query = '*[_type == "faculty"]{ _id, name, designation, qualifications, experience, subjects, specialization, bio, profileImage }';
        const data = await client.fetch(query);
        setFaculty(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch faculty data');
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 max-w-7xl text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 max-w-7xl text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="py-0">
      {/* Hero Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Expert Faculty</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our dedicated team of experienced educators who are committed to your academic success
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Faculty Stats */}
        <section className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{faculty.length}+</div>
              <div className="text-sm text-muted-foreground">Expert Teachers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Student Success Rate</div>
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="pt-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((teacher, index) => (
              <Card key={teacher._id} className={`card-hover fade-in stagger-delay-${index + 1}`}>
                <CardContent className="p-6 pb-2">
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <img
                      src={urlFor(teacher.profileImage)}
                      alt={`${teacher.name} profile`}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-foreground mb-1">{teacher.name}</h3>
                    <p className="text-success font-medium mb-2">{teacher.designation}</p>
                  </div>

                  {/* Qualifications */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium">Qualifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{teacher.qualifications}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{teacher.experience} of teaching excellence</p>
                  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm font-medium">Subjects</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{teacher.bio}</p>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faculty;