import React from 'react'

const StarRating = ({rating}) => {
    
    const stars = [];
    for (let i=1; i<=5; i++){
        if (i <= rating){
            stars.push(<i key={i} className="icon-star text-warning"></i>); //Get code from font awesome for full star
        }else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={i} className="icon-star-half-empty text-warning"></i>)
        }
        else{
            stars.push(<i key={i} className="icon-star-empty text-warning"></i>); //Get code from font awesome for half star
        }
    }
    
    return (
        <>
            {stars}
        </>
  )
}

export default StarRating