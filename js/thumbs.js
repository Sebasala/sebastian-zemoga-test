window.onload = function() {

// Get thumbs
const thumbsList = document.getElementsByClassName('thumb');

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

// Add click event listeners to all thumbs to allow users to select a thumb
// For each thumb
Array.from(thumbsList).forEach(function(element) {
	// Add a click event listener to change the selected thumb
	element.addEventListener('click', selectThumb);
});

}

