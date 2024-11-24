import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Tag, Divider, Space } from "antd";
import { blogPosts } from "../../../data/blogPosts";

const { Title, Paragraph, Text } = Typography;

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <p>Blog post not found.</p>;
  }

  return (
    <div style={{ padding: "50px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        cover={
          <img
            alt={post.title}
            src={post.image}
            style={{ borderRadius: "8px" }}
          />
        }
        bordered={false}
      >
        <Title level={2}>{post.title}</Title>
        <Text type="secondary">{post.date}</Text>

        <div style={{ margin: "10px 0" }}>
          {post.tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>

        <Divider />

        <Paragraph>
          <strong>Summary:</strong> {post.description}
        </Paragraph>

        <Divider orientation="left">Content</Divider>

        <Space direction="vertical" size="middle">
          {post.content.split("\n").map((paragraph, index) => (
            <Paragraph key={index}>{paragraph.trim()}</Paragraph>
          ))}
        </Space>
      </Card>
    </div>
  );
};

export default BlogPostDetail;
