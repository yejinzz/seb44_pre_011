import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  header: {
    "ngrok-skip-browser-warning": "skip",
    value: true,
  },
});

// signup
export const signup = async (formData) => {
  try {
    return await instance.post("/members", formData);
  } catch (error) {
    console.error("Error getting users", error);
  }
};

// login

export const login = async (formData) => {
  try {
    return await instance.post("/auth/login", formData);
  } catch (error) {
    console.error("Error getting users", error);
  }
};

// Users
export const getUsers = async () => {
  try {
    return await instance.get("/members");
  } catch (error) {
    console.error("Error getting users", error);
  }
};

export const getUser = async (memberId) => {
  try {
    return await instance.get(`/members/${memberId}`);
  } catch (error) {
    console.error("Error getting user", error);
  }
};

export const editProfile = async (memberId, updateInfo) => {
  try {
    instance.patch(`/members/${memberId}`, updateInfo);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

// Question
export const getQuestions = async () => {
  try {
    return await instance.get("/questions");
  } catch (error) {
    console.error("Error getting questions", error);
  }
};

export const getquestion = async (questionId) => {
  try {
    instance.get(`/questions/${questionId}`);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

export const postquestion = async (data) => {
  try {
    instance.post(`/questions`, data);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

export const editQuestion = async (questionId, data) => {
  try {
    instance.patch(`/questions/${questionId}`, data);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

//
export const getList = async (tab, memberId) => {
  try {
    return await instance.get(`/${tab}/member/${memberId}`);
  } catch (error) {
    console.error("Error getting user", error);
  }
};

// Answer
export const postAnswer = async (answer) => {
  try {
    instance.post(`/answers`, answer);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

export const editAnswer = async (answerId, updateAnswer) => {
  try {
    axios.patch(`/answers/${answerId}`, updateAnswer);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

export const getAnswer = async (questionId) => {
  try {
    axios.get(`/answers/question/${questionId}`);
  } catch (error) {
    console.error("Error updating profile", error);
  }
};
