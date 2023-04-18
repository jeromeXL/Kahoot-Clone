context('Admin sign up - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })
  it('Successfully signs up as admin, creates game, starts game, logs out, logs back in', () => {
    const name = 'John Smith';
    const email = 'johnsmith@email.com';
    const password = 'Passw0rd!';

    // click on the link to the admin login
    cy.get('[id=ToAdmin]').click();

    // click on sign up button
    cy.get('[id=AdminToSignUp]')
      .click();

    // fill out the sign up form;
    cy.get('input[name=SignUpEmail]')
      .focus()
      .type(email);
    
    cy.get('input[name=SignUpName]')
    .focus()
    .type(name);

    cy.get('input[name=SignUpPW1]')
    .focus()
    .type(password);

    cy.get('input[name=SignUpPW2]')
    .focus()
    .type(password);
    
    cy.get('button[name=SignUpButton]')
      .click();
    
    // Now that we are in the dashboard, create a new game.
    cy.get('button[name=CreateNewGameButton]')
      .click();

    // New quiz form should now be available, so enter in a quiz name and create the quiz.
    const quizName = 'My first quiz :)';
    cy.get('input[name=NewQuizNameInput]')
      .focus()
      .type(quizName);

    cy.get('button[name=ConfirmCreateNewQuiz]')
      .click();

    // Click the start game button for that new quiz
    cy.get('button[name=StartGameButton]')
      .click();

    // Click the close button on the modal pop up
    cy.get('[name=StartGameModal]')
      .find('.modal-header')
      .find('button[class="btn-close"]')
      .click()

    // Click on the stop game button
    cy.get('button[name=StopGameButton]')
      .click();

    // Click to see results (not yet implemented)
    // cy.get('button[name=ToResultsPage]')
    //   .click();

    // Click the close button on the modal pop up
    cy.get('[name=StopGameModal]')
      .find('.modal-header')
      .find('button[class="btn-close"]')
      .click();

    // Log out
    cy.get('button[name=LogOutButton]')
      .click();
    
    // Confirm we're back in the admin login
    cy.get('[data-cy=SubtitleText]').then(el => {
      expect(el.text()).to.contain('Admin Login');
    })

    // Should be in the admin log in page. Log back in
    cy.get('input[name=LogInEmail]')
      .focus()
      .type(email);

    cy.get('input[name=LogInPassword]')
      .focus()
      .type(password);
    
    cy.get('button[name=LogInButton]')
      .click();

    // Confirm we're back in the dashboard
    cy.get('[data-cy=HeaderTitle]').then(el => {
      expect(el.text()).to.contain('Dashboard');
    })
  })

  it('admin successfully signs up, creates a quiz, changes quiz name, adds a question, logs out, deletes quiz', () => {
    const name = 'Jane Doe';
    const email = 'janedoe@email.com';
    const password = 'P@s$word1';

    // click on the link to the admin login
    cy.get('[id=ToAdmin]').click();

    // click on sign up button
    cy.get('[id=AdminToSignUp]')
      .click();

    // fill out the sign up form;
    cy.get('input[name=SignUpEmail]')
      .focus()
      .type(email);
    
    cy.get('input[name=SignUpName]')
    .focus()
    .type(name);

    cy.get('input[name=SignUpPW1]')
    .focus()
    .type(password);

    cy.get('input[name=SignUpPW2]')
    .focus()
    .type(password);
    
    cy.get('button[name=SignUpButton]')
      .click();

    // Confirm we're in the dashboard with no games.  
    cy.get('[name=NoQuizzesMsg]')
      .should('exist');

    // Now that we are in the dashboard, create a new game.
    cy.get('button[name=CreateNewGameButton]')
      .click();

    // New quiz form should now be available, so enter in a quiz name and create the quiz.
    const quizName = 'My new quiz';
    cy.get('input[name=NewQuizNameInput]')
      .focus()
      .type(quizName);

    cy.get('button[name=ConfirmCreateNewQuiz]')
      .click();

    cy.wait(500);
    // Confirm the quiz has the name "quiz"
    cy.get('[name=GameTitle]')
      .first()
      .then(el => {
        expect(el.text()).to.contain(quizName);
    })

    // Click the edit game button for that new quiz
    cy.get('button[name=EditGameButton]')
      .click();

    // Confirm we're in the Edit Game Screen
    cy.get('[data-cy=HeaderTitle]').then(el => {
      expect(el.text()).to.contain('Edit Game');
    })

    // Confirm there are no questions
    cy.get('[data-cy=NoQuestionsText]')
      .should('exist');

    // Get the quiz name input and type in the new name
    const newQuizName = 'Just edited my new quiz';
    cy.get('input[type=text]')
      .first()
      .clear()
      .type(newQuizName);

    // Click the save details buttons
    cy.get('[data-cy=SaveGameChangesButton]')
      .click();

    // Add a new question
    cy.get('[data-cy=AddQuestionButton]')
      .click();
    
    const question = 'Is red a primary colour?'
    const points = '500';
    const time = '10';
    const option1 = 'Yes';
    const option2 = 'No';
    const link = 'https://www.youtube.com/watch?v=R_rUYuFtNO4&ab_channel=TaylorSwiftVEVO';

    // Enter question
    cy.get('[data-cy=NewQuestionInput]')
      .focus()
      .type(question);
    
    // Enter points
    cy.get('[data-cy=NewPointsInput]')
    .focus()
    .type(points);

    // Enter time limit
    cy.get('[data-cy=NewTimeInput]')
    .focus()
    .type(time);

    // Select Link and input a Youtube video link
    cy.get('select').select('Youtube Link').should('have.value', 'link');

    cy.get('[data-cy=YoutubeInput')
      .focus()
      .type(link)
    
    // Type in options, and select the first option as the correct answer
    cy.get('[data-cy=NewQuestionOptionsForm').within(() => {
      cy.get('input[type=text]')
        .first()
        .type(option1);
      cy.get('input[type=text]')
        .eq(1)
        .type(option2);
      cy.get('input[type=radio]')
        .first()
        .click();
    })

    // Click the create question button.
    cy.get('[data-cy=ConfirmCreateQuestion]')
      .click();

    // Confirm the 'no questions text' doesn't exist anymore
    cy.get('[data-cy=NoQuestionsText]')
      .should('not.exist');

    // Click back button to go to Dashboard
    cy.get('button[name=EditGameToDashboard]')
      .click();

    // Confirm the quiz name has changed
    cy.wait(500);
    cy.get('[name=GameTitle]')
      .first()
      .then(el => {
        expect(el.text()).to.contain(newQuizName);
      })

    // Log out
    cy.get('button[name=LogOutButton]')
      .click();
    
    // Confirm we're back in the admin login
    cy.get('[data-cy=SubtitleText]').then(el => {
      expect(el.text()).to.contain('Admin Login');
    })

    // Should be in the admin log in page. Log back in
    cy.get('input[name=LogInEmail]')
      .focus()
      .type(email);

    cy.get('input[name=LogInPassword]')
      .focus()
      .type(password);
    
    cy.get('button[name=LogInButton]')
      .click();

    // Confirm we're back in the dashboard
    cy.get('[data-cy=HeaderTitle]').then(el => {
      expect(el.text()).to.contain('Dashboard');
    })

    // Confirm the edited game still exists
    cy.wait(500);
    cy.get('[name=GameTitle]')
      .first()
      .then(el => {
        expect(el.text()).to.contain(newQuizName);
    })

    // Click the delete game button
    cy.get('button[name=DeleteGameButton]')
      .first()
      .click();

    // Confirm there are no more games by checking if the no games message exists
    cy.wait(500);
    cy.get('[name=NoQuizzesMsg]')
      .should('exist');
  })
})