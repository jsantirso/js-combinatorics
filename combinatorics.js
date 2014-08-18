/* ---------------------------------------------------------------------------------------------------------------------
	Provides the following functions:

		combinatorics.processCombinations(array, process, minCombLen, maxCombLen)

			A generator of combinations of an array's elements
			--------------------------------------------------
			-	It's fast (0.2 secs for an array of length 20)
			-	It's able to compute only some subsets of combinations (using minCombLen and maxCombLen)
			-	It's memory-constant, because it doesn't build an array with the combinations (it receives a processing
				function instead, which can build an array if it needs to).
					Furthermore, the function can return false to halt mid-process.

			Usage examples:
			---------------
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

--------------------------------------------------------------------------------------------------------------------- */

(function(window, document, undefined) {
	'use strict';

	// Namespace
	window.combinatorics = {};
	
	window.combinatorics.processCombinations = function(array, process, minCombLen, maxCombLen) {
        // We initialize the default arguments
        minCombLen = minCombLen || 1;
        maxCombLen = maxCombLen || array.length;
        // Misc vars
        var arrayLen = array.length;
        // We loop through all the possible combination sizes (1..n)
        for(var combLen = minCombLen; combLen <= maxCombLen; combLen++) {
            // We initialize the pointers that will be used to generate the combinations
            // (0..n, as each of them points to a position in the array)
            var pointers = [];
            for(var i = 0; i < combLen; i++) pointers.push(i);
            // We will advance the pointers to generate the combinations of this size
            var finished = false; // A flag set to true when we have processed the current combination length
            while(!finished) {
                // We process the current combination
                var combination = [];
                for(var i = 0; i < combLen; i++) combination.push(array[pointers[i]]);
                if(process(combination) === false) return;
                // We find the first pointer that we can advance, starting from the right
                for(var pointer = combLen - 1; pointer >= 0; pointer--) {
                    if(pointers[pointer] < arrayLen - (combLen - pointer)) {
                        // We can advance it
                        pointers[pointer] += 1;
                        // We fix the next pointers
                        for(var fixPointer = pointer + 1, i = 1; fixPointer < combLen; fixPointer++, i++) {
                            pointers[fixPointer] = pointers[pointer] + i;
                        }
                        break;
                    } else {
                        // We can't advance it.
                        // If it was the leftmost one, we are done with this combination length
                        if(!pointer) finished = true;
                    }
                }
            }
        }
    };

})(this, this.document);
