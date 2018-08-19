//this file contains jasmine tests for various aspects of the feed reader

$(function () {
    'use strict';

    //tests various aspects of the RSS feed
    describe('RSS Feeds', function () {
        /* make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //tests that the url of the feed elements are defined and not empty
        it('url is defined and not empty', function () {
            allFeeds.forEach(function (elem) {
                expect(elem.url).toBeDefined();
                if (elem.url !== undefined) {
                    expect(typeof elem.url).toBe('string');
                    if (typeof elem.url === 'string') {
                        expect(elem.url.trim().length).not.toEqual(0);
                    }
                }
            });
        });

        //tests that the name of the feed elements are defined and not empty
        it('name is defined and not empty', function () {
            allFeeds.forEach(function (elem) {
                expect(elem.name).toBeDefined();
                if (elem.name !== undefined) {
                    expect(typeof elem.name).toBe('string');
                    if (typeof elem.name === 'string') {
                        expect(elem.name.trim().length).not.toBe(0);
                    }
                }
            });
        });
    });

    //tests various aspects of the menu
    describe('the menu', function () {
        let menu = document.getElementsByTagName('body')[0];
        let menuBurger = document.getElementsByClassName('menu-icon-link')[0];

        //tests that the menu is closed when the page initally loads
        it('is closed by default', function () {
            expect(menu.classList.contains('menu-hidden')).toBe(true);
        });

        //tests that the menu hides toggles its hidden state when propmted
        it('menu toggles between show and hide on click', function () {
            spyOn(menuBurger, 'onclick');
            //simulate click on menu burger
            menuBurger.click();
            //check to see if onclick event triggered and if it opened the menu
            expect(menuBurger.onclick).toHaveBeenCalled();
            expect(menu.classList.contains('menu-hidden')).toEqual(false);
            //simulate click on menu burger
            menuBurger.click();
            //check to see if onclick event triggered and if it closed the menu
            expect(menuBurger.onclick).toHaveBeenCalled();
            expect(menu.classList.contains('menu-hidden')).toEqual(true);
        });
    });

    //tests the initial entries in the feed
    describe('Initial Entries', function () {
        //ensures that the loadFeed async function is called before the test is run
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        //tests that the feed contains atleast one entry after loadFeed is called
        it('there is at least one .entry element in the .feed container when loadFeed is called', function (done) {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    //tests that selecting a new feed to be loaded behaves as expected
    describe('New Feed Selection', function () {
        let initialEntries, newEntries;

        //calls the loadFeed async function twice and captures the resulting feed before testing
        beforeEach(function (done) {
            loadFeed(0, function () {
                initialEntries = document.getElementsByClassName('feed')[0].innerHTML;
                loadFeed(1, function () {
                    newEntries = document.getElementsByClassName('feed')[0].innerHTML;
                    done();
                });
            });
        });
        //checks to see if the new feed loaded is different from the inital feed
        it('content changes when new feed is loaded', function (done) {
            expect(initialEntries).not.toEqual(newEntries);
            done();
        });
    });
}());