import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:minly_app/model/mediaItem.dart';

class MediaPlatformViewModel {
  final Dio _dio = Dio();
  List<MediaItem> mediaList = [];

  Future<void> fetchMedia() async {
    try {
      var response = await _dio.get('https://minly-task-jc4q.onrender.com');
      if (response.statusCode == 200) {
        mediaList = (response.data['data']['result']['data'] as List)
            .map((item) => MediaItem.fromJson(item))
            .toList();
      } else {
        throw Exception('Failed to fetch data');
      }
    } catch (e) {
      throw Exception('Error fetching media: $e');
    }
  }

  Future<void> toggleLike(String id) async {
    try {
      var response =
          await _dio.put('https://minly-task-jc4q.onrender.com/toggle/$id');
      if (response.statusCode == 200) {
        await fetchMedia(); // Refresh the media list after toggling the like
      } else {
        throw Exception('Failed to toggle like');
      }
    } catch (e) {
      throw Exception('Error toggling like: $e');
    }
  }

  Future<String> deleteMedia(String id) async {
    try {
      print("in delete media");
      var response =
          await Dio().delete('https://minly-task-jc4q.onrender.com/delete/$id');
      if (response.statusCode == 200) {
        return 'Media deleted successfully';
      } else {
        return 'Failed to delete media';
      }
    } catch (e) {
      return 'Error deleting media: $e';
    }
  }
}
