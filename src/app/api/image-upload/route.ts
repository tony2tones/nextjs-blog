import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

type UploadResult = {
  public_id: string;
  format: string;
  version: number;
  source_url?: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const userId = formData.get('userId');

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 400 });
  }

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const uploadResult = await new Promise<UploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'user_profile', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadResult);
        }
      );
      stream.end(buffer);
    });

    const savedImage = await prisma.image.upsert({
       where: {
        userId,
      },
      update: {
        publicId: uploadResult.public_id,
        format: uploadResult.format,
        version: uploadResult.version.toString(),
      },
      create: {
        publicId: uploadResult.public_id,
        format: uploadResult.format,
        version: uploadResult.version.toString(),
        userId,
      },
    });

    return NextResponse.json({
      message: 'Upload successful',
      image: savedImage,
      url: uploadResult.source_url,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Upload failed:', error.message || error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
