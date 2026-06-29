import newsLists from '../data/newsData';

function News() {
  return (
    <main className="container page-section">
      <div className="page-heading">
        <p className="section-label">Latest News</p>
        <h1>News List</h1>
        <p>
          This page displays a list of news stored in a JavaScript array.
        </p>
      </div>

      <div className="news-grid">
        {newsLists.map((news) => (
          <div className="news-card" key={news.id}>
            <img src={news.images} alt={news.title} />

            <div className="news-content">
              <h3>{news.title}</h3>
              <p>{news.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default News;