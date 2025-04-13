"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = `Contact from ${formData.name} - ${formData.company}`
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Interest: ${formData.interest}
Message: ${formData.message}
    `

    // Open email client with pre-filled data
    window.location.href = `mailto:hi@dingusandzazzy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Show success message
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for contacting us. One of our experts will get in touch with you soon.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-xl">
            Send new message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone*</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company*</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">Interest*</Label>
            <Select onValueChange={handleSelectChange} value={formData.interest}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="branding">Branding</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
                <SelectItem value="newsletters">Newsletters</SelectItem>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="illustration">Illustration</SelectItem>
                <SelectItem value="media-buying">Media Buying</SelectItem>
                <SelectItem value="copywriting">Copywriting</SelectItem>
                <SelectItem value="video-editing">Video Editing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message*</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#224058] py-6 font-bold rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "SEND MESSAGE"}
          </Button>

          <p className="text-sm text-gray-500 text-center">By submitting this form, you agree to our privacy policy.</p>
        </form>
      )}
    </div>
  )
}
