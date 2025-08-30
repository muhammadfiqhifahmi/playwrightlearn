Feature: Login Page
Background:
Given I access the login page


Scenario: Success Login To Website
When I input username "standard_user" and password "secret_sauce"
Then I should be logged in successfully

Scenario: Failed Login To Website
When I input username "problem_user" and password "secret_sauces"
Then I should see an error message
