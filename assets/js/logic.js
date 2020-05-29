var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
			scroller.resize();
		}

		// scrollama event handlers
		function handleStepEnter(response) {
            // add color to current step only
			step.classed('is-active', function (d, i) {
				return i === response.index;
			})

			// update graphic based on step
			document.getElementById('frame-chart').src = 'https://flo.uri.sh/story/325435/embed#slide-'+response.index;
		}

		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

		function init() {
			setupStickyfill();

			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: 1,
				debug: false,
			}).onStepEnter(handleStepEnter)

			// setup resize event
			window.addEventListener('resize', handleResize);
		}

// kick things off
init();