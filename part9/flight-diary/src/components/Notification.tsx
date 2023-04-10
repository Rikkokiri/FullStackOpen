import { StatusMessage } from '../types';

export const Notification = ({
  message,
}: {
  message: StatusMessage | undefined;
}) => {
  if (message === undefined) {
    return null;
  }

  return (
    <div>
      <p className={message.error ? 'error-toast' : 'success-toast'}>
        {message.msg}
      </p>
    </div>
  );
};
