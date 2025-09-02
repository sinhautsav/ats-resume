import React, { useState } from 'react';
import { FileDown, Copy, Check, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const ATSResumeBuilder = () => {
  const [copied, setCopied] = useState(false);
  
  const defaultResumeData = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.com"
    },
    summary: "Experienced software developer with 5+ years of expertise in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams.",
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        startDate: "Jan 2022",
        endDate: "Present",
        location: "New York, NY",
        achievements: [
          "Developed and maintained 3 high-traffic web applications serving 100K+ users",
          "Led a team of 4 developers and improved deployment efficiency by 40%",
          "Implemented microservices architecture reducing system downtime by 25%"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "Jun 2020",
        endDate: "Dec 2021",
        location: "San Francisco, CA",
        achievements: [
          "Built responsive web applications using React, Node.js, and MongoDB",
          "Collaborated with UX/UI designers to implement pixel-perfect designs",
          "Optimized database queries resulting in 30% faster page load times"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        graduationDate: "May 2020",
        location: "Boston, MA",
        gpa: "3.8/4.0"
      }
    ],
    skills: {
      technical: ["JavaScript", "React", "Node.js", "Python", "SQL", "MongoDB", "AWS", "Docker"],
      tools: ["Git", "Jira", "Figma", "VS Code"],
      soft: ["Leadership", "Problem Solving", "Communication", "Team Collaboration"]
    },
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration",
        technologies: ["React", "Node.js", "Stripe API", "PostgreSQL"],
        link: "github.com/johndoe/ecommerce"
      }
    ]
  };

  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultResumeData, null, 2));
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [jsonError, setJsonError] = useState('');

  const handleJsonChange = (value) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      setResumeData(parsed);
      setJsonError('');
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Panel - JSON Editor */}
      <div className="w-1/2 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Resume Data (JSON)</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
          </div>
          {jsonError && (
            <p className="text-red-500 text-sm mt-2">{jsonError}</p>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <textarea
            value={jsonInput}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-full font-mono text-sm border border-gray-300 rounded p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your resume data in JSON format..."
            style={{ minHeight: 'calc(100vh - 120px)' }}
          />
        </div>
      </div>

      {/* Right Panel - Resume Preview */}
      <div className="w-1/2 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">ATS-Friendly Resume Preview</h2>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm print:hidden"
            >
              <FileDown size={16} />
              Print/Save PDF
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white shadow-sm border border-gray-200 max-w-4xl mx-auto print:shadow-none print:border-0" style={{ minHeight: '11in' }}>
            <div className="p-8 print:p-6">
              {/* Header */}
              <div className="border-b border-gray-300 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{resumeData.personalInfo?.name}</h1>
                <div className="flex justify-between items-start">
                  {/* Left side - Personal Details */}
                  <div className="flex flex-col gap-2">
                    {resumeData.personalInfo?.email && (
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Mail size={16} className="text-blue-600" />
                        <span>{resumeData.personalInfo.email}</span>
                      </div>
                    )}
                    {resumeData.personalInfo?.phone && (
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Phone size={16} className="text-green-600" />
                        <span>{resumeData.personalInfo.phone}</span>
                      </div>
                    )}
                    {resumeData.personalInfo?.location && (
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <MapPin size={16} className="text-red-600" />
                        <span>{resumeData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Right side - Links */}
                  <div className="flex flex-col gap-2">
                    {resumeData.personalInfo?.linkedin && (
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Linkedin size={16} className="text-blue-700" />
                        <span>{resumeData.personalInfo.linkedin}</span>
                      </div>
                    )}
                    {resumeData.personalInfo?.website && (
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Globe size={16} className="text-purple-600" />
                        <span>{resumeData.personalInfo.website}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
                  <p className="text-gray-800 text-sm leading-relaxed">{resumeData.summary}</p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
                  {resumeData.experience.map((job, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900">{job.position}</h3>
                          <p className="text-gray-700 font-medium">{job.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{job.startDate} - {job.endDate}</p>
                          <p>{job.location}</p>
                        </div>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-800 ml-4">
                        {job.achievements?.map((achievement, i) => (
                          <li key={i} className="mb-1">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">EDUCATION</h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.school}</p>
                          {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{edu.graduationDate}</p>
                          <p>{edu.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">TECHNICAL SKILLS</h2>
                  <div className="text-sm">
                    {resumeData.skills.technical && (
                      <p className="mb-2"><span className="font-semibold">Technical:</span> {resumeData.skills.technical.join(', ')}</p>
                    )}
                    {resumeData.skills.tools && (
                      <p className="mb-2"><span className="font-semibold">Tools:</span> {resumeData.skills.tools.join(', ')}</p>
                    )}
                    {resumeData.skills.soft && (
                      <p><span className="font-semibold">Soft Skills:</span> {resumeData.skills.soft.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {resumeData.projects && resumeData.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">PROJECTS</h2>
                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-800 mb-1">{project.description}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Technologies:</span> {project.technologies?.join(', ')}</p>
                      {project.link && <p className="text-sm text-gray-600">{project.link}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
          .print\\:p-6 {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ATSResumeBuilder;