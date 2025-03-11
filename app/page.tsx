"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-primary absolute transform -rotate-12"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Sajilo-Paisa
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" scroll={false}>
              Home
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
              scroll={false}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium transition-colors hover:text-primary"
              scroll={false}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
              scroll={false}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              How It Works
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
              scroll={false}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="hidden md:flex" asChild>
              <Link href="/register">Register</Link>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    Simplify Stock Trading Payments
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Sajilo-Paisa streamlines payment validation for stock trading. Fast, secure, and reliable service
                    for brokers and investors.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/register">
                      Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#services">Learn More</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=100&h=100&auto=format&fit=crop"
                        alt="NEPSE Verified"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">NEPSE Verified</span>
                      <span className="text-xs text-muted-foreground">Official Partner</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&h=64&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=64&h=64&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&h=64&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=64&h=64&auto=format&fit=crop",
                      ].map((src, i) => (
                        <div
                          key={i}
                          className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={src || "/placeholder.svg"}
                            alt={`User ${i + 1}`}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Trusted by <span className="font-medium text-gray-900 dark:text-gray-50">2,000+</span> traders
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-white dark:bg-gray-900 rounded-xl border shadow-xl overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Payment Validation</div>
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</div>
                        <div className="font-medium">#TRX-289075</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                          <div className="font-medium">NPR 25,750.00</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verified
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t dark:border-gray-700">
                        <Button className="w-full" asChild>
                          <Link href="/dashboard">View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-white dark:bg-gray-950 border-y dark:border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=120&h=60&auto=format&fit=crop"
                  alt="Nepal Stock Exchange"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs text-gray-500">Nepal Stock Exchange</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=120&h=60&auto=format&fit=crop"
                  alt="Securities Board of Nepal"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs text-gray-500">Securities Board of Nepal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=120&h=60&auto=format&fit=crop"
                  alt="Nepal Rastra Bank"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs text-gray-500">Nepal Rastra Bank</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=120&h=60&auto=format&fit=crop"
                  alt="CDS and Clearing"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-xs text-gray-500">CDS and Clearing</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                About Sajilo-Paisa
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted Payment Validation
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sajilo-Paisa is Nepal's leading payment validation service for stock brokers, ensuring seamless
                  transactions between brokers and investors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=400&auto=format&fit=crop"
                alt="About Sajilo-Paisa"
                width={400}
                height={400}
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-lg"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">Our Mission</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        To simplify and secure payment validation in Nepal's stock market, making trading more
                        accessible and reliable for everyone.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">Our Vision</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        To be the leading financial technology platform in Nepal, connecting brokers, investors, and
                        financial institutions seamlessly.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">Our Values</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Security, transparency, efficiency, and innovation are the core values that guide our operations
                        and interactions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprehensive Solutions</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a range of services designed to streamline stock trading payments and validation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Payment Validation",
                  description: "Instant verification of stock trading payments between brokers and investors.",
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  link: "/services/payment-validation",
                },
                {
                  title: "Transaction History",
                  description: "Comprehensive record-keeping of all your trading payment transactions.",
                  icon: <BarChart3 className="h-10 w-10 text-primary" />,
                  link: "/services/transaction-history",
                },
                {
                  title: "Secure Payments",
                  description: "Bank-grade security for all financial transactions on our platform.",
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  link: "/services/secure-payments",
                },
                {
                  title: "Multiple Payment Methods",
                  description: "Support for various payment methods including bank transfers and digital wallets.",
                  icon: <CreditCard className="h-10 w-10 text-primary" />,
                  link: "/services/payment-methods",
                },
                {
                  title: "Broker Integration",
                  description: "Seamless integration with broker systems for automated payment validation.",
                  icon: <ArrowUpRight className="h-10 w-10 text-primary" />,
                  link: "/services/broker-integration",
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock customer support for all your payment-related queries.",
                  icon: <Phone className="h-10 w-10 text-primary" />,
                  link: "/services/support",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 transition-colors duration-200 group-hover:bg-primary/20">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{service.description}</p>
                    <Button variant="link" className="text-primary" asChild>
                      <Link href={service.link}>Learn more</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple 3-Step Process</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes payment validation quick and easy for both brokers and investors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Connect Your Account",
                  description: "Link your broker account and bank details to Sajilo-Paisa securely.",
                  link: "/register",
                  image:
                    "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=200&h=150&auto=format&fit=crop",
                },
                {
                  step: "02",
                  title: "Make Your Payment",
                  description: "Complete your stock purchase or sale payment through our platform.",
                  link: "/how-it-works#payment",
                  image:
                    "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=200&h=150&auto=format&fit=crop",
                },
                {
                  step: "03",
                  title: "Instant Validation",
                  description: "Receive immediate confirmation of your payment for your broker.",
                  link: "/how-it-works#validation",
                  image:
                    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=200&h=150&auto=format&fit=crop",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
                >
                  <div className="absolute -top-4 rounded-full bg-primary text-white text-lg font-bold h-10 w-10 flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="pt-6 text-center">
                    <div className="w-full h-32 mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{item.description}</p>
                    <Button variant="link" className="text-primary mt-2" asChild>
                      <Link href={item.link}>Learn more</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Simplify Your Stock Trading Payments?
                  </h2>
                  <p className="max-w-[600px] opacity-90 md:text-xl/relaxed">
                    Join thousands of traders who trust Sajilo-Paisa for secure and efficient payment validation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/register">Get Started Today</Link>
                  </Button>
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                    <Link href="#contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div className="flex flex-col items-center justify-center space-y-2 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-3xl font-bold">5000+</div>
                    <div className="text-sm font-medium text-center">Active Users</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm font-medium text-center">Broker Partners</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-3xl font-bold">₹10M+</div>
                    <div className="text-sm font-medium text-center">Daily Transactions</div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-3xl font-bold">99.9%</div>
                    <div className="text-sm font-medium text-center">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Contact Us</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions about our services? Our team is here to help you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Feel free to reach out to us using any of the following contact methods.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Kathmandu, Nepal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+977 1234567890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>info@sajilo-paisa.com.np</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-primary">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </div>
                <div className="mt-6">
                  <Image
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&h=250&auto=format&fit=crop"
                    alt="Our Office"
                    width={400}
                    height={250}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-lg dark:bg-gray-800">
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter subject"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your message"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-8 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-md bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary absolute transform -rotate-12"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Sajilo-Paisa
                </span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Simplifying stock trading payments for brokers and investors across Nepal.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
              <div className="mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=300&h=150&auto=format&fit=crop"
                  alt="Sajilo-Paisa Office"
                  width={300}
                  height={150}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:gap-12">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#about" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      News
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-base font-medium">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Subscribe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 dark:border-gray-800">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Sajilo-Paisa. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="hover:underline">
                  Cookies Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

