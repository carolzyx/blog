/* chrome user script by lifesinger@gmail.com */

(function() {

  var host = location.host;

  var fns = {

    'google.com': function() {
      // no Google+ notifications
      hideIfExists('#gbgs1');

      // no right sidebar
      try {
      hideIfExists(document.getElementById('canvas_frame')
          .contentDocument.querySelectorAll('td.Bu')[2]);
      }
      catch(e) {}

      // no search header in google calendar
      if (~location.pathname.indexOf('/calendar/')) {
        hideIfExists('#vr-header');
      }
    },

    'weibo.com': function() {
      // no pullylist
      hideIfExists('#pl_content_pullylist');

      // no right side
      hideIfExists('#Box_right');
    },

    'github.com': function() {
      // no notifications
      hideIfExists('#header .notifications_count');
    }
  };


  function hideIfExists(o) {
    var elem;

    if (typeof o === 'string') {
      elem = document.querySelector(o);
    }
    else if (o && o.nodeType === 1) {
      elem = o;
    }

    if (elem) {
      elem.style.display = 'none';
    }
  }


  function run() {
    Object.keys(fns).some(function(key) {
      if (~host.indexOf(key)) {
        fns[key]();
        return true;
      }
    });
  }


  // run immediately
  run();

  // register for events
  window.addEventListener('DOMContentLoaded', run, false);
  window.addEventListener('hashchange', run, false);

})();
