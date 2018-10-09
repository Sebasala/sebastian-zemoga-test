window.onload = function() {		

	// Get celebrities array from celebrities.json file
	req = new XMLHttpRequest();
	req.open("GET",'js/json/celebrities.json',true);
	req.send();
	req.onload = function(){
	  	celebrities = JSON.parse(req.responseText);

	  	// Initialize celebrities HTML
		let celebritiesHTML = "";		

	  	// For each celebrity in celebrities array
		celebrities.forEach(function(celebrity) {
			// Generate celebrity HTML
			let celebrityHTML = `<li class="celebrity" style="background-image: url(${ celebrity.picture });">
							<section>
								<div class="wrapper">
									<div class="info">
										<h3>${ celebrity.name }</h3>
										<p class="last"><strong>${ celebrity.lastVote }</strong> in ${ celebrity.category }</p>
										<div class="description">
											<p>${ celebrity.description }</p>
										</div>
									</div>
									<div class="vote-section">
										<div class="thumbs">
											<button class="thumb up"><img class="icon" src="img/up.png" alt="Thumb up"></button>
											<button class="thumb down"><img class="icon" src="img/down.png" alt="Thumb down"></button>
										</div>
										<button class="vote vote-now">Vote now</button>
									</div>
									<div class="thankyou hidden">
										<p class="thankyou-message">Thank you for voting!</p>
										<button class="vote vote-again">Vote again</button>
									</div>
								</div>
								<div class="percentage-bar">
									<div class="percentage-up" style="width: 0"><img class="icon" src="img/up.png" alt="Up"> 50%</div>
									<div class="percentage-down" style="width: 0">50% <img class="icon" src="img/down.png" alt="down"></div>
								</div>
							</section>
						</li>`
			// Add celebrity HTML to celebrities HTML
			celebritiesHTML += celebrityHTML;
		});

		// Get celebrities HTML Element
		const celebritiesHTMLElement = document.getElementById('celebrities');
		
		// Render celebrities HTML
		celebritiesHTMLElement.innerHTML = celebritiesHTML;

		// CONSTANTS

		// Get thumbs
		const thumbsList = document.getElementsByClassName('thumb');

		// Get vote now buttons
		const voteNowList = document.getElementsByClassName('vote-now');

		// Get vote again buttons
		const voteAgainList = document.getElementsByClassName('vote-again');

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

		// Get vote selected function
		const getVoteSelected = function(voteButton) {
			// Find thumb up 
			let thumbUp = voteButton.previousElementSibling.getElementsByClassName('up')[0];
			// If thumb up is selected
			if (thumbUp.classList.contains('selected')) {
				return 'up';
			} else {
				// Find thumb down 
				let thumbDown = thumbUp.nextElementSibling;
				// If thumb down is selected
				if (thumbDown.classList.contains('selected')) {
					return 'down';
				} else {
					return null;
				}
			}	
		}

		// Find celebrity function
		const findCelebrity = function(voteButton) {
			// Get celebrity name
			let name = voteButton.parentElement.previousElementSibling.getElementsByTagName('h3')[0].innerText;
			// For each celebrity in celebrities
			for (let i = 0; i < celebrities.length; i++) {
				// If celebrity.name = celebrity name provided
				if (celebrities[i].name === name) {
					return i;
				}
			};
		}

		// Register vote function
		const registerVote = function(voteButton) {
			// Get vote selected
			let voteSelected = getVoteSelected(voteButton);
			// Find celebrity index of the celebrities array
			let index = findCelebrity(voteButton);
			// If vote selected is up
			if (voteSelected === 'up') {
				// Add a vote to thumbsUp value of this celebrity
				celebrities[index].thumbsUp += 1;

			} else if (voteSelected === 'down') {
				// Add a vote to thumbsDown to this celebrity
				celebrities[index].thumbsDown += 1;

			} else {
				// Alert no vote selected
				window.alert('No vote were selected');
			}
			// Calculate percentage up
			let pUpN = celebrities[index].thumbsUp / (celebrities[index].thumbsUp + celebrities[index].thumbsDown) * 100; 		
			let pUp = pUpN.toFixed(1);
			// Calculate percentage down
			let pDownN = 100 - pUp;
			let pDown = pDownN.toFixed(1);
			// Change percentage up innerHTML
			let pUpHTML = `<img class="icon" src="img/up.png" alt="Up"> ${ pUp }%`
			let pUpBar = voteButton.parentElement.parentElement.nextElementSibling.getElementsByClassName('percentage-up')[0];
			pUpBar.innerHTML = pUpHTML;

			// Change percentage up width
			pUpBar.style.width = pUp + "%";
			
			// Change percentage down innerHTML
			let pDownHTML = `<img class="icon" src="img/up.png" alt="Up"> ${ pDown }%`
			let pDownBar = voteButton.parentElement.parentElement.nextElementSibling.getElementsByClassName('percentage-down')[0];
			pDownBar.innerHTML = pDownHTML;

			// Change percentage down width
			pDownBar.style.width = pDown + "%";
		}

		// Vote function
		const vote = function() {
			// Register vote	
			registerVote(this);
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

	};
	
}

