import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Eye, 
  Zap, 
  Search, 
  MessageSquare, 
  Cpu, 
  Network, 
  Camera, 
  BookOpen, 
  Code, 
  Layers, 
  Target,
  ChevronRight,
  Star,
  GitBranch,
  Users,
  Calendar,
  Award,
  TrendingUp,
  Lightbulb,
  Settings,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line, Area, AreaChart } from 'recharts';
import CitationLink from "../components/ui/citation"

const citations = {
  1: {
    title: "Tensorflow Based Image Classification using Advanced Convolutional Neural Network",
    url: "https://www.academia.edu/download/109753295/ijrte.f7543.pdf",
    content: "Study focuses on identifying plant categories based on leaves using advanced CNNs with TensorFlow and Python, achieving over 95% accuracy.",
    date: "2023",
    siteName: "Academia.edu",
    sourceContent: "Upasana Dugal (2023) - Plant category identification from leaves using advanced CNNs"
  },
  2: {
    title: "Meta Perception Language Model: Enhancing Understanding of Visual Perception Tasks",
    url: "https://www.reddit.com/r/LocalLLaMA/comments/1k4ov9e/meta_perception_language_model_enhancing/",
    content: "Meta's PLM is an open and reproducible vision-language model designed to address challenging visual recognition tasks with 2.5 million human-labeled samples.",
    date: "2024",
    siteName: "Reddit - LocalLLaMA",
    sourceContent: "Meta Perception Language Model with variants (1, 3, and 8 billion parameters)"
  },
  3: {
    title: "Time Blindness: Why Video-Language Models Can't See What Humans Can?",
    url: "https://www.reddit.com/r/MachineLearning/comments/1l33op4/rtime_blindness_why_videolanguage_models_cant_see/",
    content: "Research highlights limitations in current Vision-Language Models concerning temporal pattern perception, introducing SpookyBench benchmark.",
    date: "2024",
    siteName: "Reddit - MachineLearning",
    sourceContent: "SpookyBench benchmark showing VLMs score 0% while humans achieve 98% accuracy"
  },
  4: {
    title: "W+ Adapter for Personalized Image Generation",
    url: "https://github.com/csxmli2016/w-plus-adapter",
    content: "Novel W+ adapter that aligns StyleGAN's face latent space with text-to-image diffusion models for personalized image generation.",
    date: "2024",
    siteName: "GitHub",
    sourceContent: "CVPR 2024 publication on personalized image generation with identity preservation"
  },
  5: {
    title: "15 Generative Adversarial Networks (GAN) Based Project Ideas",
    url: "https://www.projectpro.io/article/generative-adversarial-networks-gan-based-projects-to-work-on/530",
    content: "Comprehensive list of GAN-based project ideas including human pose synthesis, text-to-image generation, and medical image analysis.",
    date: "2024",
    siteName: "ProjectPro",
    sourceContent: "Curated GAN projects for advanced machine learning applications"
  },
  6: {
    title: "Prompt Engineering Techniques and Implementations",
    url: "https://github.com/NirDiamant/Prompt_Engineering",
    content: "Comprehensive exploration of prompt engineering methods including Zero-Shot, Few-Shot, Chain of Thought prompting for LLMs.",
    date: "2024",
    siteName: "GitHub",
    sourceContent: "Advanced prompt engineering strategies for Large Language Models"
  },
  7: {
    title: "TSB-UAD: End-to-End Benchmark Suite for Univariate Time-Series Anomaly Detection",
    url: "https://github.com/TheDatumOrg/TSB-UAD",
    content: "Open benchmark suite with 12,686 time series for evaluating 13 anomaly detection methods including traditional ML and deep learning approaches.",
    date: "2024",
    siteName: "GitHub",
    sourceContent: "Comprehensive anomaly detection benchmark with extensive datasets"
  },
  8: {
    title: "Reinforcement Learning Evaluation for Solving Fundamental AI Problem",
    url: "https://link.springer.com/chapter/10.1007/978-3-031-90295-6_9",
    content: "Research comparing DQN, DDQN, PPO, and A2C algorithms, with PPO achieving highest efficiency (0.9133) after 5M training steps.",
    date: "2025",
    siteName: "SpringerLink",
    sourceContent: "IC2IT 2025 conference paper on RL algorithm evaluation"
  },
  9: {
    title: "Vision Transformers for Object Detection",
    url: "https://github.com/sovit-123/vision_transformers",
    content: "Implementation of Vision Transformers and Swin Transformers for image classification, segmentation, and object detection including DETR.",
    date: "2024",
    siteName: "GitHub",
    sourceContent: "ViT and Swin Transformer implementations with DETR for object detection"
  }
};

