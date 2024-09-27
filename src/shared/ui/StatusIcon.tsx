import {
  FireOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { RecordStatus } from '../enums';

interface StatusIconProps {
  status: RecordStatus;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case RecordStatus.NEW:
      return <FireOutlined className="text-green-600" />;
    case RecordStatus.IN_PROCESS:
      return <HourglassOutlined />;
    case RecordStatus.FINISHED:
      return <CheckCircleOutlined className="text-yellow-600" />;
    case RecordStatus.REJECTED:
      return <CloseOutlined className="text-red-600" />;
    default:
      return <CloseOutlined className="text-red-600" />;
  }
};
