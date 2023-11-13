import { Switch, Select, Modal, Flex } from "antd";
import "./SettingModal.css";
const { Option } = Select;
const SettingModal = ({
  isVisible,
  modalHandler,
}: {
  isVisible: boolean;
  modalHandler: Function;
}) => {
  return (
    <Modal
      open={isVisible}
      className="custom-modal"
      onCancel={() => modalHandler(false)}
      title={<ModalTitle />}
      footer={null}
    >
      <div className="modal-content">
        <Flex vertical>
          <div className="modal-item">
            <span className="modal-label">Sắp xếp thẻ</span>
            <Switch />
          </div>
          <span> (A-Z)</span>
        </Flex>
        <div className="modal-item">
          <label className="modal-label">Chỉ học thuật ngữ có gắn sao</label>
          <Switch />
        </div>
        <div className="modal-item">
          <label className="modal-label">Trả lời bằng</label>
          <Select defaultValue="definition" style={{ width: 120 }}>
            <Option value="term">Thuật ngữ</Option>
            <Option value="definition">Định nghĩa</Option>
          </Select>
        </div>
        <div className="modal-item">
          <a href="#" className="text-red-700">
            Khởi động lại thẻ ghi nhớ
          </a>
        </div>
        <div className="modal-item">
          <a href="#">Chính sách quyền riêng tư</a>
        </div>
      </div>
    </Modal>
  );
};

const ModalTitle = () => {
  return (
    <div className="px-3 py-8 bg-white text-left">
      <h1>Tùy chọn</h1>
    </div>
  );
};
export default SettingModal;
