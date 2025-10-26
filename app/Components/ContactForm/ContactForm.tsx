"use client"

import { useState } from 'react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div
        className="text-center lg:text-left space-y-4"
        style={{ animation: 'fadeIn 0.6s ease-out' }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-[#002d62] bg-clip-text  ">
          Get In Touch
        </h2>
        <p className="text-lg text-muted-foreground text-black max-w-lg md:mt-8">
          Have a question or want to work together? We&apos;d love to hear from you. 
          Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{ animation: 'fadeIn 0.6s ease-out 0.2s both' }}
      >
        {[{
          icon: <FiMail className="h-5 w-5 text-blue-600" />,
          title: 'Email',
          text: 'hello@company.com'
        }, {
          icon: <FiPhone className="h-5 w-5 text-blue-600" />,
          title: 'Phone',
          text: '+1 (555) 123-4567'
        }, {
          icon: <FiMapPin className="h-5 w-5 text-blue-600" />,
          title: 'Office',
          text: 'San Francisco, CA'
        }].map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg w-full bg-white/80 backdrop-blur-sm border shadow hover:shadow-blue-500/20 transition-all"
          >
            <div className="flex w-full items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-black">{item.title}</p>
                <p className="text-sm  text-gray-700">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div
        className="p-6 rounded-lg backdrop-blur-sm border shadow-lg"
        style={{ animation: 'fadeIn 0.6s ease-out 0.4s both' }}
      >
        <div className="mb-6">
          <h3 className="text-xl text-black font-semibold">Send us a message</h3>
          <p className="text-sm text-gray-700">
            Fill out the form and we&apos;ll respond within 24 hours.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-black font-medium">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full p-2 text-gray-700 border rounded-md focus:ring-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-black font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full p-2 border text-gray-700 rounded-md focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-black font-medium">Subject</label>
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What&apos;s this about?"
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-black font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your project or inquiry..."
              className="w-full p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-300 min-h-[120px]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-gradient-to-r  bg-[#002d62] text-white font-semibold hover:bg-[#121820] transition-all shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
