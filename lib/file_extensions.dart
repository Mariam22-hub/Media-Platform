import 'dart:io';

enum _FileType {
  video,
  image,
  unknown;
}

extension FileTypeChecker on File {
  _FileType _getFileType() {
    final extension = path.split('.').last.toLowerCase();

    switch (extension) {
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'm4v':
      case '3gp':
        return _FileType.video;

      case 'jpg':
      case 'jpeg':
      case 'png':
        return _FileType.image;

      default:
        return _FileType.unknown;
    }
  }

  _FileType get fileType => _getFileType();
}
