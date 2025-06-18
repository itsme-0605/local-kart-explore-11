
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flipkart Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Flipkart</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Flipkart</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore millions of products or discover local vendors near you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Regular Flipkart */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Regular Shopping</CardTitle>
              <CardDescription>
                Browse millions of products with fast delivery across India
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 150+ million products</li>
                  <li>• Fast delivery nationwide</li>
                  <li>• Easy returns & exchanges</li>
                  <li>• Flipkart Plus benefits</li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Local Marketplace */}
          <Card className="hover:shadow-lg transition-shadow border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                Local Marketplace
              </CardTitle>
              <CardDescription>
                Discover local vendors and products within 20 km of your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• Local vendors within 20 km</li>
                  <li>• Direct chat with sellers</li>
                  <li>• Quick local delivery</li>
                  <li>• Support local businesses</li>
                </ul>
                <Link to="/local">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Explore Local Market
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Why Choose Flipkart Local?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Location-Based Discovery</h3>
              <p className="text-gray-600 text-sm">Find vendors and products within 20 km radius of your location</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600 text-sm">Chat directly with local vendors for personalized service</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600 text-sm">Faster delivery through local vendor partnerships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
