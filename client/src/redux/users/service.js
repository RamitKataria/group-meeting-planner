export const getMeetingsBasedOnUserId = async (userId) => {
  const link = 'http://localhost:3001/users/' + userId + "/meetings";
  const response = await fetch(link, {
    method: 'GET'
  });
  return response.json();
};

export const getUserBasedOnUserId = async (userId) => {
  const link = 'http://localhost:3001/users/' + userId;
  const response = await fetch(link, {
    method: 'GET'
  });
  return response.json();
};

const deleteUserBasedOnUserId = async (userId) => {
  const link = 'http://localhost:3001/users/' + userId;
  const response = await fetch(link, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }
  return data;
};

const updateUserBasedOnUserId = async (content) => {
  const link = 'http://localhost:3001/users/' + content.userId;
  const response = await fetch(link, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content.updateContents)
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }
  return data;
};

export default {
  getMeetingsBasedOnUserId: getMeetingsBasedOnUserId,
  getUserBasedOnUserId: getUserBasedOnUserId,
  deleteUserBasedOnUserId: deleteUserBasedOnUserId,
  updateUserBasedOnUserId: updateUserBasedOnUserId
};