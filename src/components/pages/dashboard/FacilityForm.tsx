import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import {
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
} from "../../../redux/api/api";

interface FacilityFormProps {
  facility?: any; // Optional facility data for edit mode
  onClose: () => void; // Callback to handle closing the form
}

const FacilityForm: React.FC<FacilityFormProps> = ({ facility, onClose }) => {
  const [form] = Form.useForm();
  const [createFacility, { isLoading: isCreating }] =
    useCreateFacilityMutation();
  const [updateFacility, { isLoading: isUpdating }] =
    useUpdateFacilityMutation();

  const isEditMode = Boolean(facility); // Determine if the form is in edit mode

  useEffect(() => {
    if (facility) {
      form.setFieldsValue(facility);
    } else {
      form.resetFields();
    }
  }, [facility, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditMode) {
        // Update facility if in edit mode
        await updateFacility({ id: facility._id, ...values }).unwrap();
        message.success("Facility updated successfully!");
      } else {
        // Create a new facility if in add mode
        await createFacility(values).unwrap();
        message.success("Facility created successfully!");
      }
      onClose(); // Close the form
    } catch (error: any) {
      message.error(
        error?.data?.message || "Failed to save the facility. Please try again."
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Facility Name"
        rules={[{ required: true, message: "Please enter the facility name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please enter the location!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pricePerHour"
        label="Price per Hour"
        rules={[
          { required: true, message: "Please enter the price per hour!" },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image URL"
        rules={[{ required: true, message: "Please enter a valid image URL!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreating || isUpdating}
          style={{ marginRight: 8 }}
        >
          {isEditMode ? "Update Facility" : "Add Facility"}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default FacilityForm;
