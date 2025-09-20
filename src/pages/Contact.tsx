import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    details: "7041965804 | 9664817059",
    subtitle: "Mon-Sat: 3 PM - 8 PM",
    color: "text-blue-600"
  },
  {
    icon: Mail,
    title: "Email Us", 
    details: "utcbhestan@gmail.com",
    subtitle: "Response within 24 hours",
    color: "text-green-600"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Branch 1: Bhestan | Branch 2: Dindoli",
    subtitle: "Schedule an appointment",
    color: "text-purple-600"
  },
  {
    icon: Phone, // Using Phone icon as a placeholder for WhatsApp
    title: "WhatsApp",
    details: "7041965804 | 9664817059",
    subtitle: "Quick queries & support",
    color: "text-green-500"
  }
];

const Contact = () => {
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
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our team for inquiries, enrollment, or to schedule a demo class
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Contact Methods */}
        <section className="py-10 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`card-hover text-center fade-in stagger-delay-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground font-medium mb-1">{method.details}</p>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Enrollment Inquiry</CardTitle>
                  <CardDescription>
                    Fill out the form below to contact us or enroll
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
                    <Button type="submit" className="w-full btn-success">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    We're here to help you with all your educational needs
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <div className="text-sm text-muted-foreground pt-2">
                        <p className="pb-2"><strong>Branch 1: </strong>309 omkar plaza infront of Priyanka green park jiav road bhestan surat</p>
                        <p><strong>Branch 2: </strong>1st floor, Dhruv Park Gate no.7, Saniya Kande Road, Dindoli.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Operating Hours</p>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
                        <p>Monday - Saturday: 3:00 PM - 8:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        91+ 7041965804<br />
                        91+ 9664817059
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        utcbhestan@gmail.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Map Embed */}
              <Card>
                <CardContent className="p-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.7731699728547!2d72.83971287503412!3d21.12160758055105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051a2f9e89bc3%3A0xd545d99807b9226f!2sUnique%20Tuition%20Classes!5e0!3m2!1sen!2sin!4v1756523241036!5m2!1sen!2sin" 
                    width="100%" 
                    height="256" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;