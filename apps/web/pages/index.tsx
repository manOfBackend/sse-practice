import { useEffect, useState } from "react";
import { Button } from "ui";

export default function Web() {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
      let eventSource: EventSource;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(
            `http://localhost:3000/sse`
          );

          /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
          eventSource.onmessage = async (event) => {
            const res = await event.data;
            setMessages((prev) => [...prev, res]);
          };

          /* EVENTSOURCE ONERROR ------------------------------------------------------ */
          eventSource.onerror = async (event) => {
              eventSource.close();
          };
        } catch (error) {}
      };
      fetchSse();
      return () => eventSource.close();
    
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
      <Button />
    </div>
  );
}
