# ./vendor/bin/behat -c tests/Integration/Behaviour/behat.yml -s feature
@reset-database-before-feature
Feature: Product feature management
  PrestaShop allows BO users to manage product features
  As a BO user
  I must be able to create, edit and delete product features

  Background:
    Given shop "shop1" with name "test_shop" exists

  Scenario: Create product feature
    When I create product feature "feature1" with specified properties:
      | name | My feature |
    Then product feature "feature1" name should be "My feature"

  Scenario: Update product feature name
    Given product feature with id "1" exists
    When I update product feature with id "1" name in default language to "My great feature"
    Then product feature with id "1" name in default language should be "My great feature"
