import 'package:flutter/material.dart';
import 'package:minly_app/viewModel/addMediaViewModel.dart';

class AddMediaScreen extends StatefulWidget {
  final VoidCallback onUploadSuccess;
  const AddMediaScreen({super.key, required this.onUploadSuccess});

  @override
  State<AddMediaScreen> createState() => _AddMediaScreenState();
}

class _AddMediaScreenState extends State<AddMediaScreen> {
  final AddMediaViewModel viewModel = AddMediaViewModel();

  void uploadFile(BuildContext context) async {
    String message = await viewModel.uploadMedia();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
    if (message == 'Upload successful!') {
      viewModel.fileName = null;
      widget.onUploadSuccess();
       setState(() {});
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
            controller: viewModel.titleController,
            decoration: InputDecoration(hintText: "Title"),
          ),
          const SizedBox(height: 20),
          TextField(
            controller: viewModel.descriptionController,
            decoration: const InputDecoration(hintText: "Description"),
            keyboardType: TextInputType.multiline,
            maxLength: 200,
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () async {
              await viewModel.pickFile();
              setState(() {});
            },
            child: const Text('Pick Media'),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: () => uploadFile(context),
            child: const Text('Upload'),
          ),
          const SizedBox(height: 20),
          if (viewModel.fileName != null)
              ListTile(
                title: const Text('Selected File:'),
                subtitle: Text(viewModel.fileName!),
                leading: const Icon(Icons.file_present),
              ),
        ],
      ),
    );
  }
}


