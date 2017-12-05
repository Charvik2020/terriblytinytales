# terribly-tiny-tales

# Task Details:  #

1. A front end which accepts a number input N with a Submit button.

2. On entering a value and pressing submit, a request should be sent to the backend.

3. From the backend, fetch a file hosted at http://terriblytinytales.com/test.txt.

4. From the backend, return the top N most frequently occurring words in this file.

5. Display the top N words and their frequency of occurrence in the frontend, in a tabular format.

# How to Run #

## On localhost ##

1. Install the dependencies:
    ```sh
    npm install
    ```

2. Run the server:
    ```sh
    npm run start
    ```

3. Run test cases:
     ```sh
     mocha test/fileTest
     ```

## Major Libraries and Plugins used ##

###### Client Side ######

> React
> Babel
> Webpack

###### Server Side ######

> Mysql
> Request
> Lodash
> Async

###### Testing ######

> Mocha
