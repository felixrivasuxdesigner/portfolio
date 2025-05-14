// JourneyLaw Design System Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.design-system-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and its content
        this.classList.add('active');
        const tabId = `${this.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
});
