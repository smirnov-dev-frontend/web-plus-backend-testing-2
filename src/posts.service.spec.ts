import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      expect(postsService.findMany().map(({ text }) => text)).toEqual(
        posts.map(({ text }) => text),
      );
    });

    it('should return correct posts for skip and limit options', () => {
      expect(
        postsService.findMany({ skip: 1, limit: 2 }).map(({ text }) => text),
      ).toEqual(['Post 2', 'Post 3']);
    });

    it('should return all posts if called with empty options', () => {
      expect(postsService.findMany({})).toHaveLength(posts.length);
    });

    it('should skip posts if only skip option is passed', () => {
      expect(
        postsService.findMany({ skip: 2 }).map(({ text }) => text),
      ).toEqual(['Post 3', 'Post 4']);
    });

    it('should limit posts if only limit option is passed', () => {
      expect(
        postsService.findMany({ limit: 3 }).map(({ text }) => text),
      ).toEqual(['Post 1', 'Post 2', 'Post 3']);
    });

    it('should return all posts if skip is 0', () => {
      expect(postsService.findMany({ skip: 0 })).toHaveLength(posts.length);
    });

    it('should return empty array if limit is 0', () => {
      expect(postsService.findMany({ limit: 0 })).toEqual([]);
    });

    it('should return empty array if skip exceeds posts count', () => {
      expect(postsService.findMany({ skip: 10 })).toEqual([]);
    });

    it('should return all posts if limit exceeds posts count', () => {
      expect(postsService.findMany({ limit: 10 })).toHaveLength(posts.length);
    });

    it('should return remaining posts if skip + limit exceeds posts count', () => {
      expect(
        postsService.findMany({ skip: 3, limit: 5 }).map(({ text }) => text),
      ).toEqual(['Post 4']);
    });
  });
});
