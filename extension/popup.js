// Popup script to manage hide preferences
const HIDE_PREFS_KEY = 'sentimentHidePrefs';

const checkboxes = {
  positive: document.getElementById('hidePositive'),
  neutral: document.getElementById('hideNeutral'),
  negative: document.getElementById('hideNegative')
};

const resetBtn = document.getElementById('resetBtn');

// Load saved preferences on popup open
async function loadPreferences() {
  chrome.storage.local.get([HIDE_PREFS_KEY], (result) => {
    const prefs = result[HIDE_PREFS_KEY] || { positive: false, neutral: false, negative: false };
    checkboxes.positive.checked = prefs.positive;
    checkboxes.neutral.checked = prefs.neutral;
    checkboxes.negative.checked = prefs.negative;
  });
}

// Save preferences when any checkbox changes
function setupCheckboxListeners() {
  Object.entries(checkboxes).forEach(([sentiment, checkbox]) => {
    checkbox.addEventListener('change', () => {
      const prefs = {
        positive: checkboxes.positive.checked,
        neutral: checkboxes.neutral.checked,
        negative: checkboxes.negative.checked
      };
      
      chrome.storage.local.set({ [HIDE_PREFS_KEY]: prefs }, () => {
        // Notify all tabs to update visibility
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
              type: 'updateHidePrefs',
              prefs: prefs
            }).catch(() => {
              // Tab may not have content script, ignore error
            });
          });
        });
      });
    });
  });
}

// Reset all checkboxes
resetBtn.addEventListener('click', () => {
  const defaultPrefs = { positive: false, neutral: false, negative: false };
  chrome.storage.local.set({ [HIDE_PREFS_KEY]: defaultPrefs }, () => {
    checkboxes.positive.checked = false;
    checkboxes.neutral.checked = false;
    checkboxes.negative.checked = false;
    
    // Notify all tabs to update visibility
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'updateHidePrefs',
          prefs: defaultPrefs
        }).catch(() => {
          // Tab may not have content script, ignore error
        });
      });
    });
  });
});

// Initialize
loadPreferences();
setupCheckboxListeners();
