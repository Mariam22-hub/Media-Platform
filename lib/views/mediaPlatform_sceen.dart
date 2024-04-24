import 'package:flutter/material.dart';
import 'package:minly_app/model/mediaItem.dart';
import 'package:minly_app/viewModel/mediaPlatformViewModel.dart';
import 'package:minly_app/views/addMedia_screen.dart';
import 'package:minly_app/views/video_player.dart';
import 'package:cached_network_image/cached_network_image.dart';

class MediaPlatformScreen extends StatefulWidget {
  const MediaPlatformScreen({super.key});

  @override
  State<MediaPlatformScreen> createState() => _MediaPlatformScreenState();
}

class _MediaPlatformScreenState extends State<MediaPlatformScreen>
    with WidgetsBindingObserver {
  final MediaPlatformViewModel viewModel = MediaPlatformViewModel();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    refreshMediaList();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      refreshMediaList(); // Refresh the list whenever the app is resumed
    }
  }

  void refreshMediaList() {
    viewModel.fetchMedia().then((_) {
      setState(() {}); // Refresh UI after fetching media
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error.toString())),
      );
    });
  }

  void navigateToAddMediaScreen() {
    final route = MaterialPageRoute(
      builder: (context) => AddMediaScreen(onUploadSuccess: refreshMediaList),
    );
    Navigator.push(context, route).then((_) => refreshMediaList());
  }

  void deleteFile(BuildContext context, String id) async {
    print("in delete file");
    String message = await viewModel.deleteMedia(id);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
    refreshMediaList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Media Platform"), centerTitle: true),
      body: Padding(
        padding: const EdgeInsets.only(bottom: 80), // Adjust padding as needed
        child: ListView.builder(
          addAutomaticKeepAlives: true,
          itemCount: viewModel.mediaList.length,
          itemBuilder: (context, index) {
            var media = viewModel.mediaList[index];
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Card(
                child: Column(
                  children: [
                    mediaWidget(media.mediaUrl),
                    ListTile(
                      leading: Icon(media.mediaUrl.contains('.mp4')
                          ? Icons.video_library
                          : Icons.image),
                      title: Text(media.title),
                      trailing: buildTrailingIcons(media),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: navigateToAddMediaScreen,
        label: const Text("Upload Media"),
        icon: const Icon(Icons.cloud_upload),
        elevation: 10,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  Widget buildTrailingIcons(MediaItem media) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        IconButton(
          icon: Icon(media.liked ? Icons.favorite : Icons.favorite_border),
          color: media.liked ? Colors.red : null,
          onPressed: () {
            viewModel.toggleLike(media.id).then((_) {
              setState(() {});
            }).catchError((error) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(error.toString())),
              );
            });
          },
        ),
        PopupMenuButton<String>(
          onSelected: (value) {
            if (value == 'Delete') {
              deleteFile(context, media.id);
            }
          },
          itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
            const PopupMenuItem<String>(
              value: 'Delete',
              child: Text('Delete Media'),
            ),
          ],
        ),
      ],
    );
  }

  Widget mediaWidget(String url) {
    if (url.contains('.mp4') || url.contains('.mov')) {
      return VideoPlayerScreen(url: url);
    } else {
      return CachedNetworkImage(
        imageUrl: url,
        key: ValueKey(url),
        fit: BoxFit.cover,
        placeholder: (context, url) => const CircularProgressIndicator(),
        errorWidget: (context, url, error) => const Icon(Icons.error),
      );
    }
  }
}
