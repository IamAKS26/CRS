// public/dashboard.js

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selections ---
    const studentNameSpan = document.getElementById('student-name');
    const recommendationForm = document.getElementById('recommendation-form');
    const recommendationsGrid = document.getElementById('recommendations-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    const scoreSlider = document.getElementById('score');
    const scoreValueSpan = document.getElementById('score-value');
    const feesSlider = document.getElementById('fees');
    const feesValueSpan = document.getElementById('fees-value');

    // --- Simulate Logged-In State ---
    const loggedInStudent = { name: "Priya Sharma" };
    studentNameSpan.textContent = loggedInStudent.name;

    // --- Initialize slider display values ---
    scoreValueSpan.textContent = scoreSlider.value;
    feesValueSpan.textContent = new Intl.NumberFormat('en-IN').format(feesSlider.value);

    // --- Event Listeners for Sliders ---
    scoreSlider.addEventListener('input', () => {
        scoreValueSpan.textContent = scoreSlider.value;
    });

    feesSlider.addEventListener('input', () => {
        feesValueSpan.textContent = new Intl.NumberFormat('en-IN').format(feesSlider.value);
    });

    // --- Form Submission Handler ---
    recommendationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading spinner and clear previous results
        loadingSpinner.style.display = 'block';
        recommendationsGrid.innerHTML = '';

        // Get user criteria
        const criteria = {
            stream: document.getElementById('stream').value,
            location: document.getElementById('location').value,
            score: parseInt(scoreSlider.value, 10),
            maxFees: parseInt(feesSlider.value, 10)
        };

        try {
            // --- Fetch recommendations from backend ---
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(criteria)
            });

            if (!response.ok) throw new Error('Failed to fetch recommendations');

            const data = await response.json();
            const recommendedColleges = data.colleges || [];

            loadingSpinner.style.display = 'none';
            displayRecommendations(recommendedColleges);

        } catch (err) {
            console.error(err);
            loadingSpinner.style.display = 'none';
            recommendationsGrid.innerHTML = `<p class="no-results-text">Error fetching recommendations. Please try again later.</p>`;
        }
    });

    // --- Function to Display Results ---
    function displayRecommendations(colleges) {
        recommendationsGrid.innerHTML = '';

        if (colleges.length === 0) {
            recommendationsGrid.innerHTML = '<p class="no-results-text">No colleges found matching your criteria. Try adjusting your filters.</p>';
            return;
        }

        // Sort by rating descending
        colleges.sort((a, b) => b.rating - a.rating);

        colleges.forEach(college => {
            const card = document.createElement('div');
            card.className = 'college-card';
            card.innerHTML = `
                <img src="${college.image_url || 'https://via.placeholder.com/400x250.png?text=No+Image'}" alt="${college.name}" class="college-card-image">
                <div class="college-card-content">
                    <h3>${college.name}</h3>
                    <p class="location">${college.city}, ${college.state}</p>
                    <p class="description">Requires ~${college.minScore} percentile. Fees: ₹${new Intl.NumberFormat('en-IN').format(college.fees)}/year</p>
                </div>
                <div class="college-card-footer">
                    <span class="rating">⭐ ${college.rating.toFixed(1)}</span>
                    <a href="${college.link || '#'}" class="btn-details" target="_blank">View Details</a>
                </div>
            `;
            recommendationsGrid.appendChild(card);
        });
    }
});
