import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const enrollmentSteps = [
  {
    step: 1,
    title: "Fill Enrollment Form",
    description: "Provide your details and subject preferences"
  },
  {
    step: 2,
    title: "Attend Demo Class",
    description: "Experience our teaching methodology firsthand"
  },
  {
    step: 3,
    title: "Confirm Enrollment",
    description: "Secure your spot in our premium coaching program"
  },
  {
    step: 4,
    title: "Start Learning",
    description: "Join classes and begin your journey to academic excellence"
  }
];

const Enroll = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    school: "",
    percentage: "",
    address: "",
    parentName: "",
    parentPhone: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.percentage || !formData.parentName) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields: Student Name, Percentage, and Parent Name.",
        variant: "destructive"
      });
      return;
    }

    // EmailJS configuration
    const serviceID = "service_hj42gkw"; // Replace with your EmailJS Service ID
    const templateID = "template_2md3wu5"; // Replace with your EmailJS Template ID
    const publicKey = "UlhRV5sNc0RJEHozK"; // Replace with your EmailJS Public Key

    // Prepare email parameters
    const emailParams = {
      student_name: formData.name,
      student_email: formData.email,
      current_standard: formData.grade,
      current_school: formData.school,
      percentage: formData.percentage,
      address: formData.address,
      parent_name: formData.parentName,
      parent_phone: formData.parentPhone
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, emailParams, publicKey)
      .then(() => {
        toast({
          title: "Enrollment Submitted!",
          description: "Your form has been sent successfully. We'll contact you within 24 hours to schedule your demo class.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          grade: "",
          school: "",
          percentage: "",
          address: "",
          parentName: "",
          parentPhone: ""
        });
      })
      .catch((error) => {
        toast({
          title: "Submission Failed",
          description: "There was an error sending your form. Please try again later.",
          variant: "destructive"
        });
        console.error("EmailJS error:", error);
      });
  };

  return (
    <div className="py-0">
      {/* Hero Section */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Enroll at UTC</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our premium English medium coaching for grades 1-12 with weekly unit tests, extra classes, and personalized support
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enrollment Steps */}
        <section className="py-12 pb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Simple Enrollment Process</h2>
            <p className="text-lg text-muted-foreground">Get started in just 4 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrollmentSteps.map((step, index) => (
              <Card key={step.step} className={`text-center card-hover fade-in stagger-delay-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enrollment Form */}
        <section className="py-12 pb-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Enrollment Form</CardTitle>
                <CardDescription>
                  Join our premium coaching program with weekly unit tests, extra classes, one-on-one doubt-solving, and live experiments
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">Student Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Student Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Student Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="grade">Current Standard</Label>
                        <Input
                          id="grade"
                          value={formData.grade}
                          onChange={(e) => handleInputChange('grade', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="school">Current School</Label>
                        <Input
                          id="school"
                          value={formData.school}
                          onChange={(e) => handleInputChange('school', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="percentage">Percentage in Last Standard *</Label>
                        <Input
                          id="percentage"
                          value={formData.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Home Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parent Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">Parent/Guardian Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                        <Input
                          id="parentName"
                          value={formData.parentName}
                          onChange={(e) => handleInputChange('parentName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="parentPhone">Parent Phone Number</Label>
                        <Input
                          id="parentPhone"
                          value={formData.parentPhone}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full btn-success text-lg py-3">
                    Submit Enrollment Form
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 pt-6">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Need Help with Enrollment?</h2>
              <p className="text-lg opacity-90">Our team is here to assist you every step of the way</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Phone className="h-8 w-8 mx-auto mb-4 text-success" />
                <p className="font-medium mb-2">Call Us</p>
                <p className="text-sm opacity-90">+1-123-456-7890</p>
                <p className="text-xs opacity-80">Mon-Sat: 9 AM - 8 PM</p>
              </div>
              
              <div>
                <Mail className="h-8 w-8 mx-auto mb-4 text-success" />
                <p className="font-medium mb-2">Email Us</p>
                <p className="text-sm opacity-90">info@utctuition.com</p>
                <p className="text-xs opacity-80">Response within 24 hours</p>
              </div>
              
              <div>
                <Calendar className="h-8 w-8 mx-auto mb-4 text-success" />
                <p className="font-medium mb-2">Visit Us</p>
                <p className="text-sm opacity-90">123 Main Street</p>
                <p className="text-xs opacity-80">Schedule an appointment</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Enroll;