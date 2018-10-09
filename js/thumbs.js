window.onload = function() {

// GLOBALS
	// CONSTANTS

	// Get thumbs
	const thumbsList = document.getElementsByClassName('thumb');

	// Get vote now buttons
	const voteNowList = document.getElementsByClassName('vote-now');

	// Get vote again buttons
	const voteAgainList = document.getElementsByClassName('vote-again');

	// OBJECTS
	// Get celebrities array from celebrities.json file
	req=new XMLHttpRequest();
	req.open("GET",'js/json/celebrities.json',true);
	req.send();
	req.onload=function(){
	  celebrities = JSON.parse(req.responseText);
	};

	// FUNCTIONS

	// Define get thumb sibling function 
	const getThumbSibling = function(thumb) {
		// If next element sibling exist
		if (thumb.nextElementSibling) {		
			// Return that element
			return thumb.nextElementSibling;
		} else {
			// Return previous sibling
			return thumb.previousElementSibling;
		}
	}

	// Other thumb selected function
	const otherThumbSelected = function(thumb) {
		// Get thumb sibling
		let sibling = getThumbSibling(thumb);
		
		// If sibling is selected
		if (sibling.classList.contains('selected')) {
			return true;
		} else {
			return false;
		}
	}

	// Select thumb function
	const selectThumb = function() {
		// If the other thumb is selected
		if (otherThumbSelected(this)) {
			// Remove selected class from it
			let sibling = getThumbSibling(this);
			sibling.classList.remove('selected');
			// Add selected class to this thumb
			this.classList.add('selected');
		} else {
			// If this thumb is selected
			if (this.classList.contains('selected')) {
				// Remove selected class from it
				this.classList.remove('selected');
			} else {
				// Add selected class to it
				this.classList.add('selected');
			}
		}
	}

	// Hide celebrity description function
	const hideCelebDescription = function(voteButton) {
		// Get description
		let description = voteButton.parentElement.previousElementSibling.getElementsByClassName('description')[0];		
		// Hide description
		description.classList.add('hidden');
	}

	// Display celebrity description
	const displayCelebDescription = function(voteAgainButton) {
		// Get description
		let description = voteAgainButton.parentElement.previousElementSibling.previousElementSibling.getElementsByClassName('description')[0];		
		// Display description
		description.classList.remove('hidden');
	}

	// Hide vote section function
	const hideVoteSection = function(voteButton) {
		// Get vote section
		let voteSection = voteButton.parentElement;
		// Hide vote section
		voteSection.classList.add('hidden');
	}

	// Display vote section function
	const displaVoteSection = function(voteAgainButton) {
		// Get vote section
		let voteSection = voteAgainButton.parentElement.previousElementSibling;
		// Display vote section
		voteSection.classList.remove('hidden');
	}

	// Display thank you section function
	const displayThankSection = function(voteButton) {
		// Get thank you section
		let thankSection = voteButton.parentElement.nextElementSibling;
		// Display thank you section
		thankSection.classList.remove('hidden');
	}

	// Hide thank you section function
	const hideThankSection = function(voteAgainButton) {
		// Get thank you section
		let thankSection = voteAgainButton.parentElement;
		// Hide thank you section
		thankSection.classList.add('hidden');
	}

	// Vote function
	const vote = function() {
		// Register vote	

		// Hide celebrity description
		hideCelebDescription(this);
		// Hide vote section
		hideVoteSection(this);
		// Display thank you section
		displayThankSection(this);
	}

	// Vote again function
	const voteAgain = function() {
		// Hide thank you section
		hideThankSection(this);
		// Display celebrity description
		displayCelebDescription(this);
		// Display vote section
		displaVoteSection(this);
	}


// THUMBS

	// Add click event listeners to all thumbs to allow users to select a thumb
	// For each thumb
	Array.from(thumbsList).forEach(function(element) {
		// Add a click event listener to change the selected thumb
		element.addEventListener('click', selectThumb);
	});

// VOTE NOW

	// Add click event listeners to all vote now buttons
	// For each vote now button
	Array.from(voteNowList).forEach(function(element) {
		// Add a click event listener to register vote and display thank you message
		element.addEventListener('click', vote);
	});

// VOTE AGAIN
	
	// Add click event listeners to all vote now buttons
	// For each vote now button
	Array.from(voteAgainList).forEach(function(element) {
		// Add a click event listener to register vote and display thank you message
		element.addEventListener('click', voteAgain);
	});

}

