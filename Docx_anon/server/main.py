import os
import uuid
from flask import Flask, request, abort, send_from_directory
from werkzeug.utils import secure_filename
import anonymizer
import zipfile


UPLOAD_FOLDER = './temp'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        name = secure_filename(f.filename)
        f.save(name)
        try:
            zipfile.ZipFile(name).extractall('./temp')
        except Exception:
            return 'file uploaded fail'
        return 'file uploaded successfully'


@app.route('/file', methods=['POST'])
def upload_files():
    file = request.files['file']
    filename = secure_filename(file.filename)

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    path = '/temp' + filename
    file_uuid = str(uuid.uuid4())
    try:
        anonymizer.doc_anon(path, file_uuid)
    except Exception:
        abort(422, description='file not valid')
    return '/download/' + file_uuid


@app.route('/download/<string:file>', methods=['GET'])
def get_language_file(language):
    remove_old_files("./temp/")
    return send_from_directory('./temp/file', language + '.docx')


def get_files(path):
    files = []
    directory = os.listdir(path)
    directory.sort(reverse=True)
    for file in directory:
        files.append(file)
    return files


def remove_old_files(path):
    max_files = 10
    files = get_files(path)
    if len(files) < max_files:
        return
    i = 0
    for f in files:
        i += 1
        if i > max_files:
            os.remove(os.path.join(path, f))


if __name__ == '__main__':
    app.run('192.168.1.125', port=8000)
