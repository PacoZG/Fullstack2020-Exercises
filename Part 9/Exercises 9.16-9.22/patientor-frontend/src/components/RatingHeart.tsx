import React from 'react';
import { HealthCheckRating } from '../types';
import { Icon } from 'semantic-ui-react';

type HealtCheckRatingIconProps = {
  rating: HealthCheckRating;
};

const ratingToColor = (rating: HealthCheckRating): "green" | "yellow" | "blue" | "red" | undefined => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "blue";
    case 3:
      return "red";
  }
};

const RatingHeart = ({ rating }: HealtCheckRatingIconProps) => {
  return (
    <Icon name="heart" color={ratingToColor(rating)} />
  );
};

export default RatingHeart;