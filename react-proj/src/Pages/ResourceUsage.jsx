import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, Table } from 'antd';

const { Panel } = Collapse;

const ResourceUsage = () => {
  const [reviewData, setReviewData] = useState(null);
  const [clickData, setClickData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reviews data
    fetch('http://localhost:3000/reviews')
      .then((response) => response.json())
      .then((json) => setReviewData(json))
      .catch((error) => console.error('Error fetching review data:', error));

    // Fetch clicks data
    fetch('http://localhost:3000/clicks')
      .then((response) => response.json())
      .then((json) => setClickData(json))
      .catch((error) => console.error('Error fetching click data:', error));
  }, []);

  const groupReviewsByLink = (reviews) => {
    const grouped = {};
    reviews.forEach((review) => {
      if (!grouped[review.link]) {
        grouped[review.link] = [];
      }
      grouped[review.link].push(review);
    });
    return grouped;
  };

  const getReviewColumns = () => [
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  const getClickColumns = () => [
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
    },
  ];

  return (
    <div>
      <h1>Resource Usage</h1>

      {/* Reviews Section */}
      {reviewData && reviewData.reviews && (
        <Collapse accordion>
          {Object.entries(groupReviewsByLink(reviewData.reviews)).map(
            ([link, reviews], index) => (
              <Panel header={link} key={index}>
                <Table
                  columns={getReviewColumns()}
                  dataSource={reviews}
                  rowKey="_id"
                  pagination={false}
                  bordered
                />
              </Panel>
            )
          )}
        </Collapse>
      )}

      {/* Click Data Section */}
      <h2 style={{ marginTop: '2rem' }}>Link Clicks</h2>
      {clickData && clickData.tracking ? (
        <Collapse>
          <Panel header="All Click Tracking" key="clicks">
            <Table
              columns={getClickColumns()}
              dataSource={clickData.tracking}
              rowKey="_id"
              pagination={false}
              bordered
            />
          </Panel>
        </Collapse>
      ) : (
        <p>Loading click data...</p>
      )}
    </div>
  );
};

export default ResourceUsage;
