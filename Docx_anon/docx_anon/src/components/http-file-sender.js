import * as bgHttp from "@nativescript/background-http";

// https://www.npmjs.com/package/@nativescript/background-http

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
    let uploadParams = [
      {
        name: "file",
        filename: file
      }
    ];

    let task = session.multipartUpload(uploadParams, request);
    task.on("responded", r => {
      resolve(r.data);
    });

    task.on("error", e => {
      reject(e);
    });
  });
};

export default uploadFileAndGetDataFromServer;
