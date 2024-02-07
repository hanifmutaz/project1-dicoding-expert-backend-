const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');


describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Test-Thread',
      body: 'Test-Body',
      owner: 'user-123',
    };
    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });
    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockAddedThread));
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const expectedAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });
    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);
    // Assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(useCasePayload);
  });
});