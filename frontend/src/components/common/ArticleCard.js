import React from 'react';

const ArticleCard = ({ title, content, author, image}) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      {image && (<img src={`http://localhost:3000/uploads/${image}`} alt={title} className="w-full h-60 object-cover mb-4 rounded" />)}
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">Oleh: {author}</p>
      <p>{content}</p>
    </div>
  );
};

export default ArticleCard;
