import React, { useEffect } from "react";
import { useRouter } from "next/router";

const QueueStatus: React.FC<{
  queuePosition: number | null;
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
}> = ({ queuePosition, countdown, setCountdown }) => {
  const router = useRouter();

  useEffect(() => {
    if (queuePosition !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (countdown === 0) {
      router.push("/multiplayer");
    }
  }, [queuePosition, countdown, router, setCountdown]);

  if (queuePosition === null) return null;

  return (
    <div className="bg-[#49a8b8] text-[#1a1d2e] rounded-xl p-6 w-full max-w-md text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-4">You are in the queue!</h2>
      <p className="text-lg">Position: {queuePosition}</p>
      <p className="text-lg">Time remaining: {countdown} seconds</p>
    </div>
  );
};

export default QueueStatus;
