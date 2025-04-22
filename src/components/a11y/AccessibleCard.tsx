import React, { useRef } from "react";
import { useA11yNavigation } from "@/hooks/use-a11y";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageSquare } from "lucide-react";

/**
 * AccessibleCard component - Example of an accessible card component that follows
 * WCAG 2.1 AA guidelines. This serves as a reference for accessibility best practices.
 */
export interface AccessibleCardProps {
  /**
   * Unique identifier for the card
   */
  id: string;
  
  /**
   * Title of the card, displayed as the primary text
   */
  title: string;
  
  /**
   * Optional description or subtitle
   */
  description?: string;
  
  /**
   * URL for the image to display
   */
  imageUrl: string;
  
  /**
   * Alt text for the image (required for accessibility)
   */
  imageAlt: string;
  
  /**
   * Optional array of tags/services to display as badges
   */
  tags?: string[];
  
  /**
   * Handler function for when the main card is clicked
   */
  onClick?: () => void;
  
  /**
   * Handler function for when the save button is clicked
   */
  onSave?: () => void;
  
  /**
   * Handler function for when the contact button is clicked
   */
  onContact?: () => void;
  
  /**
   * Optional value for aria-labelledby if needed
   */
  ariaLabelledBy?: string;
  
  /**
   * Whether this card is currently saved/favorited
   */
  isSaved?: boolean;
  
  /**
   * CSS class name to apply to the card
   */
  className?: string;
  
  /**
   * Additional props to pass to the card
   */
  [key: string]: any;
}

export const AccessibleCard = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  tags = [],
  onClick,
  onSave,
  onContact,
  isSaved = false,
  ariaLabelledBy,
  className = "",
  ...props
}: AccessibleCardProps) => {
  // Create unique IDs for elements to connect with aria-labelledby
  const titleId = `card-title-${id}`;
  const descriptionId = `card-description-${id}`;
  
  // Reference to the card for keyboard navigation
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Example of handling keyboard navigation within the card
  const { trapFocus } = useA11yNavigation();
  
  // Handler for card click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  // Handler for keyboard events on the card
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };
  
  // Determine what to use for aria-labelledby
  const ariaLabelledByValue = ariaLabelledBy || 
    (description ? `${titleId} ${descriptionId}` : titleId);
  
  return (
    <Card 
      ref={cardRef}
      className={`w-full overflow-hidden transition-shadow duration-200 hover:shadow-md ${className}`}
      onKeyDown={trapFocus(cardRef)}
      {...props}
    >
      {/* Interactive wrapper only if onClick is provided */}
      <div
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick ? handleCardClick : undefined}
        onKeyDown={onClick ? handleKeyDown : undefined}
        aria-labelledby={onClick ? ariaLabelledByValue : undefined}
        className={onClick ? "cursor-pointer" : ""}
      >
        {/* Image with appropriate alt text */}
        <div className="relative pt-[70%] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="p-4">
          {/* Title with ID for aria-labelledby */}
          <h3 
            id={titleId}
            className="font-medium text-lg text-gray-900 mb-1"
          >
            {title}
          </h3>
          
          {/* Description with ID for aria-labelledby */}
          {description && (
            <p 
              id={descriptionId}
              className="text-sm text-gray-500 mb-3"
            >
              {description}
            </p>
          )}
          
          {/* Tags with sufficient color contrast */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-md"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </div>
      
      {/* Action buttons with proper labels */}
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        {onSave && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            aria-label={isSaved ? "Remove from saved items" : "Save to your collection"}
            aria-pressed={isSaved}
          >
            <Heart 
              className={`h-4 w-4 mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`} 
            />
            {isSaved ? "Saved" : "Save"}
          </Button>
        )}
        
        {onContact && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={onContact}
            aria-label={`Contact about ${title}`}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AccessibleCard;