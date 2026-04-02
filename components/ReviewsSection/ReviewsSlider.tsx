import Slider from '@/components/Swiper/Swiper';
import type { Review } from '@/types/review';
import ReviewCards from '@/components/ReviewCards/ReviewCards';

type Props = {
  reviews: Review[];
  showLocation?: boolean;
};

export default function ReviewsSlider({ reviews, showLocation = true }: Props) {
  return (
    <Slider>
      {reviews.map((review) => (
        <ReviewCards key={review.id} review={review} showLocation={showLocation} />
      ))}
    </Slider>
  );
}
