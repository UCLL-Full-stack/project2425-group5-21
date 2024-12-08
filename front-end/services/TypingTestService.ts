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

const TypingTestService = {
  getTypingTests,
};

export default TypingTestService;
