// content.js
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

chrome.runtime.onMessage.addListener((request, sendResponse) => {
  if (request.action === 'copy') {
    copyToClipboard(request.text);
    sendResponse({status: 'success'});
  }
});