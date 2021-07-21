import {message as messageAntd} from "antd";
import {MessageType} from "antd/es/message"

interface ParamsProps {
    type: 'info' | 'success' | 'error' | 'warning' | 'loading';
    content: string | number;
    key?: string;
    duration?: number;
}

type MessageProps = (params: ParamsProps) => MessageType;

export const message: MessageProps = (
  {
      type,
      content,
      key,
      duration= 3
  }
) => {
    return messageAntd[type]({content, key, duration})
};
