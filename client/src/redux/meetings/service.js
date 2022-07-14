const addMeeting = async (content) => {
  const link = 'http://localhost:3001/meetings/';
  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }
  
  return data;
};

const getMeeting = async (meetingId) => {
  console.log("meetingID: " + meetingId);
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'GET'
  });
  return response.json();
};

const deleteMeeting = async (meetingId) => {
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }
  return data;
};

const updateMeeting = async (meetingId, content) => {
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }

  return data;
};

export default {
  addMeeting: addMeeting,
  getMeeting: getMeeting,
  deleteMeeting: deleteMeeting,
  updateMeeting: updateMeeting
};