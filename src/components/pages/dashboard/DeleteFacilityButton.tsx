import React from "react";
import { Button, message } from "antd";
import { useDeleteFacilityMutation } from "../../../redux/api/api";

interface DeleteFacilityButtonProps {
  facilityId: string;
  onDeleteSuccess: (id: string) => void;
}

const DeleteFacilityButton: React.FC<DeleteFacilityButtonProps> = ({
  facilityId,
  onDeleteSuccess,
}) => {
  const [deleteFacility, { isLoading }] = useDeleteFacilityMutation();

  const handleDelete = async () => {
    try {
      await deleteFacility(facilityId).unwrap();
      message.success("Facility deleted successfully");
      onDeleteSuccess(facilityId); // Notify parent to update UI
    } catch (error) {
      message.error("Error deleting facility");
      console.error("Error deleting facility:", error);
    }
  };

  return (
    <Button danger loading={isLoading} onClick={handleDelete}>
      Delete Facility
    </Button>
  );
};

export default DeleteFacilityButton;
