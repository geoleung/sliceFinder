//STRETCH
//Prompt users to input their location (city)
//Use input as query key for API request
//Get reviews from the location entered
//Filter review content to find the word "slice"
//If the review does contain "slice", store review details in Firebase
//Once all reviews have been checked, return the list stored from Firebase
//If user clicks on a button attached to a returned list item, save the item to a new list in Firebase
//Users can then navigate to a "Favourites" page where Firebase will return the saved list


//MVP
//Prompt users to input their location (city)
//User input as query key for API request
//Get back list of restaurants in that area
//Use restaurant IDs (?) to make a second call for each restaurant for more info
//For each restaurant, check for 'slice' in the review (using regex) -- filter out any restaurants that don't have 'slice'
//Return user a list of the restaurants that have 'slice' -- display in flickity?