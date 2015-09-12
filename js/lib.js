var F = {
	init: function() {
		for(i = 0; i <= 12; i++) {
			F.stats[i] = 0;
		}
		F.showQuestion();
	},
	
	randBetween: function (min, max) {
		return Math.floor(Math.random() * max) + min;
	},
	
	score:0,
	stats:Array(12),
	
	showQuestion: function() {
		var n1 = F.randBetween(1, 12);
		var n2 = F.randBetween(1, 12);
		var answer = n1 * n2;
		var html = '<div class="question">What is ' + n1 + ' x ' + n2 + '?</div>\
            <span class="fish" id="fish1"><span class="answer">' + answer + '</span></span>\
            <span class="fish" id="fish2"><span class="answer">' + F.randBetween(1, 10) * F.randBetween(1, 10) + '</span></span>\
			<span class="fish" id="fish3"><span class="answer">' + F.randBetween(1, 10) * F.randBetween(1, 10) + '</span></span>\
            <span class="fish" id="fish4"><span class="answer">' + F.randBetween(1, 10) * F.randBetween(1, 10) + '</span></span>';
			
			$('#questionArea').html(html);
			for(var i = 1; i <= 4; i++) {
				var f = $('#fish' + i);
				f.css('left', F.randBetween(0, 100) + '%');
				f.css('top', F.randBetween(0, 50) + '%');
				f.on('click', function(e) {
					clickedFish = $(e.currentTarget);
					if(answer == clickedFish.find(".answer").text()) {
						$('.question').removeClass("incorrect").addClass("correct");
						$(".fish").not("#" + clickedFish[0].id).css('transition', '1s').addClass("invisible");
						
						setTimeout(F.showQuestion, 2000);
						F.score += 1;
						
						
						F.stats[n1]+=1;
						F.stats[n2]+=1;
						
					} else {
						$('.question').removeClass("correct").addClass("incorrect");
						if(F.stats[n1] > 0)F.stats[n1]-=1;
						if(F.stats[n2] > 0)F.stats[n2]-=1;
											}
					F.score = 0;
					for(i = 0; i <= 12; i++) {
						$('#tt_plant_indicator_' + (i)).css('height', 10+10*F.stats[i]);
						F.score += F.stats[i];
					}
					$('#score').text("Score:" + F.score);
				});
				
			}
			setTimeout(F.startAnimation, 10);
			
	},
	
	startAnimation: function() {
		for(var i = 1; i <= 4; i++) {
			var f = $('#fish' + i);
			f.css('left', F.randBetween(0, 100) + '%');
			f.css('top', F.randBetween(0, 50) + '%');
		}
		setTimeout(F.startAnimation, 5000);
	}
};