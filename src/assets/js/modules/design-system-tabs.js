/**
 * Design System Tabs Functionality
 */
export function initDesignSystemTabs() {
  const tabsContainer = document.querySelector('.design-system-tabs-container');
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

          // Smooth scroll tab into view if container exists
          if (tabsContainer) {
            const containerWidth = tabsContainer.offsetWidth;
            const buttonOffset = this.offsetLeft;
            const buttonWidth = this.offsetWidth;

            tabsContainer.scrollTo({
              left: buttonOffset - (containerWidth / 2) + (buttonWidth / 2),
              behavior: 'smooth'
            });
          }
        } else {
          console.warn(`Tab content not found for ID: ${tabId}`);
        }
      });
    });

    // Handle initial scroll for active tab on load
    const initialActive = document.querySelector('.design-system-tabs .tab-btn.active');
    if (initialActive && tabsContainer) {
      setTimeout(() => {
        const containerWidth = tabsContainer.offsetWidth;
        const buttonOffset = initialActive.offsetLeft;
        const buttonWidth = initialActive.offsetWidth;

        tabsContainer.scrollTo({
          left: buttonOffset - (containerWidth / 2) + (buttonWidth / 2),
          behavior: 'smooth'
        });
      }, 100);
    }
  }
}

