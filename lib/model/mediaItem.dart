class MediaItem {
  final String id;
  final String title;
  final String mediaUrl;
  final String filename;
  final String filePath;
  final bool liked;
  final DateTime createdAt;
  final DateTime updatedAt;

  MediaItem({
    required this.id,
    required this.title,
    required this.mediaUrl,
    required this.filename,
    required this.filePath,
    required this.liked,
    required this.createdAt,
    required this.updatedAt,
  });

  factory MediaItem.fromJson(Map<String, dynamic> json) {
    return MediaItem(
      id: json['_id'],
      title: json['title'],
      mediaUrl: json['mediaUrl'],
      filename: json['filename'],
      filePath: json['filePath'],
      liked: json['liked'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }
}
