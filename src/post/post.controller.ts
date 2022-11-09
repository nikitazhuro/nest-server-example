import {
  Body,
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { Role } from 'src/auth/auth-roles.decorator';
import { AuthRoleGuard } from 'src/auth/auth-roles.guard';
import { CreatePostDto } from './dto/createPost.dto';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, AuthRoleGuard)
  @Role('admin')
  @Post('create')
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image: any) {
    console.log(image);
    const post = this.postService.createPost(postDto, image);
    return post;
  }
}
