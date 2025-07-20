// YouTube Clone JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const hamburgerMenu = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const videoCards = document.querySelectorAll('.video-card');

    // Search functionality
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch();
    });

    // Handle search function
    function handleSearch() {
        const query = searchInput.value.trim();
        
        if (query === '') {
            showErrorMessage('Please enter a search term');
            return;
        }

        // Clear any existing error messages
        hideErrorMessage();
        
        // Simulate search (in a real app, this would make an API call)
        console.log('Searching for:', query);
        
        // Show search feedback
        showSearchFeedback(query);
        
        // Clear the search input
        searchInput.value = '';
    }

    // Show error message
    function showErrorMessage(message) {
        // Remove existing error message if any
        hideErrorMessage();
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        
        // Insert error message after search form
        const headerCenter = document.querySelector('.header-center');
        headerCenter.appendChild(errorDiv);
        
        // Auto-hide error message after 3 seconds
        setTimeout(() => {
            hideErrorMessage();
        }, 3000);
    }

    // Hide error message
    function hideErrorMessage() {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Show search feedback
    function showSearchFeedback(query) {
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.innerHTML = `
                <h2>Search Results for "${query}"</h2>
                <p>Here are some videos related to your search. In a real YouTube app, this would show actual search results.</p>
            `;
        }
    }

    // Hamburger menu functionality for mobile
    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        
        // Add animation to hamburger menu
        this.classList.toggle('active');
    });

    // Navigation link functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the navigation text
            const navText = this.querySelector('.nav-text').textContent;
            
            // Update main content based on navigation
            updateMainContent(navText);
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Update main content based on navigation
    function updateMainContent(section) {
        const welcomeMessage = document.querySelector('.welcome-message');
        const videoGrid = document.querySelector('.video-grid');
        
        switch(section) {
            case 'Home':
                welcomeMessage.innerHTML = `
                    <h2>Try searching to get started</h2>
                    <p>Start watching videos to help us build a feed of videos you'll love.</p>
                `;
                videoGrid.style.display = 'grid';
                break;
            case 'Shorts':
                welcomeMessage.innerHTML = `
                    <h2>Shorts</h2>
                    <p>Discover short-form videos from creators around the world.</p>
                `;
                videoGrid.style.display = 'none';
                break;
            case 'Subscriptions':
                welcomeMessage.innerHTML = `
                    <h2>Subscriptions</h2>
                    <p>Stay up to date with your favorite channels. Sign in to see your subscriptions.</p>
                `;
                videoGrid.style.display = 'none';
                break;
            case 'You':
                welcomeMessage.innerHTML = `
                    <h2>Your Channel</h2>
                    <p>Manage your channel, videos, and account settings.</p>
                `;
                videoGrid.style.display = 'none';
                break;
            case 'History':
                welcomeMessage.innerHTML = `
                    <h2>Watch History</h2>
                    <p>Keep track of what you watch. Your watch history helps us recommend videos you might like.</p>
                `;
                videoGrid.style.display = 'none';
                break;
            default:
                welcomeMessage.innerHTML = `
                    <h2>Try searching to get started</h2>
                    <p>Start watching videos to help us build a feed of videos you'll love.</p>
                `;
                videoGrid.style.display = 'grid';
        }
    }

    // Video card click functionality
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoTitle = this.querySelector('.video-title').textContent;
            console.log('Playing video:', videoTitle);
            
            // Simulate video play (in a real app, this would navigate to video page)
            alert(`Playing: ${videoTitle}\n\nIn a real YouTube app, this would open the video player.`);
        });

        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        // Close sidebar on desktop view
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes sidebar on mobile
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
        
        // Enter key on search input triggers search
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            e.preventDefault();
            handleSearch();
        }
    });

    // Sign in button functionality
    const signInBtn = document.querySelector('.sign-in-btn');
    signInBtn.addEventListener('click', function() {
        console.log('Sign in clicked');
        alert('Sign In functionality would be implemented here.\n\nIn a real YouTube app, this would open the authentication flow.');
    });

    // Initialize the page
    function initializePage() {
        console.log('YouTube Clone initialized successfully');
        
        // Set focus to search input for better UX
        searchInput.focus();
        
        // Add loading animation to video thumbnails
        const thumbnails = document.querySelectorAll('.video-thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            setTimeout(() => {
                thumbnail.style.opacity = '1';
                thumbnail.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Call initialization
    initializePage();

    // Error handling for any uncaught errors
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        showErrorMessage('Something went wrong. Please try again.');
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce
    };
}
