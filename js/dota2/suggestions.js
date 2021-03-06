
class Suggestion {
	constructor(hero, advice) {
		this.hero = hero;
		this.advice = advice;
	}
}


class Suggestions {
	constructor(hero_list) {
		this.hero_list = hero_list;

		this.all = function () {

			// Get team quality
			var suggestions = [];
			for (var i = 0; i < heroes.length; i++) {
				new_heroes = this.hero_list.slice(0);
				new_heroes.push(heroes[i].slug);
				new_team = new Team(new_heroes);
				new_advice = new Advisor(new_team);
				suggestions.push(new Suggestion(heroes[i], new_advice));
			}

			// Sort by quality
			suggestions.sort(function (a, b) {
				return b.advice.quality() - a.advice.quality();
			});

			return suggestions.slice(0, 5);
		};
	}
}


$(document).on('heroes_changed', function () {

	// Get suggestions
	selected = get_selected_heroes();
	suggestions = new Suggestions(selected);
	suggestions = suggestions.all();

	// Show on page
	$('#suggested_heroes').html('');
	for (var i = 0; i < suggestions.length; i++) {
		var hero_li = get_hero_as_li(suggestions[i].hero);  // /js/dota2/hero_selector.js
		$('#suggested_heroes').append(hero_li);
		$('#suggested_heroes .hero:last').create_tooltip();
	}

});
