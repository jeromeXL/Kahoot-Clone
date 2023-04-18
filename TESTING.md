For our second test case, we wanted to test things that were not included in the first test case. For example, these key areas were not tested:

- Edit quiz details (name/thumbnail)
- Adding a question
- Adding an attachment to a question
- Going from Edit Game Screen back to Dashboard
- Delete game

Hence, we wanted to focus on these things to test. Our code was unable to implement certain aspects of Player join/Player play, so we chose not to do it. We would prefer to test the parts of our code that was up to standard, and we believed was working well.

Hence, our second test case goes as such:
- Admin signs up
- Admin creates a new quiz
- Admin clicks the edit quiz button.
- Admin is taken to the edit quiz page for that specific quiz
- Admin changes the quiz name
- Admin then clicks the save details button to commit their changes
- Admin adds a question, including the question itself, the points, time limit, and options.
- Admin chooses the Youtube Link dropdown, allowing them to input a youtube video for the question.
- Admin then clicks the add question button, which adds it to the quiz.
- Admin clicks the back to dashboard button to take them back to the dashboard.
- Admin clicks the logout button, which takes them back to the admin log in.
- Admin logs in using previous details, returning to Dashboard
- Admin clicks the delete quiz button.
- We confirm that the quiz is deleted by checking whether there is text stating that the user has no quizzes. 