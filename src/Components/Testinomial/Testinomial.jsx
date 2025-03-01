import React from 'react';

const testimonials = [
    {
      "name": "Rajesh K.",
      "title": "enthusiastic philatelist",
      "quote": "Being a philatelist for over a decade, I’ve always found joy in discovering rare stamps. This platform has made it so much easier to connect with fellow enthusiasts and expand my collection.",
      "imgSrc": "https://img.etimg.com/thumb/msid-48775918,width-200,height-150/news/politics-and-nation/india-post-to-release-stamps-on-ramayana-mahabharata-ravi-shankar-prasad.jpg",
      "imgAlt": "Portrait of Rajesh K."
    },
    {
      "name": "Anita S.",
      "title": "stamp collector",
      "quote": "I’ve always been passionate about preserving India’s rich history through stamps. The resources and trading features available here are invaluable for someone like me.",
      "imgSrc": "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2016/06/18/472781-stamp-collection.jpg",
      "imgAlt": "Portrait of Anita S."
    },
    {
      "name": "Vikram T.",
      "title": "national philately deposit account holder",
      "quote": "The National Philately Deposit Account has been a game-changer! Managing my collection and trading stamps securely has never been this convenient.",
      "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLYouMMNqfXEPkBT_Cb5vei5sB7ZNWVt3cA&s",
      "imgAlt": "Portrait of Vikram T."
    }
  ]
  ;

function Testimonial() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-4 text-center">Testimony Quotes</h1>
      <p className="text-lg text-accent-light dark:text-accent-dark mb-8 text-center">Customer Experiences: A Tapestry of Happy Moments</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border border-border-light dark:border-border-dark shadow-md dark:shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <img src={testimonial.imgSrc} alt={testimonial.imgAlt} className="w-20 h-20 rounded-full mb-4" />
            <p className="text-sm italic text-text-light dark:text-text-dark mb-4">"{testimonial.quote}"</p>
            <p className="font-bold text-text-light dark:text-text-dark">{testimonial.name}, {testimonial.title}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 mt-8">
        <span className="w-3 h-3 rounded-full bg-shadow-light dark:bg-shadow-dark"></span>
        <span className="w-3 h-3 rounded-full bg-primary-light dark:bg-primary-dark"></span>
        <span className="w-3 h-3 rounded-full bg-shadow-light dark:bg-shadow-dark"></span>
      </div>
    </div>
  );
}

export default Testimonial;