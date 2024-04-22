import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

class VideoPlayerScreen extends StatefulWidget {
  final String url;

  const VideoPlayerScreen({Key? key, required this.url}) : super(key: key);

  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<VideoPlayerScreen> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    // Convert the string URL to a Uri
    Uri videoUri = Uri.parse(widget.url);
    _controller = VideoPlayerController.networkUrl(videoUri)
      ..initialize().then((_) {
        setState(() {});
        // _controller.play();
      });
  }

  @override
  Widget build(BuildContext context) {
    if (_controller.value.isInitialized) {
      return GestureDetector(
        onTap: () {
          setState(() {
            if (_controller.value.isPlaying) {
              _controller.pause();
            } else {
              _controller.play();
            }
          });
        },
        child: AspectRatio(
          aspectRatio: _controller.value.aspectRatio,
          child: VideoPlayer(_controller),
        ),
      );
    } else {
      return Center(child: CircularProgressIndicator());
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
