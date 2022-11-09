import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { FileService } from 'src/files/file.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel,
    private readonly fileService: FileService,
  ) {}

  async createPost(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);

    const postConfig = {
      uuid: v4(),
      ...createPostDto,
      image: fileName,
    };

    const post = await this.postRepository.create(postConfig);

    return post;
  }
}
