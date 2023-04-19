/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  const options = [];
  for (let i = 0; i < question.options.length; i++) {
    const obj = question.options[i];
    const key = Object.keys(obj)[0];
    options.push(key);
  }
  const publicQuestion = {title : question.title, options, points : question.points, link : question.link, image : question.image, time: question.time}
  console.log(publicQuestion);
  return publicQuestion;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const correct = [];
  for (let i = 0; i < question.options.length; i++) {
    const obj = question.options[i];
    const key = Object.keys(obj)[0];
    if (obj[key] === true) {
      correct.push(i);
    }
  }
  return correct;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return [...Array(question.option.length).keys()]
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time;
};
