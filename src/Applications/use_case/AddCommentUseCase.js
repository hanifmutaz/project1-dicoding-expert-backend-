const NewComment = require('../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const newComment = new NewComment(useCasePayload);
    const { threadId } = newComment;

    const thread = await this._threadRepository.isThreadExist(threadId);
    if (!thread) {
      throw new Error('ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND');
    }

    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
