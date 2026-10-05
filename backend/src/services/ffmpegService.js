import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export const assembleVideo = (scenes, outputPath) => {
  return new Promise((resolve, reject) => {
    let command = ffmpeg();
    
    // Add all video inputs
    scenes.forEach(scene => {
      command = command.input(scene.videoPath);
    });

    // We want to create dynamic zoom (Ken Burns) and hardcoded captions.
    // For simplicity, we create a complex filter graph.
    let complexFilter = [];
    let audioInputs = [];

    scenes.forEach((scene, index) => {
      // 1. Ken Burns Effect: dynamic zoom
      // 2. Crop to shorts format (9:16)
      // 3. Draw text (hardcoded captions)
      const sanitizedText = scene.text.replace(/'/g, "\\'").replace(/:/g, '\\:');
      
      const filter = `[${index}:v]scale=1080x1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='zoom+0.001':d=25*5:s=1080x1920,drawtext=text='${sanitizedText}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2+200:box=1:boxcolor=black@0.5:boxborderw=10[v${index}];`;
      
      complexFilter.push(filter);
      
      // We will just concatenate the processed videos.
    });

    // Concat videos
    const concatVideoInputs = scenes.map((_, index) => `[v${index}]`).join('');
    complexFilter.push(`${concatVideoInputs}concat=n=${scenes.length}:v=1:a=0[outv]`);

    // In a full production app we would also concat audio streams and map them.
    // Assuming audio is handled or muted if we use a background track. 
    // Here we will map the output video.
    
    command
      .complexFilter(complexFilter.join(' '))
      .outputOptions(['-map [outv]'])
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => {
        console.error('FFmpeg Error:', err);
        reject(err);
      });
  });
};
