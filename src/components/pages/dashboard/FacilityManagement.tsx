import React, { useState } from "react";
import { Button, Table, Modal, message, Card, Typography, Space } from "antd";
import {
  useGetFacilitiesQuery,
  useDeleteFacilityMutation,
} from "../../../redux/api/api";
import FacilityForm from "./FacilityForm";

const { Title } = Typography;

interface Facility {
  _id: string;
  name: string;
  location: string;
  image: string;
  pricePerHour: number;
}

const FacilityManagement: React.FC = () => {
  const { data, isLoading, refetch } = useGetFacilitiesQuery({});
  const [deleteFacility] = useDeleteFacilityMutation();
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const facilities: Facility[] = Array.isArray(data) ? data : data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteFacility(id).unwrap();
      message.success("Facility deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to delete facility.");
    }
  };

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedFacility(null);
    setIsModalVisible(true);
  };

  const handleFormSubmitSuccess = () => {
    setIsModalVisible(false);
    refetch();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>Facility Management</Title>
      <Card style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Add Facility
        </Button>
      </Card>
      <Table<Facility>
        dataSource={facilities}
        loading={isLoading}
        rowKey="_id"
        bordered
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Location", dataIndex: "location", key: "location" },
          {
            title: "Price per Hour",
            dataIndex: "pricePerHour",
            key: "pricePerHour",
            render: (price) => `$${price}`,
          },

          {
            title: "Actions",
            key: "actions",
            render: (_text, record: Facility) => (
              <Space>
                <Button type="link" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={selectedFacility ? "Edit Facility" : "Add Facility"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <FacilityForm
          facility={selectedFacility}
          onClose={handleFormSubmitSuccess}
        />
      </Modal>
    </div>
  );
};

export default FacilityManagement;
