# KAYAK homework

**Goal:** Create a simple web application that displays information about various
airlines.

**Tool used:** HTML / CSS / REACT (Hooks) - Most of the logic is gather in the airline-context

**Package installed:** fetch-jsonp

## Project approach

1. Identifying the color and size specs
   - Saving them as variable in CSS for consistency
2. Breaking down the layout/components
   - Header component
   - Airline Page (only 1 page in this project)
     - Filter component
     - Main Container (Airline List component)
       - Airline card component
   - Loading component
3. Structure the HTML keeping in mind what will be shown or hidden
4. Styling the CSS and setting different media queries
5. Working on the interactivity of the app:
   - Fetching and rendering the airlines
   - Filtering function

## Initiatives

- I added a loading component to avoid the user having to see an empty page while the data was being fetched
- I used 300x240px as a min spec for the airline card as provided in the mockup and wanted the card to expand to fit better smaller screens of different sizes
- Paginating the data fetch to avoid loading too many airlines at once. The pages are showing as the user is scrolling down
- Cleaning some of the data fetched (data format inconsistent, especially with airline website)
- Added a count next to the title to see the total of airlines
