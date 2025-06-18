
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  // Product filters
  selectedCategories: string[];
  selectedSellers: string[];
  minRating: number;
  onCategoryChange: (categories: string[]) => void;
  onSellerChange: (sellers: string[]) => void;
  onRatingChange: (rating: number) => void;
  
  // Seller filters
  maxDistance: number;
  selectedSellerCategories: string[];
  onDistanceChange: (distance: number) => void;
  onSellerCategoryChange: (categories: string[]) => void;
  
  // Clear filters
  onClearFilters: () => void;
  
  // Available options
  availableCategories: string[];
  availableSellers: string[];
  availableSellerCategories: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  selectedSellers,
  minRating,
  onCategoryChange,
  onSellerChange,
  onRatingChange,
  maxDistance,
  selectedSellerCategories,
  onDistanceChange,
  onSellerCategoryChange,
  onClearFilters,
  availableCategories,
  availableSellers,
  availableSellerCategories,
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, category]);
    } else {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    }
  };

  const handleSellerChange = (seller: string, checked: boolean) => {
    if (checked) {
      onSellerChange([...selectedSellers, seller]);
    } else {
      onSellerChange(selectedSellers.filter(s => s !== seller));
    }
  };

  const handleSellerCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      onSellerCategoryChange([...selectedSellerCategories, category]);
    } else {
      onSellerCategoryChange(selectedSellerCategories.filter(c => c !== category));
    }
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedSellers.length > 0 || 
    minRating > 0 || maxDistance < 20 || selectedSellerCategories.length > 0;

  return (
    <div className="w-80 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Product Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Product Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={`category-${category}`} className="text-xs cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Seller Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Sellers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="max-h-40 overflow-y-auto space-y-2">
            {availableSellers.map((seller) => (
              <div key={seller} className="flex items-center space-x-2">
                <Checkbox
                  id={`seller-${seller}`}
                  checked={selectedSellers.includes(seller)}
                  onCheckedChange={(checked) => handleSellerChange(seller, checked as boolean)}
                />
                <label htmlFor={`seller-${seller}`} className="text-xs cursor-pointer line-clamp-1">
                  {seller}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={minRating.toString()} onValueChange={(value) => onRatingChange(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="3">3★ and above</SelectItem>
              <SelectItem value="4">4★ and above</SelectItem>
              <SelectItem value="4.5">4.5★ and above</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Maximum Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={maxDistance.toString()} onValueChange={(value) => onDistanceChange(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Within 1 km</SelectItem>
              <SelectItem value="2">Within 2 km</SelectItem>
              <SelectItem value="5">Within 5 km</SelectItem>
              <SelectItem value="10">Within 10 km</SelectItem>
              <SelectItem value="20">Within 20 km</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Seller Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Seller Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {availableSellerCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`seller-category-${category}`}
                checked={selectedSellerCategories.includes(category)}
                onCheckedChange={(checked) => handleSellerCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={`seller-category-${category}`} className="text-xs cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleCategoryChange(category, false)}
                  />
                </Badge>
              ))}
              {selectedSellers.slice(0, 2).map((seller) => (
                <Badge key={seller} variant="secondary" className="text-xs">
                  {seller.length > 10 ? seller.substring(0, 10) + '...' : seller}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleSellerChange(seller, false)}
                  />
                </Badge>
              ))}
              {selectedSellers.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedSellers.length - 2} more
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {minRating}★+
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => onRatingChange(0)}
                  />
                </Badge>
              )}
              {maxDistance < 20 && (
                <Badge variant="secondary" className="text-xs">
                  ≤{maxDistance}km
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => onDistanceChange(20)}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FilterSidebar;
