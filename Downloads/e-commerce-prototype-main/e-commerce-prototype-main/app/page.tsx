import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Building, Users, Clock, FileText, ChevronRight, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceCard from "@/components/service-card"
import ContactForm from "@/components/contact-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-[#224058] text-white">
        <div className="container mx-auto px-4 flex items-center justify-start h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dg%20logo-D3UpEGaUfDkgYBNorf72kp9xkcxlZp.jpeg"
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#224058] to-[#1a3246] text-white">
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
              Unlimited marketing
              <br />
              for growing businesses
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              No hourly rates, tokens, or contracts—just insane results.
            </p>
            <div className="flex flex-col items-center">
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] rounded-xl transition-all duration-300"
                asChild
              >
                <Link href="/apply">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer complete digital solutions, helping your company reduce costs and increase productivity across
              various domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Web Development"
              description="Custom websites and web applications built with the latest technologies to meet your business needs."
              icon="code"
              link="/web-development"
            />
            <ServiceCard
              title="Video Editing"
              description="Professional video editing services for marketing, training, and promotional content."
              icon="video"
              link="/video-editing"
            />
            <ServiceCard
              title="Copywriting"
              description="Compelling content creation for websites, blogs, social media, and marketing materials."
              icon="pen"
              link="/copywriting"
            />
          </div>

          <div className="mt-12">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-[#224058] px-8 py-4 font-bold rounded-xl transition-all duration-300"
            >
              See More Services
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose the perfect plan for your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Pick One Service Plan */}
            <Card className="border-2 border-transparent hover:border-yellow-500 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Pick One Service</h3>
                  <div className="text-4xl font-bold mb-1">$2,499</div>
                  <div className="text-sm text-gray-600 mb-4">/mo</div>
                  <p className="text-gray-600 mb-6">Best for integrating a new creative service in your operations.</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Pick one service that you need</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Unlimited work for one brand</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Daily communication</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Multiple Marketing Coordinators to give you the fastest service</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Easily call, email, or book an appointment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Brand identity and website design services available</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Quality strategic direction</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] rounded-xl" asChild>
                    <Link href="/apply">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Get It All Plan */}
            <div className="relative mt-8 md:mt-0">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-yellow-500 text-[#224058] px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </span>
              </div>
              <Card className="border-2 border-yellow-500 shadow-xl rounded-2xl overflow-hidden h-full">
                <CardContent className="p-6 pt-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Get It All</h3>
                    <div className="text-4xl font-bold mb-1">$5,799</div>
                    <div className="text-sm text-gray-600 mb-4">/mo</div>
                    <p className="text-gray-600 mb-6">
                      Best for smaller teams who need to outsource all their creative work.
                    </p>
                    <ul className="space-y-3 text-left mb-8">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>All services are included</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Unlimited work for one brand</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Daily communication</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Multiple Marketing Coordinators to give you the fastest service</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Easily call, email, or book an appointment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Brand identity and website design services available</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                        <span>Quality strategic direction</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] rounded-xl" asChild>
                      <Link href="/apply">Get Started</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Creative BFF Plan */}
            <Card className="border-2 border-transparent hover:border-yellow-500 transition-all duration-300 bg-[#224058] text-white rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Creative BFF</h3>
                  <div className="text-4xl font-bold mb-1">$6,899</div>
                  <div className="text-sm text-gray-300 mb-4">/mo</div>
                  <p className="text-gray-300 mb-6">Best for a seamless and smooth workflow with your creative team.</p>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>All services are included</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>We will join your workspace directly on a platform of your choice</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Unlimited work for one brand</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Daily communication</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Multiple Marketing Coordinators to give you the fastest service</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Easily call, email, or book an appointment</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Brand identity and website design services available</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                      <span>Quality strategic direction</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] rounded-xl" asChild>
                    <Link href="/apply">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits for Your Business</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our solutions can transform your company's processes, reducing costs and increasing
              efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cost Reduction</h3>
                <p className="text-gray-600">Save up to 30% on printing and document management costs.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Increased Productivity</h3>
                <p className="text-gray-600">More efficient employees with quick access to necessary information.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Time Optimization</h3>
                <p className="text-gray-600">
                  More agile processes with automation of repetitive and bureaucratic tasks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Data Security</h3>
                <p className="text-gray-600">Advanced protection for your documents with access control and backup.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Frequent Questions Section */}
      <section className="py-16 md:py-24 bg-gray-100 text-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequent Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to the most common questions about our services and solutions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-2xl shadow-lg p-6">
              <AccordionItem value="item-1" className="border-b border-gray-200">
                <AccordionTrigger className="text-left py-4 font-semibold text-lg hover:no-underline">
                  What types of businesses do you provide branding and design services for?
                </AccordionTrigger>
                <AccordionContent className="text-left py-4 text-gray-600">
                  We work with businesses of all sizes, from startups to established enterprises. Our branding and
                  design services are tailored to each client's unique needs, industry, and target audience. We
                  specialize in creating cohesive brand identities that include logos, visual guidelines, and complete
                  brand strategies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-gray-200">
                <AccordionTrigger className="text-left py-4 font-semibold text-lg hover:no-underline">
                  How do your web development and social media services work together?
                </AccordionTrigger>
                <AccordionContent className="text-left py-4 text-gray-600">
                  Our web development and social media services are designed to work seamlessly together. We create
                  websites that integrate perfectly with social media platforms, ensuring consistent branding and easy
                  content sharing. This integrated approach helps maximize your online presence and engagement with your
                  audience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-gray-200">
                <AccordionTrigger className="text-left py-4 font-semibold text-lg hover:no-underline">
                  What's included in your content creation services (copywriting, video editing, newsletters)?
                </AccordionTrigger>
                <AccordionContent className="text-left py-4 text-gray-600">
                  Our content creation services include professional copywriting for websites, marketing materials, and
                  social media; video editing for promotional content, tutorials, and social media; and strategic
                  newsletter campaigns. Each service can be customized to your specific needs and can be integrated with
                  our other services for a comprehensive marketing approach.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b-0">
                <AccordionTrigger className="text-left py-4 font-semibold text-lg hover:no-underline">
                  How do you approach media buying and marketing strategy?
                </AccordionTrigger>
                <AccordionContent className="text-left py-4 text-gray-600">
                  Our approach to media buying and marketing strategy is data-driven and results-focused. We analyze
                  your target audience, market trends, and competition to create effective campaigns. This includes
                  strategic placement across various platforms, continuous performance monitoring, and regular
                  optimization to ensure the best possible ROI for your marketing investment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're ready to help your company find the ideal solution for document management and printing. Fill out
                the form and an expert will get in touch with you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">(780) 701-3390</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">hi@dingusandzazzy.com</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">4721 50 Ave, Leduc, Alberta T9E 6Y5</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#224058] text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dg%20logo-D3UpEGaUfDkgYBNorf72kp9xkcxlZp.jpeg"
              alt="Dingus and Zazzy Logo"
              width={80}
              height={80}
              className="mx-auto rounded-full"
            />
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.linkedin.com/company/dingus-zazzy/posts/?feedView=all"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-8 w-8" />
            </a>
            <a
              href="https://www.instagram.com/dingusandzazzy/"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-8 w-8" />
            </a>
          </div>

          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Dingus and Zazzy. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
