# National Parks Recommender Tool with ML

## Team Members
**HEMKK TEAM:** Hugo Garcia, Eli Martinez, Misha Berkowitz, Kenny Sun, Kevin Li 

## Project Summary
Incorporating mostly everything learned from the entire data science bootcamp. I, and a group of four other classmates formed to develop an interactive website that would give the user current and historical weather information, along with campground availability and critical informational notices from most major National Parks in the U.S mainland. The purpose of this site is to help the user determine optimal vacation plans based on their preferences. We also incorporated machine learning concepts, using a KNN (k-nearest neighbors) prediction algorithm to predict which National Park the user may be interested in visiting based on previously visited parks and a small dataset we built based on a user survey.


## Aspects of the Project:
The following were different aspects the team explpored to develop this tool.

**Excel (CSVs):** Store raw Google Form survey responses and park metadata (e.g., latitude/longitude, website URL).

**Python (Pandas):** Create dataframes from CSVs. Filter, clean, and pivot dataframes. Create additional csv files for reference, further experimentation, and analysis.

**Python (Scipy):** Convert dataframes to a matrix for use in machine learning algorithm (KNN).

**Python (Selenium):** Attempted: Scraping module for access multiple Google review pages from a single session. Source 1 Source 2

**Python (Sklearn):** Recommend similar parks based on user ratings. Makes use of collaborative filtering. Input: favorite park; Output: 10 other parks to visit. Source code

**Flask:** Runs a local server to load HTML pages and run Python-based functions.

**HTML:** General layout of the site itself. Displays narrative-based recommender; real-time recommendations; raw survey data; park map; and current weather data.

**Javascript (Leaflet):** Generates a map of national parks with marker sizes based on survey ratings.

**Javascript (API):** Retrieves current temperatures for parks and displays on map popups.

**CSS:** Works with the HTML file to create a more appealing display for users to look at


