import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import { config } from './config';
import { uploadToS3 } from './aws';

export interface StreamingJob {
  id: string;
  inputPath: string;
  outputDir: string;
  s3Prefix: string;
  masterPlaylistUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export class VideoStreamer {
  private jobs: Map<string, StreamingJob> = new Map();

  async createStreamingJob(inputPath: string): Promise<StreamingJob> {
    // Generate unique ID for the job
    const jobId = uuidv4();
    const outputDir = path.join(config.tempDir, jobId);
    
    // Create directory for output files
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const job: StreamingJob = {
      id: jobId,
      inputPath,
      outputDir,
      s3Prefix: `videos/${jobId}`,
      status: 'pending'
    };

    this.jobs.set(jobId, job);
    
    try {
      // Start processing the job
      this.processJob(job);
    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : String(error);
    }

    return job;
  }

  getJob(jobId: string): StreamingJob | undefined {
    return this.jobs.get(jobId);
  }

  getAllJobs(): StreamingJob[] {
    return Array.from(this.jobs.values());
  }

  private async processJob(job: StreamingJob): Promise<void> {
    job.status = 'processing';
    
    try {
      // Create HLS segments and playlists
      await this.createHlsStream(job);
      
      // Upload all generated files to S3
      await this.uploadHlsToS3(job);

      // Clean up local files
      this.cleanup(job);
      
      job.status = 'completed';
    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : String(error);
      console.error(`Job ${job.id} failed:`, job.error);
    }
  }

  private createHlsStream(job: StreamingJob): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(job.inputPath)
        .outputOptions([
          '-codec: copy',
          '-start_number 0',
          '-hls_time ' + config.hls.segmentDuration,
          '-hls_list_size 0',
          '-f hls'
        ])
        .output(path.join(job.outputDir, 'master.m3u8'))
        .on('end', () => {
          console.log(`HLS conversion completed for job ${job.id}`);
          resolve();
        })
        .on('error', (err) => {
          console.error(`Error during HLS conversion for job ${job.id}:`, err);
          reject(err);
        })
        .run();
    });
  }

  private async uploadHlsToS3(job: StreamingJob): Promise<void> {
    const files = fs.readdirSync(job.outputDir);
    
    for (const file of files) {
      const filePath = path.join(job.outputDir, file);
      const s3Key = `${job.s3Prefix}/${file}`;
      
      const fileUrl = await uploadToS3(filePath, s3Key);
      
      // Store the URL of the master playlist
      if (file === 'master.m3u8') {
        job.masterPlaylistUrl = fileUrl;
      }
    }
  }

  private cleanup(job: StreamingJob): void {
    fs.rmSync(job.outputDir, { recursive: true, force: true });
  }
}
