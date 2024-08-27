// For skills-prog
$('.skills-prog li').find('.skills-bar').each(function(i) {
  var $this = $(this);
  var width = $this.parents().attr('data-percent') + '%';
  $this.find('.bar').delay(i * 150).animate({
    width: width
  }, 1000, 'linear', function() {
    $(this).css('transition-duration', '.5s');
  });
});
  
  // For skills-soft
$('.skills-soft li').find('svg').each(function(i) {
  var $this = $(this);
  var circle = $this.children('.cbar');
  var r = circle.attr('r');
  var c = Math.PI * (r * 2);
  var percent = $this.parent().data('percent');
  var cbar = ((100 - percent) / 100) * c;
  circle.css('stroke-dashoffset', c).css('stroke-dasharray', c);
  circle.delay(i * 150).animate({
    strokeDashoffset: cbar
  }, 1000, 'linear', function() {
    circle.css('transition-duration', '.3s');
  });
  $this.siblings('small').prop('Counter', 0).delay(i * 150).animate({
    Counter: percent
  }, {
    duration: 1000,
    step: function(now) {
      $(this).text(Math.ceil(now) + '%');
    }
  });
});

let tl, downloading = false, points = [], 
  btn = document.querySelector('.btn'),
  dot = document.querySelector('.dot'),
  text = document.querySelector('.text'),
  mainCirc = document.querySelector('.mainCircle'),
  subCirc = document.querySelector('.subCircle'),
  mainCircFill = document.querySelector('.mainCircleFill'),
  arrow = document.querySelector('.arrow'),
  rect = document.querySelector('.rect');

// Download Button Event Listener
var link = document.createElement('a');
link.href = 'assets/cv.pdf'; 
link.download = 'Netanel Mazuz.pdf'; 


$('button').click(function(){
  var button =  $(this);
  button.addClass('active');
  document.body.appendChild(link);
  var promise = new Promise(function(resolve, reject) {
    link.addEventListener('click', function() {
      setTimeout(function() {
        button.removeClass('active');
        }, 1800);
      resolve();
    });
  });

  setTimeout(function() {
    link.click();
    promise.then(() => document.body.removeChild(link))}, 1800);
});

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
		cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
		nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    if (content.charAt(i) === ' ') {
        letter.innerHTML = '&nbsp;';
    } else {
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
    }
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);