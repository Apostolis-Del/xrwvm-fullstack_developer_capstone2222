import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(null);

  const { id } = useParams();
  const rootUrl = window.location.href.split('dealer')[0];
  const dealerUrl = `${rootUrl}djangoapp/dealer/${id}`;
  const reviewsUrl = `${rootUrl}djangoapp/reviews/dealer/${id}`;
  const postReviewUrl = `${rootUrl}postreview/${id}`;

  const getDealer = async () => {
    try {
      const res = await fetch(dealerUrl);
      const retObj = await res.json();

      if (retObj.status === 200 && retObj.dealer) {
        setDealer(retObj.dealer);
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  };

  const getReviews = async () => {
    try {
      const res = await fetch(reviewsUrl);
      const retObj = await res.json();

      if (retObj.status === 200 && retObj.reviews) {
        if (retObj.reviews.length > 0) {
          setReviews(retObj.reviews);
        } else {
          setUnreviewed(true);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const sentimentIcon = (sentiment) => {
    if (sentiment === "positive") return positive_icon;
    if (sentiment === "negative") return negative_icon;
    return neutral_icon;
  };

  useEffect(() => {
    getDealer();
    getReviews();

    if (sessionStorage.getItem("username")) {
      setPostReview(<a href={postReviewUrl}><img src={review_icon} style={{ width: '10%', marginLeft: '10px', marginTop: '10px' }} alt='Post Review' /></a>);
    }
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>{dealer.full_name}{postReview}</h1>
        <h4 style={{ color: "grey" }}>{dealer.city}, {dealer.address}, Zip - {dealer.zip}, {dealer.state}</h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <p>Loading Reviews....</p>
        ) : unreviewed ? (
          <p>No reviews yet!</p>
        ) : (
          reviews.map((review, index) => (
            <div className='review_panel' key={index}>
              <img src={sentimentIcon(review.sentiment)} className="emotion_icon" alt='Sentiment' />
              <div className='review'>{review.review}</div>
              <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dealer;
