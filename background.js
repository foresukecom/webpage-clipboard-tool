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
    copyToClipboard(markdownLink);
  }
});

function copyToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}