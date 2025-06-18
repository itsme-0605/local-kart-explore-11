
import React, { useState, useEffect } from 'react';
import { MapPin, User, Search, Star, MessageCircle, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for local vendors and products
const mockVendors = [
  {
    id: 1,
    name: "Local Electronics Hub",
    category: "Electronics",
    distance: 2.5,
    rating: 4.5,
    reviews: 234,
    location: "Sector 18, Noida",
    verified: true
  },
  {
    id: 2,
    name: "Fashion Corner",
    category: "Fashion",
    distance: 1.8,
    rating: 4.2,
    reviews: 156,
    location: "Connaught Place, Delhi",
    verified: true
  },
  {
    id: 3,
    name: "Fresh Grocery Store",
    category: "Grocery",
    distance: 0.8,
    rating: 4.7,
    reviews: 89,
    location: "Lajpat Nagar, Delhi",
    verified: true
  }
];

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 159900,
    originalPrice: 169900,
    vendor: "Local Electronics Hub",
    vendorId: 1,
    distance: 2.5,
    rating: 4.5,
    reviews: 45,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    price: 12995,
    originalPrice: 14995,
    vendor: "Fashion Corner",
    vendorId: 2,
    distance: 1.8,
    rating: 4.3,
    reviews: 23,
    image: "/placeholder.svg",
    category: "Fashion"
  },
  {
    id: 3,
    name: "Organic Basmati Rice 5kg",
    price: 850,
    originalPrice: 950,
    vendor: "Fresh Grocery Store",
    vendorId: 3,
    distance: 0.8,
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg",
    category: "Grocery"
  }
];

const categories = ["All", "Electronics", "Fashion", "Grocery", "Home & Kitchen", "Beauty", "Sports"];

const LocalMarketplace = () => {
  const [currentLocation, setCurrentLocation] = useState("Connaught Place, New Delhi");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    let filtered = mockProducts;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleChatWithVendor = (vendorName: string) => {
    alert(`Starting chat with ${vendorName}. This will connect you with the vendor for product inquiries.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Flipkart Local</h1>
              <div className="flex items-center space-x-2 text-blue-100">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentLocation}</span>
                <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white">
                  Change
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for products, vendors..."
                  className="pl-10 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="products">Local Products</TabsTrigger>
            <TabsTrigger value="vendors">Nearby Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.distance} km away
                      </Badge>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      Sold by: <span className="font-medium text-blue-600">{product.vendor}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Add to Cart
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleChatWithVendor(product.vendor)}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{vendor.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{vendor.location}</span>
                        </CardDescription>
                      </div>
                      {vendor.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{vendor.category}</Badge>
                        <span className="text-sm text-gray-600">{vendor.distance} km away</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-gray-500">({vendor.reviews} reviews)</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          View Products
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleChatWithVendor(vendor.name)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Location Range Info */}
      <div className="bg-blue-50 border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              Showing vendors and products within 20 km of your location
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalMarketplace;
