const getTypingTests = async (username?: string) => {
  const userString = localStorage.getItem("loggedInUser");
  const token = userString ? JSON.parse(userString).token : null;
  const url = username
      ? `${process.env.NEXT_PUBLIC_API_URL}/typingtests?selectedUser=${username}`
      : `${process.env.NEXT_PUBLIC_API_URL}/typingtests`;
  return fetch(url, {
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
