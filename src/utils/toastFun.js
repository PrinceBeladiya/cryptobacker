import { toast } from 'react-toastify';

const toastFun = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warn':
      toast.warn(message);
      break;
    case 'info':
    default:
      toast.info(message)
      break;
  }
}

export default toastFun