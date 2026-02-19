/**
 * Design System Tabs Functionality
 */
export function initDesignSystemTabs() {
  const tabButtons = document.querySelectorAll('.design-system-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Remove active class from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and its content
        this.classList.add('active');

        const tabId = `${this.dataset.tab}-tab`;
        const contentElement = document.getElementById(tabId);

        if (contentElement) {
          contentElement.classList.add('active');
        } else {
          console.warn(`Tab content not found for ID: ${tabId}`);
        }
      });
    });
  }
}
