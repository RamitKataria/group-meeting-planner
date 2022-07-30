import {getAuth} from "firebase/auth";


const addMeeting = async (content) => {
  const link = 'http://localhost:3001/meetings/';
  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + await getAuth().currentUser.getIdToken()
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
      'Authorization': 'Bearer ' + await getAuth().currentUser.getIdToken()
    }
  });
  return response.json();
};

const deleteMeeting = async (meetingId) => {
  const link = 'http://localhost:3001/meetings/' + meetingId;
  const response = await fetch(link, {
    method: 'DELETE',
    'Authorization': 'Bearer ' + await getAuth().currentUser.getIdToken()
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
      'Authorization': 'Bearer ' + await getAuth().currentUser.getIdToken()
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