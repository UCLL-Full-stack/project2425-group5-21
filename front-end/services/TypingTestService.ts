const getTypingTests = async () => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/typingtests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
interface TypingTestPayload {
  wpm: number;
  accuracy: number;
  time: number;
  type: string;
}

export const createTypingTest = async (payload: TypingTestPayload) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  console.log(token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/typingtests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`

    },
    body: JSON.stringify(payload),
  });
  return response.json();
};


const TypingTestService = {
  getTypingTests,
};

export default TypingTestService;
