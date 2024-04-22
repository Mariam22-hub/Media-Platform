import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:minly_app/mediaItem.dart';
import 'package:minly_app/screens/add_screen.dart';
import 'package:minly_app/screens/video_player.dart';
import 'package:cached_network_image/cached_network_image.dart';
// import 'package:pretty_dio_logger/pretty_dio_logger.dart';
// import 'package:video_player/video_player.dart';

class MediaPlatformScreen extends StatefulWidget {
  const MediaPlatformScreen({super.key});

  @override
  State<MediaPlatformScreen> createState() => _MediaPlatformScreenState();
}

class _MediaPlatformScreenState extends State<MediaPlatformScreen> with WidgetsBindingObserver{
  List<MediaItem> mediaList = [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    fetchMedia();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      fetchMedia(); // Refresh the list whenever the app is resumed
    }
  }
  

  Future<void> fetchMedia() async {
    try {
      final Dio _dio = Dio();
      var response = await _dio.get('https://minly-task-jc4q.onrender.com');
      // print(response.statusCode);
      // print(response.data);

      if (response.statusCode == 200) {
        setState(() {
          mediaList = (response.data['data']['result']['data'] as List)
              .map((item) => MediaItem.fromJson(item))
              .toList();
        });
        // print(mediaList[0]);
      } else {
        throw Exception('Failed to fetch data');
      }
    } catch (e) {
      print('Error fetching media: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error fetching media: $e')),
      );
    }
  }

  Future<void> toggleLike(String id) async {
    final Dio _dio = Dio();
    try {
      var response =
          await _dio.put('https://minly-task-jc4q.onrender.com/toggle/$id');
      if (response.statusCode == 200) {
        fetchMedia(); // Refresh the media list after toggling the like
      } else {
        throw Exception('Failed to toggle like');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error toggling like: $e')),
      );
    }
  }

  Future<void> deleteMedia(String id) async {
    final Dio _dio = Dio();
    try {
      var response =
          await _dio.delete('https://minly-task-jc4q.onrender.com/delete/$id');
      if (response.statusCode == 200) {
        fetchMedia(); // Refresh the media list after deleting
      } else {
        throw Exception('Failed to delete media');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error deleting media: $e')),
      );
    }
  }

Widget buildTrailingIcons(MediaItem media) {
    return Row(
      mainAxisSize: MainAxisSize
          .min, // This ensures the row only takes as much space as needed.
      children: [
        IconButton(
          icon: Icon(media.liked ? Icons.favorite : Icons.favorite_border),
          color: media.liked ? Colors.red : null,
          onPressed: () => toggleLike(media.id),
        ),
        PopupMenuButton<String>(
          onSelected: (value) {
            if (value == 'Delete') {
              deleteMedia(media.id);
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

@override
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Media Platform"), centerTitle: true),
      body: ListView.builder(
        addAutomaticKeepAlives: true,
        itemCount: mediaList.length,
        itemBuilder: (context, index) {
          var media = mediaList[index];
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
      floatingActionButton: FloatingActionButton.extended(
        onPressed: navigateToAddMediaScreen,
        label: Text("Upload Media"),
        icon: Icon(Icons.cloud_upload),
        elevation: 10,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  void refreshMediaList() {
    fetchMedia();
  }

  void navigateToAddMediaScreen() {
    final route = MaterialPageRoute(
      builder: (context) => AddMediaScreen(onUploadSuccess: refreshMediaList),
    );
    Navigator.push(context, route)
        .then((_) => refreshMediaList()); // Optionally refresh on return
  }
}


Widget mediaWidget(String url) {
  if (url.contains('.mp4') || url.contains('.mov')) {
    return videoWidget(url);
  } else {
    return CachedNetworkImage(
      imageUrl: url,
      key: ValueKey(url), // Unique key for caching
      fit: BoxFit.cover,
      placeholder: (context, url) => CircularProgressIndicator(),
      errorWidget: (context, url, error) => Icon(Icons.error),
    );
  }
}


// Widget to display videos
Widget videoWidget(String url) {
  return VideoPlayerScreen(url: url);
}
