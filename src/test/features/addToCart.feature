Feature: Add products to cart

    Background:
        Given User navigates to the application
        And User click on the login link

    Scenario Outline: Authenticated Users - Add to cart
        And User enter the username as "<username>"
        And User enter the password as "<password>"
        And User click on the login button
        When user search for a "<book>"
        And user add the book to the cart
        Then the cart badge should get updated

        Examples:
            | username | password   | book            |
            | DevDev   | DevDev1234 | Roomies         |
            | DevDev   | DevDev1234 | The Simple Wild |

    # Scenario: UnAuthenticated User - Add to cart
    #     When user search for a "All of Us with Wings"
    #     And user add the book to the cart
    #     Then the cart badge should get updated