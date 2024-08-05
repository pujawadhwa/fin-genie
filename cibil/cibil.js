// Initialize Chart.js instance for the semi-circle gauge
let ctx = document.getElementById('cibilChart').getContext('2d');
let cibilChart = new Chart(ctx, {
    type: 'doughnut', // Change to doughnut chart (semi-circle)
    data: {
        labels: ['CIBIL Score', 'Remaining'],
        datasets: [{
            data: [0, 1000], // Example data (adjust as needed)
            backgroundColor: ['#3498db', '#00000'], // Blue for score, Grey for remaining
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutoutPercentage: 60, // Adjusts the size of the hole in the center of the gauge
        rotation: -Math.PI, // Starts from the bottom
        circumference: Math.PI, // Half circle
        tooltips: { enabled: false },
        legend: { display: false },
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        animation: {
            animateRotate: false,
            animateScale: true
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
});

// Function to fetch data from API and update the gauge
async function calculateScore() {
    let panNumber = document.getElementById('pan').value.trim().toUpperCase();
    if (!panNumber) {
        alert('Please enter a PAN number.');
        return;
    }

    try {
        // Simulating API response with random score (for demonstration)
        const randomScore = Math.floor(Math.random() * (1000 - 300 + 1)) + 300; // Random score between 300 and 1000
        const response = {
            score: randomScore
        };

        // Replace with actual fetch call to your API endpoint
        // const response = await fetch(`https://api.example.com/cibilscore?pan=${panNumber}`);
        // const data = await response.json();

        // Assuming API returns JSON with a score field
        const data = response;
        if (data.score !== undefined) {
            document.getElementById('result').innerText = `Your CIBIL Score is: ${data.score}`;

            // Update doughnut chart data
            cibilChart.data.datasets[0].data = [data.score, 1000 - data.score];
            // Change chart color based on score
            if (data.score < 500) {
                cibilChart.data.datasets[0].backgroundColor[0] = '#e74c3c'; // Red for low scores
            } else if (data.score < 700) {
                cibilChart.data.datasets[0].backgroundColor[0] = '#f1c40f'; // Yellow for moderate scores
            } else {
                cibilChart.data.datasets[0].backgroundColor[0] = '#2ecc71'; // Green for good scores
            }
            cibilChart.update();
        } else {
            document.getElementById('result').innerText = 'Unable to fetch CIBIL Score.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerText = 'Error fetching data. Please try again later.';
    }
}

// Attach click event listener to the Calculate Score button
document.getElementById('calculateBtn').addEventListener('click', calculateScore);

// Navigation button functions
function goToDashboard() {
   
    window.location.href = "/hacky/Monances/pages/Dashboard/dashboard.html";
}

function goToAbout() {
   
    window.location.href = "/landingpage.html";
}

function goToContact() {
 
    window.location.href = "/landingpage.html#target-section";
}
