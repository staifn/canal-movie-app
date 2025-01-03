import { act } from '@testing-library/react';
import ReactModal from 'react-modal';
import { createMediaSearchSutBuilder, MediaSearchSut } from './MediaSearch.sut';

describe('features > media > MediaSearch', () => {
  const sutBuilder = createMediaSearchSutBuilder();
  let sut: MediaSearchSut;

  beforeEach(() => {
    jest.useFakeTimers(); // Enable simulated timers
    sut = sutBuilder.build();
    document.body.innerHTML = `<div id="modal-root"></div>`;
    ReactModal.setAppElement('#modal-root');
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run remaining timers
    jest.useRealTimers(); // Restore real timers
  });

  test('Given movies and series are provided, When the component renders, Then the images are displayed correctly', async () => {
    const { cleanup } = sut.given.moviesAndSeriesAreProvided();

    await sut.then.theImagesAreDisplayedCorrectly();

    cleanup();
  });

  test('Given movies and series are provided, When user types in the search input, Then the URL is updated correctly', async () => {
    const { cleanup } = sut.given.moviesAndSeriesAreProvided();

    act(() => {
      sut.when.userTypesInSearchInput('New Query');
      jest.runAllTimers(); // Simulate debounce waiting
    });

    await sut.then.theURLIsUpdatedWithQuery('New Query');

    cleanup();
  });

  test('Given movies and series are provided And no input is provided, Then no URL update occurs', async () => {
    const { cleanup } = sut.given.moviesAndSeriesAreProvided();

    await sut.then.theURLIsNotUpdated();

    cleanup();
  });
  test('Given movies and series are provided, When the user clicks on an image, Then the modal opens And displays the correct media details', async () => {

    const { cleanup } = sut.given.moviesAndSeriesAreProvided();
    sut.when.userClicksOnMediaImage(0);

    await sut.then.theModalDisplaysCorrectMediaDetails(0);

    cleanup();
  });
});
