js-combinatorics
================

A javascript combinatorics library. Right now, it provides just the following utility:

`combinatorics.processCombinations(array, process, minCombLen, maxCombLen)`

*A generator of combinations of an array's elements*

- It's fast (0.2 secs for an array of length 20)
- It's able to compute only some subsets of combinations (using minCombLen and maxCombLen)
- It's memory-constant, because it doesn't build an array with the combinations (it receives a processing function instead, which can build an array if it needs to). Furthermore, the function can return false to halt mid-process.

*Usage examples:*

	var deck = []; // A standard deck of cards
	for(var i = 1; i <= 52; i++) deck.push(i); // Deck initialization, [1..52]

	// Let's calculate how many unique first hands there are (it should be 2,598,960)
	var count = 0,
		sdate = new Date();
	combinatorics.processCombinations(deck, function(combination){count += 1;}, 5, 5);
	// Notice that I'm simply counting, but I could be processing the combinations in any other way
	console.log(count + ' combinations processed in ' + (new Date() - sdate)/1000 + ' seconds');
	>> 2598960 combinations processed in 0.371 seconds

	// Given a hand and the opportunity to discard from 1 to 5 of the cards, let's calculate how many
	// different outcomes there can be (it should be 1,729,647, +1 if you count the option of not discarding)
	count = 0;
	sdate = new Date();
	combinatorics.processCombinations(deck.slice(5), function(combination){count += 1;}, 1, 5);
	// Notice that I'm simply counting, but I could be processing the combinations in any other way
	console.log(count + ' combinations processed in ' + (new Date() - sdate)/1000 + ' seconds');
	>> 1729647 combinations processed in 0.232 seconds

	// A simple example
	combinatorics.processCombinations([1,2,3,4], function(combination){console.log(combination)});
	>> [1]
	>> [2]
	>> [3]
	>> [4]
	>> [1, 2]
	>> [1, 3]
	>> [1, 4]
	>> [2, 3]
	>> [2, 4]
	>> [3, 4]
	>> [1, 2, 3]
	>> [1, 2, 4]
	>> [1, 3, 4]
	>> [2, 3, 4]
	>> [1, 2, 3, 4]
