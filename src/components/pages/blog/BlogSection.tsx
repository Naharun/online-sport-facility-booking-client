import React from "react";
import { Card, Tag, Button, Row, Col } from "antd";
import { blogPosts } from "../../../data/blogPosts";

const BlogSection: React.FC = () => {
  return (
    <div style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Latest Blog Posts
      </h2>
      <Row gutter={[16, 16]}>
        {blogPosts.map((post) => (
          <Col xs={24} sm={12} md={8} key={post.id}>
            <Card
              cover={
                <img
                  alt={post.title}
                  src={post.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p style={{ fontStyle: "italic", color: "#888" }}>{post.date}</p>
              <div style={{ marginBottom: "10px" }}>
                {post.tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
              <Button type="primary" href={`/blog/${post.id}`}>
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogSection;
