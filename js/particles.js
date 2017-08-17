document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particleInner'), {
    dotColor: 'black',
    lineColor: '#202026',
    lineWidth: .5,
    parallax: true,
  });
  var intro = document.getElementById('particleOuter');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);


/*
// jQuery plugin example:
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});
*/