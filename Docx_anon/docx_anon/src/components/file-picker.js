import { Mediafilepicker,} from "nativescript-mediafilepicker";

const filePicker = () => {
  let options = {
    android: {
      extensions: ['zip',],
      maxNumberFiles: 1
    },
    ios: {
      extensions: ['docx',],
      multipleSelection: false
    }
  };

  let mediafilepicker = new Mediafilepicker();
  mediafilepicker.openFilePicker(options);

  return new Promise((resolve, reject) => {
    let type = "success";
    mediafilepicker.on("getFiles", function(res) {
      let results = res.object.get("results");
      resolve({
        type,
        results
      });
    });

    mediafilepicker.on("error", function(res) {
      type = "error";
      let msg = res.object.get("msg");
      reject({
        type,
        msg
      });
    });

    mediafilepicker.on("cancel", function(res) {
      let msg = res.object.get("msg");
      type = "cancel";
      reject({
        type,
        msg
      });
    });
  });
};

export default filePicker;
