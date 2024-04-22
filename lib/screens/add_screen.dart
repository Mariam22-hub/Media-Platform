import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:dio/dio.dart';
import 'dart:io';

class AddMediaScreen extends StatefulWidget {
  final VoidCallback onUploadSuccess;
  const AddMediaScreen({super.key, required this.onUploadSuccess});

  @override
  State<AddMediaScreen> createState() => _AddMediaScreenState();
}

class _AddMediaScreenState extends State<AddMediaScreen> {
  String? _fileName;
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  PlatformFile? pickedMedia;

  void pickFile() async {
    FilePickerResult? result = await FilePicker.platform
        .pickFiles(type: FileType.media, allowMultiple: false);
    if (result != null) {
      setState(() {
        pickedMedia = result.files.first;
        _fileName = pickedMedia!.name;
      });
    } else {
      print('No file selected.');
    }
  }

  Future<void> uploadHandler() async {
    if (pickedMedia == null) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Please select a file!'),
        duration: Duration(seconds: 2),
      ));
      return;
    }

    if (titleController.text == "") {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Please add a title!'),
        duration: Duration(seconds: 2),
      ));
      return;
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
          print('sent: $sent total: $total');
        },
      );

      if (response.statusCode == 200) {
        // widget.onUploadSuccess();
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Upload successful!'),
          duration: Duration(seconds: 2),
          
        ));
        widget.onUploadSuccess();
      } 
      else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Upload failed!'),
          duration: Duration(seconds: 2),
        ));
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('An error occurred while uploading'),
        duration: Duration(seconds: 2),
      ));
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Upload Media"),
        centerTitle: true,
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          TextField(
            controller: titleController,
            decoration: InputDecoration(hintText: "Title"),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: descriptionController,
            decoration: const InputDecoration(hintText: "Description"),
            keyboardType: TextInputType.multiline,
            maxLength: 200,
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: pickFile,
            child: const Text('Pick Media'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: uploadHandler,
            child: const Text('Upload'),
          ),
          const SizedBox(height: 20),
          if (_fileName != null)
            ListTile(
              title: Text('Selected File:'),
              subtitle: Text(_fileName!),
              leading: Icon(Icons.file_present),
            ),
        ],
      ),
    );
  }
}
