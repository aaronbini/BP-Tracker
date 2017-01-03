describe('bpTrackerApp', function() {

  it('something', function () {

  });

  describe('navigation', function () {
    beforeEach(function () {
      browser.get('/');
    });

    it('defaults to /', function() {

      const uiView = element(by.css('main ui-view'));

      function testState (url, componentName) {
        expect(browser.getLocationAbsUrl()).toMatch(url);
        const component = uiView.all(by.css('*').first());
        expect(component.getTagName()).toEqual(componentName);

      };

      // const nav = element.all(by.css('nav a'));
      // const aWelcome = nav.get(0);
      // const aGallery = nav.get(1);

    });

  });

});
