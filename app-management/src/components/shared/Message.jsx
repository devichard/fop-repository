import getMessagePosition from "@/utils/getMessagePosition";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Message({ message }) {
  const { user } = useAuthContext();
  return (
    <div
      className={`${getMessagePosition(
        message.author,
        user.uid
      )} text-sm p-1.5 rounded-lg w-fit text-secondary`}
    >
      {message.content}
    </div>
  );
}
