import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

class AddMediaViewModel {
  String? fileName;
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  PlatformFile? pickedMedia;

  Future<String> pickFile() async {
    FilePickerResult? result = await FilePicker.platform
        .pickFiles(type: FileType.media, allowMultiple: false);
    if (result != null) {
      pickedMedia = result.files.first;
      fileName = pickedMedia!.name;
      return "File selected: $fileName";
    } else {
      return 'No file selected.';
    }
  }

  Future<String> uploadMedia() async {
    if (pickedMedia == null) {
      return 'Please select a file!';
    }

    if (titleController.text.isEmpty) {
      return 'Please add a title!';
    }

    var dio = Dio();
    var formData = FormData();
    formData.fields
      ..add(MapEntry('title', titleController.text))
      ..add(MapEntry('description', descriptionController.text));

    formData.files.add(MapEntry(
      'file',
      await MultipartFile.fromFile(pickedMedia!.path!,
          filename: pickedMedia!.name),
    ));

    try {
      var response = await dio.post(
        'https://minly-task-jc4q.onrender.com/upload',
        data: formData,
        onSendProgress: (int sent, int total) {
          // This is optional, remove if you do not need progress logs
          print('sent: $sent total: $total');
        },
      );

      if (response.statusCode == 200) {
        return 'Upload successful!';
      } else {
        return 'Upload failed!';
      }
    } catch (e) {
      return 'An error occurred while uploading: $e';
    }
  }
}
