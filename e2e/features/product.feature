Feature: Products

  Background:
    Given I am logged in and on the products page

  Scenario: User adds a new product successfully
    When I add a new product
    Then the new product should be visible in the list

  Scenario: User cancels adding a new product
    When I start adding a product and cancel
    Then the product should not be added to the list

  Scenario: User submits the product form with valid data
    When I add a new product
    Then I should not see the form error alert

  Scenario: Validate incomplete form - missing description
    When I click the add product button
    And I fill in the product details with name "Test product", price "45", category "Electronics" and description ""
    And I click the save product button
    Then the description field should be marked as required

  Scenario: Validate incomplete form - missing name
    When I click the add product button
    And I fill in the product details with name "", price "45", category "Electronics" and description "A great product"
    And I click the save product button
    Then the name field should be marked as required
