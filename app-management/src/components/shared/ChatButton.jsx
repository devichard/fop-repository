import { Button } from "../ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function ChatButton({ setChatIsOpen }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-16 w-16 bg-primary text-background fixed bottom-12 right-[224px] rounded-full p-2.5"
      onClick={() => setChatIsOpen((prev) => !prev)}
    >
      <ChatBubbleIcon className="h-5 w-5" />
    </Button>
  );
}
