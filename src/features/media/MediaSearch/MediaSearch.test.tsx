import { createMediaSearchSutBuilder, MediaSearchSut } from './MediaSearch.sut';

describe('Components > MediaSearch', () => {
  const sutBuilder = createMediaSearchSutBuilder();
  let sut: MediaSearchSut;

  beforeEach(() => {
    sut = sutBuilder.build();
  });

  test('Given movies and series are provided, When the component renders, Then the images are displayed correctly', async () => {
    const { cleanup } = sut.given.moviesAndSeriesAreProvided();

    await sut.then.theImagesAreDisplayedCorrectly();

    cleanup();
  });
});
