import { toast } from "react-toastify";

export default function notify(type, message) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast.info(message);
  }
}
