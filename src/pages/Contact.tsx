import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent } from "../components/ui/Card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { apiClient } from "../lib/api"

export default function Contact() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        const messageData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            event_type: formData.get('type') as string,
            message: formData.get('message') as string,
        }

        try {
            await apiClient('/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            })
            alert("Thank you for your message! We will get back to you soon.")
            form.reset()
        } catch (error) {
            console.error(error)
            alert('Error sending message. Please try again.')
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-secondary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Contact Us</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ready to plan your next event? Get in touch with us today.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Get In Touch</h2>
                            <p className="text-muted-foreground mb-8">
                                We'd love to hear about your upcoming event. Fill out the form or reach out to us using the contact details below.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            <Card>
                                <CardContent className="flex items-center space-x-4 p-6">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-muted-foreground">+1 (234) 567-890</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="flex items-center space-x-4 p-6">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-muted-foreground">hello@dududecors.com</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="flex items-center space-x-4 p-6">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Location</h3>
                                        <p className="text-muted-foreground">123 Event Street, City, State</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="flex items-center space-x-4 p-6">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Business Hours</h3>
                                        <p className="text-muted-foreground">Mon - Fri: 9am - 6pm</p>
                                        <p className="text-muted-foreground">Sat: 10am - 4pm</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input id="name" name="name" placeholder="Your Name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                    <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="type" className="text-sm font-medium">Event Type</label>
                                    <select
                                        id="type"
                                        name="type"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option>Wedding</option>
                                        <option>Corporate Event</option>
                                        <option>Private Party</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tell us about your event..."
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full text-lg">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
