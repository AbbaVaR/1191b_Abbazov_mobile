import * as bgHttp from "@nativescript/background-http";

// https://www.npmjs.com/package/@nativescript/background-http
// В случае возникновения проблем в ios https://github.com/jibon57/nativescript-mediafilepicker/issues/56
/*
  Отправляем файл локальный и получаем его путь на сервере
*/
const uploadFileAndGetDataFromServer = (
  localPath,
  url,
) => {
  return new Promise((resolve, reject) => {
    let file = localPath;
    let name = file.substr(file.lastIndexOf("/") + 1);
    let session = bgHttp.session("file-upload");
    const headers = {
      ...{ "Content-Type": "application/octet-stream"},
    };
    console.log(url);
    let request = {
      url: url,
      method: "POST",
      headers: headers,
      description: "Загрузка файла " + name,
      androidNotificationTitle: "Загрузка файла",
      androidDisplayNotificationProgress: true
    };

    let task = session.uploadFile(file, request);
    task.on("responded", r => {
      resolve(r.data);
    });

    function progressHandler(e) {
      console.log("uploaded " + e.currentBytes + " / " + e.totalBytes);
    }
    task.on("progress", progressHandler);

    task.on("error", e => {
      reject(e);
    });
  });
};

export default uploadFileAndGetDataFromServer;
