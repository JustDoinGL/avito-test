import { Modal } from "antd";
import { ModalUIProps } from "./ModalUI.type";

const ModalUI = ({
  children,
  open,
  setIsModalVisible,
  submitForm,
  title,
}: ModalUIProps) => {
  const handleOk = () => {
    submitForm();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default ModalUI;
