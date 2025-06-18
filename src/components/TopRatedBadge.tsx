
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface TopRatedBadgeProps {
  rating: number;
  threshold?: number;
}

const TopRatedBadge: React.FC<TopRatedBadgeProps> = ({ rating, threshold = 4.5 }) => {
  if (rating < threshold) return null;

  return (
    <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900 border-yellow-400 z-10">
      <Star className="h-3 w-3 mr-1 fill-current" />
      Top Rated
    </Badge>
  );
};

export default TopRatedBadge;
