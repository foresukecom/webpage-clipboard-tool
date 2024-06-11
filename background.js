chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "parent",
    title: "ページ情報コピー",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copyMarkdown",
    parentId: "parent",
    title: "Markdown link",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copyTitleAndURL",
    parentId: "parent",
    title: "タイトル[改行]URL",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copyTitle",
    parentId: "parent",
    title: "タイトル",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copyURL",
    parentId: "parent",
    title: "URL",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copyURLWithoutQuery",
    parentId: "parent",
    title: "URL(クエリ文字列除去)",
    contexts: ["page"]
  });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyTitle") {
    const text = tab.title;
    copyTextToClipboard(tab.id, text);
  } else if (info.menuItemId === "copyURL") {
    const text = tab.url;
    copyTextToClipboard(tab.id, text);
  } else if (info.menuItemId === "copyMarkdown") {
    const text = `[${tab.title}](${tab.url})`;
    copyTextToClipboard(tab.id, text);
  } else if (info.menuItemId === "copyTitleAndURL") {
    const text = `${tab.title}\n${tab.url}`;
    copyTextToClipboard(tab.id, text);
  } else if (info.menuItemId === "copyURLWithoutQuery") {
    const urlWithoutQuery = tab.url.split('?')[0];
    copyTextToClipboard(tab.id, urlWithoutQuery);
  }
});

function copyTextToClipboard(tabId, text) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: (text) => {
      const input = document.createElement('textarea');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('Copy');
      document.body.removeChild(input);
    },
    args: [text]
  });
}