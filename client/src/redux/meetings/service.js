import {getAuth} from "firebase/auth";
import {getAuthHeader} from "../../authHeader";


const addMeeting = async (content) => {
  const link = 'http://localhost:3001/meetings/';
  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getAuthHeader()
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

export const getMeeting = async (meetingId) => {
  // console.log("meetingID: " + meetingId);
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'GET',
    headers: {
      'Authorization': await getAuthHeader()
    }
  });
  return response.json();
};

const deleteMeeting = async (meetingId) => {
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'DELETE',
    'Authorization': await getAuthHeader()
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
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': await getAuthHeader()
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