"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Users, CreditCard, Image, FileText, Plus, Trash2 } from "lucide-react"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  trip: string
  status: string
  totalPaid: number
  remaining: number
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("clients")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-555-0123",
      trip: "Santorini, Greece",
      status: "Confirmed",
      totalPaid: 3000,
      remaining: 1500
    }
  ])

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    trip: "",
    status: "Pending"
  })

  const [payment, setPayment] = useState({
    clientId: "",
    amount: "",
    date: "",
    type: "Deposit"
  })

  const [curatedItem, setCuratedItem] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "Event"
  })

  const handleAddClient = () => {
    setClients([...clients, { ...newClient, id: clients.length + 1, totalPaid: 0, remaining: 0 }])
    setNewClient({ name: "", email: "", phone: "", trip: "", status: "Pending" })
  }

  const handleAddPayment = () => {
    // Handle payment addition
    console.log("Adding payment:", payment)
  }

  const handleUploadCurated = () => {
    // Handle curated item upload
    console.log("Uploading curated item:", curatedItem)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, Amber</span>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payments</span>
            </TabsTrigger>
            <TabsTrigger value="curated" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Curated</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Client List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Client List</span>
                    <Button size="sm" onClick={() => setSelectedClient(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Client
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedClient(client)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{client.name}</h3>
                            <p className="text-sm text-gray-600">{client.email}</p>
                            <p className="text-sm text-gray-600">{client.trip}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              client.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {client.status}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              ${client.totalPaid} / ${client.totalPaid + client.remaining}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Client Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedClient ? 'Edit Client' : 'Add New Client'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={selectedClient?.name || newClient.name}
                        onChange={(e) => selectedClient 
                          ? setSelectedClient({...selectedClient, name: e.target.value})
                          : setNewClient({...newClient, name: e.target.value})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={selectedClient?.email || newClient.email}
                        onChange={(e) => selectedClient 
                          ? setSelectedClient({...selectedClient, email: e.target.value})
                          : setNewClient({...newClient, email: e.target.value})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={selectedClient?.phone || newClient.phone}
                        onChange={(e) => selectedClient 
                          ? setSelectedClient({...selectedClient, phone: e.target.value})
                          : setNewClient({...newClient, phone: e.target.value})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="trip">Trip Destination</Label>
                      <Input
                        id="trip"
                        value={selectedClient?.trip || newClient.trip}
                        onChange={(e) => selectedClient 
                          ? setSelectedClient({...selectedClient, trip: e.target.value})
                          : setNewClient({...newClient, trip: e.target.value})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={selectedClient?.status || newClient.status}
                        onValueChange={(value) => selectedClient 
                          ? setSelectedClient({...selectedClient, status: value})
                          : setNewClient({...newClient, status: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddClient} className="w-full">
                      {selectedClient ? 'Update Client' : 'Add Client'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment History */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">John Smith</h3>
                          <p className="text-sm text-gray-600">Santorini Trip</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">$1,500</p>
                          <p className="text-sm text-green-600">Paid</p>
                          <p className="text-xs text-gray-500">May 1, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Payment */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="client">Client</Label>
                      <Select value={payment.clientId} onValueChange={(value) => setPayment({...payment, clientId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={payment.amount}
                        onChange={(e) => setPayment({...payment, amount: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={payment.date}
                        onChange={(e) => setPayment({...payment, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Payment Type</Label>
                      <Select value={payment.type} onValueChange={(value) => setPayment({...payment, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Deposit">Deposit</SelectItem>
                          <SelectItem value="Final Payment">Final Payment</SelectItem>
                          <SelectItem value="Additional">Additional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddPayment} className="w-full">
                      Add Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Curated Tab */}
          <TabsContent value="curated" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Curated Items List */}
              <Card>
                <CardHeader>
                  <CardTitle>Curated Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Santorini Sunset Experience</h3>
                          <p className="text-sm text-gray-600">Luxury catamaran tour with wine tasting</p>
                          <p className="text-sm font-semibold text-amber-600">$2,500</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Add Curated Item */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Curated Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={curatedItem.title}
                        onChange={(e) => setCuratedItem({...curatedItem, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={curatedItem.description}
                        onChange={(e) => setCuratedItem({...curatedItem, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={curatedItem.price}
                        onChange={(e) => setCuratedItem({...curatedItem, price: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={curatedItem.category} onValueChange={(value) => setCuratedItem({...curatedItem, category: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Experience">Experience</SelectItem>
                          <SelectItem value="Package">Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Upload Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    <Button onClick={handleUploadCurated} className="w-full">
                      Upload Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">John Smith - Santorini Itinerary</h3>
                        <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Download</Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Upload new document</p>
                    <p className="text-xs text-gray-500">PDF, DOC, XLS up to 25MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 