import React, { useState } from 'react';

const ARTICLES = [
  {
    id: 1,
    title: 'React Overview',
    content: 'React is a JavaScript library for building user interfaces. It allows developers to create single-page applications with a component-based architecture.'
  },
  {
    id: 2,
    title: 'JavaScript Basics',
    content: 'JavaScript is a versatile programming language that is used to create interactive effects within web browsers. It is essential for front-end development.'
  },
  {
    id: 3,
    title: 'Understanding CSS',
    content: 'CSS is a style sheet language used for describing the presentation of a document written in HTML. It enables you to style and layout web pages.'
  }
];

const highlightText = (text, query) => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

const SearchHighlight = () => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredArticles = ARTICLES.filter(article =>
    article.content.toLowerCase().includes(query.toLowerCase())
  );

  const getHighlightedText = (text) => {
    return { __html: highlightText(text, query) };
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <div>
        <p>{filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} found</p>
        {filteredArticles.map((article) => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <p dangerouslySetInnerHTML={getHighlightedText(article.content)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHighlight;
