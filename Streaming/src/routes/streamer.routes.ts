import { Router } from "express";
import multer from "multer";
import { config } from "../config/config";
import { VideoStreamer } from "../services/streamer.service";

const streamerRouter = Router()
const upload = multer({ dest: config.tempDir });
const streamer = new VideoStreamer();


// const profileController = container.get<ProfileController>(
//     TOKENS.ProfileController,
//   );

streamerRouter.post('/videos', upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
      }
  
      const job = await streamer.createStreamingJob(req.file.path);
      res.status(202).json(job);
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ error: 'Failed to process video upload' });
    }
  });
  
  // Get information about a specific streaming job
  streamerRouter.get('/videos/:jobId', (req, res) => {
    const job = streamer.getJob(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  });
  
  // Get all streaming jobs
  streamerRouter.get('/videos', (req, res) => {
    const jobs = streamer.getAllJobs();
    res.json(jobs);
  });

  export default streamerRouter