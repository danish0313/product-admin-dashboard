Feature: Products

  Scenario: User adds a new product successfully
    Given I am logged in and on the products page
    When I click the add product button
    Then new product should be added to the list

  Scenario: User cancels adding a new product
    Given I am logged in and on the products page
    When I click the add product button and then cancel
    Then the product should not be added to the list

  Scenario: User submits the product form with valid data
    Given I am logged in and on the products page
    When I submit the product form with valid data
    Then I should NOT see the form error alert
