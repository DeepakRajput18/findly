import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  CardActionArea,
  CardActions,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { formatSimpleDate, truncateText, getStatusColor, getCategoryIcon } from '../utils/helpers';
import React, { useState } from 'react';

const ItemCard = ({
  item,
  type = 'lost', // 'lost' or 'found'
  onEdit,
  onDelete,
  showActions = false,
  maxDescriptionLength = 100,
}) => {
  const [imgError, setImgError] = useState(false);
  const isLostItem = type === 'lost';
  const detailPath = isLostItem ? `/lost-items/${item._id}` : `/found-items/${item._id}`;
  
  // Get the appropriate location field based on item type
  const location = isLostItem ? item.last_seen_location : item.found_location;
  
  // Get the appropriate date field based on item type
  const date = isLostItem ? item.lost_date : item.found_date;
  
  // Get status color
  const statusColor = getStatusColor(item.status);
  
  // Get category icon
  const categoryIcon = getCategoryIcon(item.category);

  // Generate fallback image URL based on known items or category
  const getFallbackImage = () => {
    const name = (item.item_name || '').toLowerCase();
    const categoryName = item.category ? item.category.toLowerCase() : 'item';
    // Specific item fallbacks
    if (name.includes('iphone')) return '/assets/fallback-images/iphone13.jpg';
    if (name.includes('necklace')) return '/assets/fallback-images/necklace.jpg';
    if (name.includes('key')) return '/assets/fallback-images/keys.jpg';
    // Category-based fallback
    return `/assets/fallback-images/${categoryName}.svg`;
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    setImgError(true);
    e.target.src = getFallbackImage();
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardActionArea component={Link} to={detailPath}>
        <CardMedia
          component="img"
          height="140"
          image={imgError ? getFallbackImage() : (item.image_url || getFallbackImage())}
          alt={item.item_name}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            backgroundColor: 'grey.100',
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10,
            display: 'flex',
            gap: 1,
          }}
        >
          <Chip
            label={item.status}
            size="small"
            sx={{
              backgroundColor: statusColor,
              color: 'white',
              fontWeight: 'bold',
            }}
          />
          <Chip
            label={item.category}
            size="small"
            icon={
              <span className="material-icons" style={{ fontSize: 16 }}>
                {categoryIcon}
              </span>
            }
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {item.item_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {truncateText(item.description, maxDescriptionLength)}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {location || 'Location not specified'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {isLostItem ? 'Lost on: ' : 'Found on: '} 
              {formatSimpleDate(date)}
            </Typography>
          </Box>
          
          {item.user_id && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {isLostItem ? 'Reported by: ' : 'Found by: '}
                {typeof item.user_id === 'object' ? item.user_id.name : 'Anonymous'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      
      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Box>
            <Tooltip title="Edit">
              <IconButton 
                size="small" 
                color="primary" 
                onClick={(e) => {
                  e.preventDefault();
                  onEdit && onEdit(item);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                color="error" 
                onClick={(e) => {
                  e.preventDefault();
                  onDelete && onDelete(item);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Button 
            size="small" 
            variant="contained" 
            component={Link} 
            to={detailPath}
          >
            View Details
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ItemCard; 