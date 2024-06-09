chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyPageInfo",
    title: "Copy Page Info as Markdown",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyPageInfo") {
    const markdownLink = `[${tab.title}](${tab.url})`;
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    }, () => {
      chrome.tabs.sendMessage(tab.id, {action: 'copy', text: markdownLink}, (response) => {
        if (response && response.status === 'success') {
          console.log('Copied to clipboard');
        } else {
          console.error('Failed to copy');
        }
      });
    });
  }
});