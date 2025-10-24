// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const collegesGrid = document.getElementById('featured-colleges-grid');

    // Function to fetch college data from the backend API
    const fetchAndDisplayColleges = async () => {
        try {
            const response = await fetch('https://crs-backend-yoh7.onrender.com/api/colleges');  // Our backend endpoint
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const colleges = await response.json();

            // Clear the loading text
            collegesGrid.innerHTML = ''; 

            if (colleges.length === 0) {
                collegesGrid.innerHTML = '<p>No colleges found.</p>';
                return;
            }

            // Create and append a card for each college
            colleges.forEach(college => {
                const card = document.createElement('div');
                card.className = 'college-card';
                card.innerHTML = `
                    <img src="${college.image_url || 'https://via.placeholder.com/400x250.png?text=No+Image'}" alt="${college.name}" class="college-card-image">
                    <div class="college-card-content">
                        <h3>${college.name}</h3>
                        <p class="location">${college.city}, ${college.state}</p>
                        <p class="description">${college.description || 'No description available.'}</p>
                    </div>
                    <div class="college-card-footer">
                        <span class="rating">⭐ ${college.rating.toFixed(1)}</span>
                        <a href="#" class="btn-details">View Details</a>
                    </div>
                `;
                collegesGrid.appendChild(card);
            });

        } catch (error) {
            console.error('Failed to fetch colleges:', error);
            collegesGrid.innerHTML = '<p class="error-text">Could not load colleges. Please try again later.</p>';
        }
    };

    // Initial fetch when the page loads
    fetchAndDisplayColleges();
});