Feature: Login

  Scenario: User logins successfully
    Given I am on the login page
    When I enter valid credentials
    And I click the submit button
    Then I should be redirected to the dashboard

  Scenario: User enters invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    And I click the submit button
    Then I should see an error message
