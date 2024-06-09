// content.js
function copyToClipboard(text) {
  const input = document.createElement('textarea');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  input.value = text;
  document.body.appendChild(input);
  input.focus();
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copy') {
    copyToClipboard(request.text);
    sendResponse({status: 'success'});
  }
});