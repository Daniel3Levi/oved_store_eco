## Oved Store ecommerce Fronend website Doc

## Screens:

**_All detail in this doc is relative to the display of a large browser screen_**
The websit is responsive.

---

## User options:

1.  Website Header: (Accessible from anywhere on the site)

    - Brand name link will bring the user back to Home Screen from anywhere on the site.
    - Search bar for searching products onClick search leads the user to the Search Screen.
    - Cart link will open the user personal Cart Screen.
    - Badge (Appears on cart link when user add at least one product to cart) badge will update the number automatically when user add products to cart.
    - Login link will open the user Login Screen.
    - Menu icon will open products categories menu on the left side of the header.

1.1. Website Header: (After Login/Signin)

    - The login link changes to the username from which, drops down  menu  where you can see the user profile screen, the user order history screen and the user logout option.

---

2.  Product Component:

    Used as an object on all screens on the site, On each page I use its values as needed.

        * Product name.
        * Slug (for url).
        * Product category.
        * Product image.
        * Product price.
        * Count In Stock (Is the product available in stock?).
        * Product brand name.
        * Average customer rating.
        * Number of customer review.
        * Product description.
        * Add to cart button. (Active only if the product is available in stock).

---

3.  Home - Screen:

    - User can see list of recommended products.
    - Products Component in HomeScreen include: Product image, Product name, Product price, Average customer rating, number of customer review, Add to cart button.
    - User can add to cart recommended prodects.
    - Product Name,Image,Price and Rating work as a link that open product screen (Allows the user to see more details about the product).
    - Product add to cart button update the cart & badge automatically and redirect user to Cart Screen.

---

4.  Product - Screen:

    - Shows the user one product in more detail according to what he selected.
    - Product Component in ProductScreen include: Product image, Product name, Average customer rating & number of customer review, Product price,Product description, Availability of the product in stock, Add to cart button.
    - Product add to cart button update the cart & badge automatically and redirect user to Cart Screen.

---

5.  Cart - Screen: (Empty cart)

    - Show a message box which informs the user that the shopping cart is empty of products and shows the user a link that leads him to search for new products.
    - Show a card with total payment: 0, total amount of products: 0 and inactive payment button.

5.1. Shopping cart with one or more products:

    - The user will see a list of products arranged by rows, each row will contain a  product small image, product price, option to increase or decrease the amount of the product in the cart and the option to delete the product from the cart.
    - Show a card with total payment: price sum of the products, total amount of products: quantity sum of products and active payment button.
    - Active patment button:
        * Case user not login the button will redirect the user to the SigninScreen.
        * Case user alrady login the button will redirect the user to the ShippingScreen.

---

6.  Sign in - Screen:

    - Show to the user a form with two input text - user email (required), user password (required) and submit form button.
      case user try to pay:
    - onSubmit form user redirect to ShippingScreen.
      case user try to signin:
      - onSubmit form user redirect to HomeScreen.
    - Show to user a link to SignupScreen ( redirect the user to the SignupScreen).

---

7.  Sing up - Screen:

    - Show to the user a form with four input text - user name (required), user email (required), user password (required), validate password (required) - (Checking if the passwords match) and submit form button.
      - onSubmit form user redirect to ShippingScreen.
    - Show to user a link to SigninScreen in case the user already exists (redirect the user to the SigninScreen).

---

8.  Shipping Screen:

    - CheckOutStepes component (shipping step) at the top of the Screen updates the user on the payment and shipping process.
    - Show to the user a form with five input text - user full name (required), user address (required), user city (required), user post code (required), user country (required) and submit form button.
      - onSubmit form user redirect to PaymentMethodScreen.

---

9.  Payment Method Screen:

    - CheckOutSteps component (order step) at the top of the Screen updates the user on the payment and shipping process.
    - Show to user a checklist of payment methods option and a submit button.
      - onSubmit form user redirect to PlaceOrderScreen.

---

10. Place Order Screen & Order Screen:

        - CheckOutSteps component (finish order step) at the top of the Screen updates the user on the payment and shipping process.
        - Place Order Screen: This screen should summarize to the user all the information he has given to verify that the information is correct.
        - Each row offers the user a link that redirect to a different screen depending on the row the user to edit the information shown in that row.


        - Order Screen: Shows the user the same as place order screen only without editing option and with delivery status and payment status.

        * User wil see three rows:
          1. Shipping row - show the user all the shipping info which he insert into the fields in ShippingScreen.
          - in Order Screen - +Delivery status - which changes depending on whether the shipment has been sent..
          2. Payment Method row - the payment method he choose in PaymentMethodScreen.
          - in Order Screen - +Payment status - which changes depending on whether the user has paid.
          3. Cart row (Products list) - Shows the user all the products he has chosen to pay for.
        * Summary card - info for the user, includ:
          - The sum of all the products in the cart.
          - Postage.
          - Taxes.
          - The total amount.
          - Place Order Screen - confirmation button: onClick user redirect Order Screen
          - Order Screen - Paypal Payment button.

---

11. Profile - Screen:

    - Shows the user a form with the existing information he entered during registration, with four input text - user name (required), user email (required), user password (required), validate password (required) - (Checking if the passwords match) and submit form button, which updates the information on the server.

---

12. Order History - Screen:

    - Shows the user a table of all the orders he has made arranged in rows,
      every row contain this columns:
      1. Order number
      2. Order date
      3. Total payment
      4. Date of payment
      5. Delivery date
      6. Button onClick - open the Order Screen - to see the order details.

---

13. Search Screen:

    - Shows the user a screen where all the products are arranged in pages, the user can move between the pages and choose products or define what he is looking for to filter the products.
    - On the right side, the user will be presented with options to filter the products according to:
      1. Categories.
      2. Price.
      3. Customer rating.
    - At the top of the page will be a text showing the status of the filters, the user will be able to see the filters he has selected and, if necessary, remove them in addition, next to the filters status, a dropdown will appear showing additional product filtering options:
      1. From new to old.
      2. Price: from the lowest to the highest.
      3. Price: from the highest to the lowest.
      4. Ranking: from highest to lowest.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
