import { toast } from "react-toastify";

const ComponentCustomToast = (message, type = "default", options = {}) => {
  const defaultOptions = {
    position: "top-right", // Vị trí hiển thị
    autoClose: 3000, // 3 giây tự đóng
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options, // Gộp với options do người dùng truyền vào
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "info":
      toast.info(message, defaultOptions);
      break;
    case "warning":
      toast.warning(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};

export default ComponentCustomToast;

// ComponentCustomToast("Đăng nhập thành công!", "success");
// ComponentCustomToast("Lỗi kết nối!", "error", {
//   position: "bottom-center",
//   autoClose: 5000, // 5 giây tự đóng
// });