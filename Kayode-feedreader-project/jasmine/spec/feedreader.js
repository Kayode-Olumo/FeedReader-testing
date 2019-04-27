/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are defined and not empty', function() {
              //iterate through the string with forEach to ensure all have urls
              allFeeds.forEach(feeds =>{
                expect(feeds.url).toBeDefined();
                expect(feeds.url.length).not.toBe(0);
              });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('blog names are defined and not empty', function(){
              allFeeds.forEach(blogName =>{
                expect(blogName.name).toBeDefined();
                expect(blogName.name.length).not.toBe(0);
              });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function(){
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('the menu is currently hidden', function(){
           // we grab the body element and find out if it is associated with the class 'menu-hidden'
           //, then ensure that it returns the expected value which is true.
           expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('menu displayed when clicked', function(){
            $('.menu-icon-link').click();//selects the element being clicked
            //same line of code as before only this time we expect its value to be false
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(done =>{//parsing in done as a parameter
           loadFeed(0, done);//call the function and loads the fist item in the list, with a callback function
           //after you have finished executing the asynchronous task it will run done()
       });

       it('when loadFeed is called and completed, there is at least one entry', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);//$('.feed .entry') returns an array of entries & checks if length is greater than 0
       });
    });




    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         let rssOne,rssTwo;//global variabled to be access anywhere within the function
         //this helps with thre issue of scope

         beforeEach(done =>{
              loadFeed(0, function(){
                  rssOne = $('.feed').html();// get the content from the feed element
                  done();
              });
              loadFeed(1, function(){
                  rssTwo = $('.feed').html();
                  done();
              });
         });

         it('loading new feed changes content', function(){
              expect(rssOne == rssTwo).toBe(false);
         });
    });
}());
