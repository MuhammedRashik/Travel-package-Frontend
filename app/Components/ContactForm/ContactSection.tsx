'use client'


import ContactForm from './ContactForm'
import ScrollGlb from './ScrollGlb'

function ContactSection() {
  return (
    <section id='contact' className="min-h-screen   bg-gradient-to-br  from-white  via-gray-50  py-10 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Globe Section - Left Side */}
          <div className="order-2 lg:order-1 flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto overflow-hidden">
              <ScrollGlb/>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16  rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20  rounded-full blur-xl" 
                   style={{ animation: 'pulse 2s ease-in-out infinite 1s' }} />
              <div className="absolute top-1/2 -right-12 w-12 h-12  rounded-full blur-lg" 
                   style={{ animation: 'pulse 2s ease-in-out infinite 2s' }} />
            </div>
          </div>
          {/* Contact Form Section - Right Side */}
          <div className="order-1  lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection