const getMeetingsBasedOnUserId = async (userId) => {
  const link = 'http://localhost:3001/users/' + userId + "/meetings";
  const response = await fetch(link, {
    method: 'GET'
  });
  return response.json();
};

export default {
  getMeetingsBasedOnUserId: getMeetingsBasedOnUserId,
};