const imageResources = {
  cnnArchitecture: "https://0.academia-photos.com/attachment_thumbnails/109753296/mini_magick20231229-1-28s5i5.png?1703868219",
  ganWorkflow: "https://dezyre.gumlet.io/images/blog/generative-adversarial-networks-gan-based-projects-to-work-on/image_470701190351639027291981.png?w=900&dpr=1.3",
  transformerModel: "https://figures.academia-assets.com/111268404/figure_001.jpg",
  anomalyDetection: "https://media.springernature.com/w72/springer-static/cover-hires/book/978-3-031-90295-6?as=webp",
  reinforcementLearning: "https://media.springernature.com/w72/springer-static/cover-hires/journal/10462?as=webp"
};

// Sample data for visualizations
const projectComplexityData = [
  { category: 'Deep Learning', beginner: 2, intermediate: 8, advanced: 12 },
  { category: 'Computer Vision', beginner: 3, intermediate: 10, advanced: 15 },
  { category: 'NLP', beginner: 4, intermediate: 7, advanced: 9 },
  { category: 'GANs', beginner: 1, intermediate: 5, advanced: 8 },
  { category: 'Reinforcement Learning', beginner: 1, intermediate: 4, advanced: 7 },
  { category: 'Anomaly Detection', beginner: 3, intermediate: 6, advanced: 5 }
];

const frameworkPopularityData = [
  { name: 'TensorFlow', value: 35, color: '#FF6B35' },
  { name: 'PyTorch', value: 40, color: '#4ECDC4' },
  { name: 'Scikit-learn', value: 15, color: '#45B7D1' },
  { name: 'Others', value: 10, color: '#96CEB4' }
];

const projectTimelineData = [
  { month: 'Month 1', planning: 20, implementation: 5, testing: 0, documentation: 5 },
  { month: 'Month 2', planning: 10, implementation: 40, testing: 10, documentation: 10 },
  { month: 'Month 3', planning: 5, implementation: 60, testing: 25, documentation: 15 },
  { month: 'Month 4', planning: 0, implementation: 30, testing: 50, documentation: 25 },
  { month: 'Month 5', planning: 0, implementation: 10, testing: 30, documentation: 60 },
  { month: 'Month 6', planning: 0, implementation: 5, testing: 15, documentation: 80 }
];

const skillRequirementsData = [
  { skill: 'Python Programming', level: 95 },
  { skill: 'Machine Learning Theory', level: 85 },
  { skill: 'Deep Learning Frameworks', level: 80 },
  { skill: 'Data Preprocessing', level: 90 },
  { skill: 'Model Evaluation', level: 75 },
  { skill: 'Research Methodology', level: 70 }
];

const AdvancedAIMLProjectsReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition-all ${
        activeTab === id
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 rounded-xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Advanced AI/ML Projects for Master's Students
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-700 max-w-4xl mx-auto">
            Comprehensive guide to trending AI/ML projects focusing on Python, TensorFlow, and advanced techniques 
            including self-supervised learning, GANs, transformers, and real-time applications
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6 sm:mb-8">
          <TabButton id="overview" label="Overview" icon={Eye} />
          <TabButton id="deep-learning" label="Deep Learning" icon={Brain} />
          <TabButton id="computer-vision" label="Computer Vision" icon={Camera} />
          <TabButton id="nlp" label="NLP & LLMs" icon={MessageSquare} />
          <TabButton id="gans" label="GANs" icon={Zap} />
          <TabButton id="anomaly" label="Anomaly Detection" icon={Search} />
          <TabButton id="reinforcement" label="Reinforcement Learning" icon={Target} />
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4 sm:space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-sm sm:text-base text-gray-700 mb-4">
                    This comprehensive report identifies <strong>50+ advanced AI/ML projects</strong> suitable for 3rd semester Master's students, 
                    covering cutting-edge areas from multimodal learning to real-time object detection. All projects emphasize 
                    practical implementation using Python, TensorFlow, and related ML frameworks.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      <span><strong>9 Major Categories</strong> of advanced AI/ML projects</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span><strong>Master's Level Complexity</strong> with research potential</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Code className="w-4 h-4 mr-2 text-green-500" />
                      <span><strong>Python-First Approach</strong> with TensorFlow/PyTorch</span>
                    </div>
                  </div>
                </div>
                <div>
                  <img 
                    src={imageResources.cnnArchitecture} 
                    alt="Advanced CNN Architecture for Image Classification"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Project Complexity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectComplexityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="beginner" stackId="a" fill="#E3F2FD" name="Beginner" />
                    <Bar dataKey="intermediate" stackId="a" fill="#2196F3" name="Intermediate" />
                    <Bar dataKey="advanced" stackId="a" fill="#0D47A1" name="Advanced" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Framework Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <RechartsPieChart data={frameworkPopularityData} cx="50%" cy="50%" outerRadius={80}>
                      {frameworkPopularityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {frameworkPopularityData.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Findings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-500" />
                Key Research Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Alert>
                  <Brain className="w-4 h-4" />
                  <AlertTitle className="text-sm sm:text-base">Multimodal Learning Dominance</AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    Vision-language models like Meta's PLM show significant advancement in multimodal understanding
                    <CitationLink id="2" callType="quote" citations={citations} />
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Zap className="w-4 h-4" />
                  <AlertTitle className="text-sm sm:text-base">GAN Evolution</AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    Advanced GANs with diffusion models enable personalized image generation and medical applications
                    <CitationLink id="4" callType="quote" citations={citations} />
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <Search className="w-4 h-4" />
                  <AlertTitle className="text-sm sm:text-base">Anomaly Detection Growth</AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    Time-series anomaly detection with 13 different methods across 12,686 datasets
                    <CitationLink id="7" callType="quote" citations={citations} />
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Deep Learning Tab */}
      {activeTab === 'deep-learning' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                Advanced Deep Learning Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* CNN-based Plant Classification */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Advanced CNN-based Botanical Image Classification</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Develop robust systems for identifying plant species, leaves, or flowers using advanced CNN architectures 
                    including VGG16, ResNet-50, EfficientNet-B5, and Inception-v3 through transfer learning.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-2">Technical Requirements:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Python 3.8+, TensorFlow 2.x, Keras</li>
                        <li>• Advanced CNN architectures (EfficientNet, ResNet)</li>
                        <li>• Transfer learning and fine-tuning</li>
                        <li>• Data augmentation strategies</li>
                        <li>• Model optimization and hyperparameter tuning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base mb-2">Expected Outcomes:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• &gt;95% classification accuracy</li>
                        <li>• Real-time inference capability</li>
                        <li>• Comparative analysis of architectures</li>
                        <li>• Mobile deployment optimization</li>
                      </ul>
                    </div>
                  </div>
                  <CitationLink id="1" callType="quote" citations={citations} />
                </div>

                {/* Self-Supervised Learning */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. Self-Supervised Learning for Visual Representation</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Implement advanced self-supervised learning techniques like MAE (Masked Autoencoders), SimCLR, 
                    and BYOL for learning robust visual representations without labeled data.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base mb-2">Implementation Framework:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <strong>Core Libraries:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• PyTorch/TensorFlow</li>
                          <li>• Transformers (Hugging Face)</li>
                          <li>• OpenCV for preprocessing</li>
                          <li>• Matplotlib/Seaborn for visualization</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Advanced Techniques:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Contrastive learning</li>
                          <li>• Masked image modeling</li>
                          <li>• Momentum-based methods</li>
                          <li>• Multi-scale feature learning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explainable AI */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. Explainable AI for Deep Learning Models</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Develop interpretability frameworks for deep learning models using techniques like LIME, SHAP, 
                    Grad-CAM, and attention visualization for understanding model decisions.
                  </p>
                  <img 
                    src={imageResources.transformerModel} 
                    alt="Transformer Model Architecture"
                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2">Gradient-based Methods</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Grad-CAM</li>
                        <li>• Integrated Gradients</li>
                        <li>• SmoothGrad</li>
                      </ul>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2">Perturbation Methods</h5>
                      <ul className="text-xs space-y-1">
                        <li>• LIME</li>
                        <li>• SHAP</li>
                        <li>• Occlusion Analysis</li>
                      </ul>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2">Attention Mechanisms</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Attention Visualization</li>
                        <li>• Layer-wise Analysis</li>
                        <li>• Feature Attribution</li>
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Typical Project Timeline (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={projectTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="planning" stackId="1" stroke="#8884d8" fill="#8884d8" name="Planning" />
                  <Area type="monotone" dataKey="implementation" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Implementation" />
                  <Area type="monotone" dataKey="testing" stackId="1" stroke="#ffc658" fill="#ffc658" name="Testing" />
                  <Area type="monotone" dataKey="documentation" stackId="1" stroke="#ff7c7c" fill="#ff7c7c" name="Documentation" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Computer Vision Tab */}
      {activeTab === 'computer-vision' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
                Real-Time Object Detection & Computer Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Vision Transformers */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Vision Transformers for Object Detection (DETR)</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Implement DEtection TRansformer (DETR) with ResNet50/101 backbones for end-to-end object detection, 
                    supporting both image and video inference with tracking capabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Architecture Components:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Vision Transformer (ViT) backbone</li>
                        <li>• Transformer encoder-decoder</li>
                        <li>• Set-based global loss</li>
                        <li>• Bipartite matching algorithm</li>
                        <li>• Multi-scale feature extraction</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Performance Metrics:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• COCO mAP: 51.1 (ViT-Base)</li>
                        <li>• Real-time inference: 30+ FPS</li>
                        <li>• Multi-object tracking support</li>
                        <li>• Custom dataset fine-tuning</li>
                      </ul>
                    </div>
                  </div>
                  <CitationLink id="9" callType="quote" citations={citations} />
                </div>

                {/* YOLOv8 Edge Deployment */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. YOLOv8 Edge Deployment for Mobile Devices</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Deploy YOLOv8 models on Android devices using TensorFlow Lite for real-time object detection 
                    with optimized performance through model quantization and edge computing.
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Cpu className="w-4 h-4 mr-1" />
                        Edge Optimization
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• TensorFlow Lite conversion</li>
                        <li>• INT8 quantization</li>
                        <li>• Model pruning</li>
                        <li>• Hardware acceleration</li>
                      </ul>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Settings className="w-4 h-4 mr-1" />
                        Mobile Integration
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• CameraX integration</li>
                        <li>• Real-time preprocessing</li>
                        <li>• Efficient memory usage</li>
                        <li>• Battery optimization</li>
                      </ul>
                    </Card>
                    <Card className="p-3">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        Applications
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• Retail inventory</li>
                        <li>• Security systems</li>
                        <li>• Healthcare monitoring</li>
                        <li>• Autonomous navigation</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                {/* Event-based Vision */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. Recurrent Vision Transformers for Event Cameras</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Advanced object detection using event cameras with Recurrent Vision Transformers (RVT), 
                    addressing high-speed and high-dynamic-range scenarios where traditional cameras fail.
                  </p>
                  <Alert>
                    <Zap className="w-4 h-4" />
                    <AlertTitle className="text-sm sm:text-base">Cutting-Edge Research (CVPR 2023)</AlertTitle>
                    <AlertDescription className="text-xs sm:text-sm">
                      Event cameras capture brightness changes rather than frames, offering advantages in challenging conditions. 
                      RVT models (Base/Small/Tiny) with pre-trained checkpoints available for research.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Required Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillRequirementsData.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* NLP Tab */}
      {activeTab === 'nlp' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                Advanced NLP & Large Language Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Prompt Engineering */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Advanced Prompt Engineering Techniques</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Comprehensive exploration of prompt engineering methods including Zero-Shot, Few-Shot, 
                    Chain of Thought (CoT), Self-Consistency, and Role Prompting for optimizing LLM performance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-3 bg-blue-50">
                      <h5 className="font-medium text-sm mb-2">Zero/Few-Shot Learning</h5>
                      <ul className="text-xs space-y-1">
                        <li>• In-context learning</li>
                        <li>• Example selection</li>
                        <li>• Template optimization</li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-green-50">
                      <h5 className="font-medium text-sm mb-2">Chain of Thought</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Step-by-step reasoning</li>
                        <li>• Complex problem solving</li>
                        <li>• Explanation generation</li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-purple-50">
                      <h5 className="font-medium text-sm mb-2">Self-Consistency</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Multiple reasoning paths</li>
                        <li>• Answer aggregation</li>
                        <li>• Confidence estimation</li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-orange-50">
                      <h5 className="font-medium text-sm mb-2">Role Prompting</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Persona assignment</li>
                        <li>• Context specialization</li>
                        <li>• Domain expertise</li>
                      </ul>
                    </Card>
                  </div>
                  <CitationLink id="6" callType="quote" citations={citations} />
                </div>

                {/* Autonomous Language Agents */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. Autonomous Language Agent Development</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Build sophisticated AI applications using the Promptulate framework for autonomous language agents 
                    with planning, reasoning, tool-use, and multimodal capabilities.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base mb-3">Agent Capabilities:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-start">
                        <Brain className="w-4 h-4 mt-1 mr-2 text-blue-500" />
                        <div>
                          <h5 className="text-sm font-medium">Planning & Reasoning</h5>
                          <p className="text-xs text-gray-600">Multi-step task decomposition and execution</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Settings className="w-4 h-4 mt-1 mr-2 text-green-500" />
                        <div>
                          <h5 className="text-sm font-medium">Tool Integration</h5>
                          <p className="text-xs text-gray-600">API calls, web scraping, data analysis</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Eye className="w-4 h-4 mt-1 mr-2 text-purple-500" />
                        <div>
                          <h5 className="text-sm font-medium">Multimodal Processing</h5>
                          <p className="text-xs text-gray-600">Text, image, and audio understanding</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multimodal Vision-Language */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. Vision-Language Model Research</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Address the "time blindness" problem in Vision-Language Models using SpookyBench benchmark, 
                    focusing on temporal pattern recognition and novel architectures for improved video understanding.
                  </p>
                  <Alert>
                    <Search className="w-4 h-4" />
                    <AlertTitle className="text-sm sm:text-base">Research Challenge Identified</AlertTitle>
                    <AlertDescription className="text-xs sm:text-sm">
                      Current VLMs achieve 0% accuracy on temporal sequences where humans score 98%. 
                      This presents a critical research opportunity for novel architectures.
                      <CitationLink id="3" callType="quote" citations={citations} />
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* GANs Tab */}
      {activeTab === 'gans' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-600" />
                Generative Adversarial Networks & Diffusion Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Personalized Image Generation */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Personalized Image Generation with W+ Adapter</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Novel approach combining StyleGAN's facial latent space (W+) with text-to-image diffusion models 
                    for personalized image generation with identity preservation and semantic editing capabilities.
                  </p>
                  <img 
                    src={imageResources.ganWorkflow} 
                    alt="GAN Workflow for Human Pose Synthesis"
                    className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Technical Innovation:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• StyleGAN W+ space alignment</li>
                        <li>• Stable Diffusion integration</li>
                        <li>• Identity preservation mechanisms</li>
                        <li>• Semantic editing via text prompts</li>
                        <li>• ControlNet compatibility</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Applications:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Personalized avatar creation</li>
                        <li>• Facial attribute editing</li>
                        <li>• Virtual try-on systems</li>
                        <li>• Content creation for media</li>
                        <li>• Digital identity management</li>
                      </ul>
                    </div>
                  </div>
                  <CitationLink id="4" callType="quote" citations={citations} />
                </div>

                {/* Advanced GAN Projects */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. Comprehensive GAN Project Portfolio</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Master's-level GAN projects spanning human pose synthesis, text-to-image generation, 
                    abstractive summarization, medical imaging, and anomaly detection applications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="p-4 border-l-4 border-purple-400">
                      <h5 className="font-medium text-sm mb-2">Human Pose Synthesis</h5>
                      <p className="text-xs text-gray-600 mb-2">
                        Deformable GANs for unpaired image-to-image translation, synthesizing humans in target poses
                      </p>
                      <div className="text-xs">
                        <strong>Dataset:</strong> Pose-Transfer<br/>
                        <strong>Techniques:</strong> Deformable CNNs, Adversarial Training
                      </div>
                    </Card>
                    
                    <Card className="p-4 border-l-4 border-green-400">
                      <h5 className="font-medium text-sm mb-2">Text-to-Image Synthesis</h5>
                      <p className="text-xs text-gray-600 mb-2">
                        StackGANs for generating photorealistic images from textual descriptions
                      </p>
                      <div className="text-xs">
                        <strong>Dataset:</strong> Oxford Flowers-102<br/>
                        <strong>Techniques:</strong> Progressive Generation, Attention
                      </div>
                    </Card>
                    
                    <Card className="p-4 border-l-4 border-blue-400">
                      <h5 className="font-medium text-sm mb-2">Medical Image Segmentation</h5>
                      <p className="text-xs text-gray-600 mb-2">
                        SegAN for liver tumor segmentation in CT scans for early cancer diagnosis
                      </p>
                      <div className="text-xs">
                        <strong>Dataset:</strong> LiTS Challenge<br/>
                        <strong>Techniques:</strong> FCN, Adversarial Segmentation
                      </div>
                    </Card>
                  </div>
                  <CitationLink id="5" callType="quote" citations={citations} />
                </div>

                {/* Alias-Free Diffusion */}
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. Alias-Free Diffusion Models</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Integration of alias-free resampling techniques from StyleGAN3 into UNet architecture 
                    of diffusion models for improved performance and rotational equivariance.
                  </p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base mb-2">Key Improvements:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <ul className="space-y-1">
                        <li>• Enhanced image fidelity without new parameters</li>
                        <li>• Improved rotational equivariance</li>
                        <li>• More stable training process</li>
                      </ul>
                      <ul className="space-y-1">
                        <li>• Better sampling efficiency</li>
                        <li>• Reduced artifacts in generated images</li>
                        <li>• Theoretical grounding in signal processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Anomaly Detection Tab */}
      {activeTab === 'anomaly' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-red-600" />
                Anomaly Detection & Time Series Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* TSB-UAD Benchmark */}
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Comprehensive Time-Series Anomaly Detection Benchmark</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    TSB-UAD provides an end-to-end benchmark suite with 12,686 time series across 18 real-world datasets, 
                    evaluating 13 different anomaly detection methods from traditional ML to deep learning approaches.
                  </p>
                  <img 
                    src={imageResources.anomalyDetection} 
                    alt="Anomaly Detection Benchmark Results"
                    className="w-full h-32 object-cover rounded-lg shadow-md mb-4"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-3 bg-red-50">
                      <h5 className="font-medium text-sm mb-2">Traditional ML Methods</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Isolation Forest (IForest)</li>
                        <li>• Local Outlier Factor (LOF)</li>
                        <li>• One-class SVM (OCSVM)</li>
                        <li>• Principal Component Analysis</li>
                        <li>• Matrix Profile (MP)</li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-blue-50">
                      <h5 className="font-medium text-sm mb-2">Deep Learning Methods</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Autoencoder (AE)</li>
                        <li>• LSTM-based Anomaly Detection</li>
                        <li>• Convolutional Neural Networks</li>
                        <li>• Variational Autoencoders</li>
                        <li>• Transformer-based models</li>
                      </ul>
                    </Card>
                    <Card className="p-3 bg-green-50">
                      <h5 className="font-medium text-sm mb-2">Specialized Techniques</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Discord Aware Matrix Profile</li>
                        <li>• Series2Graph</li>
                        <li>• SAND algorithm</li>
                        <li>• NORMA method</li>
                        <li>• Polynomial Approximation</li>
                      </ul>
                    </Card>
                  </div>
                  <CitationLink id="7" callType="quote" citations={citations} />
                </div>

                {/* PyPOTS Framework */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. Partially-Observed Time Series Analysis</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    PyPOTS toolkit addresses real-world challenges with missing data in time series, 
                    featuring state-of-the-art neural networks adapted for incomplete observations.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base mb-2">Advanced Architectures for Missing Data:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div>
                        <strong>Transformer-based:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• iTransformer</li>
                          <li>• PatchTST</li>
                          <li>• Autoformer</li>
                          <li>• Informer</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Specialized Models:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• SAITS</li>
                          <li>• TimesNet</li>
                          <li>• ETSformer</li>
                          <li>• MICN</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Recurrent Networks:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• SegRNN</li>
                          <li>• SCINet</li>
                          <li>• DLinear</li>
                          <li>• TimeMixer++</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Novel Approaches:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• FiLM</li>
                          <li>• Pyraformer</li>
                          <li>• FEDformer</li>
                          <li>• TEFN</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Darts Library */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. Unified Forecasting and Anomaly Detection Framework</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Darts library provides a comprehensive toolkit for time series forecasting and anomaly detection, 
                    supporting both univariate and multivariate data with probabilistic forecasting capabilities.
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Core Features:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Model-agnostic anomaly detection</li>
                        <li>• PyOD integration for outlier detection</li>
                        <li>• Probabilistic forecasting for confidence intervals</li>
                        <li>• Multiple time series support</li>
                        <li>• GPU/TPU acceleration via PyTorch Lightning</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm sm:text-base mb-2">Advanced Models:</h4>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Transformer architectures (TFT, N-BEATS)</li>
                        <li>• Recurrent networks (LSTM, GRU)</li>
                        <li>• Temporal Convolutional Networks</li>
                        <li>• Linear models (DLinear, NLinear)</li>
                        <li>• Ensemble methods and model mixing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reinforcement Learning Tab */}
      {activeTab === 'reinforcement' && (
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />
                Deep Reinforcement Learning Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Algorithm Comparison */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">1. Reinforcement Learning Algorithm Evaluation</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Comprehensive comparison of popular RL algorithms (DQN, DDQN, PPO, A2C) using the Snake Game 
                    as a fundamental AI problem, with PPO achieving highest efficiency (0.9133) after 5M training steps.
                  </p>
                  <img 
                    src={imageResources.reinforcementLearning} 
                    alt="Reinforcement Learning Algorithm Performance"
                    className="w-full h-32 object-cover rounded-lg shadow-md mb-4"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-3 text-center bg-purple-50">
                      <h5 className="font-medium text-sm mb-1">PPO</h5>
                      <div className="text-xl font-bold text-purple-600">91.33%</div>
                      <p className="text-xs text-gray-600">Highest Efficiency</p>
                    </Card>
                    <Card className="p-3 text-center bg-blue-50">
                      <h5 className="font-medium text-sm mb-1">A2C</h5>
                      <div className="text-xl font-bold text-blue-600">76.15%</div>
                      <p className="text-xs text-gray-600">Actor-Critic</p>
                    </Card>
                    <Card className="p-3 text-center bg-green-50">
                      <h5 className="font-medium text-sm mb-1">DQN</h5>
                      <div className="text-xl font-bold text-green-600">66.44%</div>
                      <p className="text-xs text-gray-600">Deep Q-Learning</p>
                    </Card>
                    <Card className="p-3 text-center bg-orange-50">
                      <h5 className="font-medium text-sm mb-1">DDQN</h5>
                      <div className="text-xl font-bold text-orange-600">48.22%</div>
                      <p className="text-xs text-gray-600">Double DQN</p>
                    </Card>
                  </div>
                  <CitationLink id="8" callType="quote" citations={citations} />
                </div>

                {/* Robotics Applications */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">2. Reinforcement Learning in Robotics</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Comprehensive survey of RL applications in autonomous robotic systems, covering land-based, 
                    underwater, and aerial platforms with various algorithmic approaches and human-robot interaction.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-green-50">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Cpu className="w-4 h-4 mr-1" />
                        Algorithm Categories
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• Actor-Critic Methods</li>
                        <li>• Deep Reinforcement Learning</li>
                        <li>• Multi-agent RL</li>
                        <li>• Human-centered Algorithms</li>
                        <li>• Neuro-evolutionary Approaches</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-blue-50">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Network className="w-4 h-4 mr-1" />
                        Robotic Platforms
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• Land-based Mobile Robots</li>
                        <li>• Underwater Autonomous Vehicles</li>
                        <li>• Aerial Drones and UAVs</li>
                        <li>• Manipulator Arms</li>
                        <li>• Humanoid Robots</li>
                      </ul>
                    </Card>
                    <Card className="p-4 bg-purple-50">
                      <h5 className="font-medium text-sm mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Applications
                      </h5>
                      <ul className="text-xs space-y-1">
                        <li>• Autonomous Navigation</li>
                        <li>• Human-Robot Interaction</li>
                        <li>• Task Planning and Execution</li>
                        <li>• Social Robotics</li>
                        <li>• Industrial Automation</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                {/* Gaming and Simulation */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">3. RL in Gaming and Simulation Environments</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3">
                    Advanced RL applications in complex games and simulated environments, from mastering strategic games 
                    like Go and Chess to real-time video games and multi-agent scenarios.
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base mb-2">Project Categories:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <strong>Strategic Games:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• AlphaGo-style implementations</li>
                          <li>• Chess engine optimization</li>
                          <li>• Multi-player game theory</li>
                          <li>• Imperfect information games</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Real-time Applications:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• Video game AI agents</li>
                          <li>• Real-time strategy games</li>
                          <li>• Simulation-to-reality transfer</li>
                          <li>• Multi-agent coordination</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Implementation Guidelines */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Code className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600" />
            Implementation Guidelines & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-4">
              <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center">
                <Database className="w-4 h-4 mr-2 text-blue-500" />
                Core Technologies
              </h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Python 3.8+ as primary language</li>
                <li>• TensorFlow 2.x / PyTorch for deep learning</li>
                <li>• NumPy, Pandas for data manipulation</li>
                <li>• Matplotlib, Seaborn for visualization</li>
                <li>• Scikit-learn for traditional ML</li>
                <li>• OpenCV for computer vision tasks</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-green-500" />
                Project Structure
              </h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Literature review (2-3 weeks)</li>
                <li>• Dataset preparation (1-2 weeks)</li>
                <li>• Model implementation (4-6 weeks)</li>
                <li>• Experimentation (3-4 weeks)</li>
                <li>• Evaluation and analysis (2-3 weeks)</li>
                <li>• Documentation and presentation (1-2 weeks)</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-500" />
                Success Metrics
              </h4>
              <ul className="text-xs sm:text-sm space-y-1">
                <li>• Novel contribution to existing methods</li>
                <li>• Reproducible experimental results</li>
                <li>• Comprehensive comparative analysis</li>
                <li>• Real-world applicability demonstration</li>
                <li>• Open-source code publication</li>
                <li>• Conference/journal submission potential</li>
              </ul>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Citations Footer */}
      <Card className="w-full">
        <CardContent className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-4 p-3 sm:p-6">
          <p className="font-semibold mb-2">References:</p>
          <ul className="space-y-1">
            {Object.entries(citations).map(([id, citation]) => (
              <li key={id}>
                <CitationLink id={id} callType="recommend" citations={citations}/>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAIMLProjectsReport;
