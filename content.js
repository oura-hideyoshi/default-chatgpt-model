const P = {
  QUERY_PARAM_NAME: "model",
  LOCAL_STORAGE_KEY: "default_gpt_model",
  __NEXT_DATA__: "__NEXT_DATA__",
};

function main() {
  const idealModelName = loadModelName();
  console.log("idealModelName", idealModelName);
  const currentModelName = getCurrentModelName();
  console.log("currentModelName", currentModelName);

  if (
    idealModelName != currentModelName &&
    new URL(location.href).pathname == "/"
  ) {
    location.replace(`/?${P.QUERY_PARAM_NAME}=${idealModelName}`);
  }

  // TODO: new chatにhref載せる方法
  document.addEventListener("load", function () {
    const newChatAnchor = getNewChatTabElm();
    console.log("newChatAnchor", newChatAnchor);
    if (newChatAnchor)
      newChatAnchor.setAttribute(
        "href",
        `/${QUERY_PARAM_NAME}=${idealModelName}`
      );
  });

  // TODO: model変更した際にlocal storageを変更する
}

/**
 *
 * @returns {string}
 */
function getCurrentModelName() {
  const el = document.getElementById(P.__NEXT_DATA__);
  const nextData = JSON.parse(el.innerText);

  // CHECK: this object perhaps change
  return nextData.query.model;
}

/**
 * @param {String} modelName
 */
function saveModelName(modelName) {
  localStorage.setItem(P.LOCAL_STORAGE_KEY, modelName);
}

function loadModelName() {
  return localStorage.getItem(P.LOCAL_STORAGE_KEY);
}

function getNewChatTabElm() {
  var aTags = document.getElementsByTagName("a");

  let el = null;
  if (aTags[0].innerText == "New chat") {
    el = aTags[0];
  }

  return el;
}

main();
