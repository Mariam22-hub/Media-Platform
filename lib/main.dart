import 'package:flutter/material.dart';
import 'package:minly_app/screens/mediaPlatform_sceen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const MediaPlatformScreen(),
      theme: ThemeData.dark(),
      debugShowCheckedModeBanner: false,
    );
  }
}

