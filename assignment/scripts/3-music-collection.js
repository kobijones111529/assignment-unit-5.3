console.log('***** Music Collection *****');

/**
 * Run a test
 * @param {string} name Name of the test
 * @param {Function} test Function to run
 */
const test = (name, test) => {
  console.group('Testing', name);
  test();
  console.groupEnd();
};

let collection = [];

/**
 * Add an album to the collection
 * @param {string} title Title
 * @param {string} artist Artist
 * @param {number} yearPublished Year of publication
 * @param {Array} tracks Array of tracks in the album
 * @returns Album added to collection
 */
function addToCollection(title, artist, yearPublished, tracks) {
  const album = {
    title: title,
    artist: artist,
    yearPublished: yearPublished,
    tracks: tracks
  };
  collection.push(album);
  return album;
}

test(addToCollection.name, () => {
  const add = (title, artist, year, tracks) => {
    console.log(
      'Added %o to collection',
      addToCollection(title, artist, year, tracks)
    );
  };
  collection = [];
  console.log('Collection is', collection);
  add('Swamp House', 'Marbin', 2023, [{ name: 'Swamp House', duration: 513 }]);
  add('We Like It Here', 'Snarky Puppy', 2014, []);
  add('Scenery', 'Ryo Fukui', 1976, []);
  add('私は怒りでできている', '惑星アブノーマル', 2018, []);
  add('NUMBER SEVEN', 'THE PINBALLS', 2017, []);
  add('Dirty Horse', 'Marbin', 2022, []);
  console.log('Collection is', collection);
});

/**
 * Display collection neatly in console
 * @param {Array} collection Collection to display
 * @param {string | undefined} name Optional name of the collection
 */
function showCollection(collection, name) {
  console.group(
    `%s has %o album${collection.length === 1 ? '' : 's'}`,
    name === undefined ? 'Collection' : `'${name}'`,
    collection.length
  );
  for (const album of collection) {
    const msg = `${album.title} by ${album.artist}, published in ${album.yearPublished}`;
    // Only create console group if tracks in non-empty
    if (album.tracks.length > 0) {
      console.group(`${msg}:`);
      // Display each track on a separate line
      album.tracks.forEach((track, index) => {
        console.log(
          `${index + 1}. ${track.name}: %o:%o`,
          Math.floor(track.duration / 60),
          track.duration % 60
        );
      });
      console.groupEnd();
    } else {
      console.log(msg);
    }
  }
  console.groupEnd();
}

test(showCollection.name, () => {
  showCollection(collection);
  showCollection(collection, 'My collection');
});

/**
 * Get all albums by an artist
 * @param {string} artist Artist to search by
 * @returns {any[]} Array of albums by artist
 */
function findByArtist(artist) {
  let albums = [];
  for (const album of collection) {
    if (album.artist === artist)
      albums.push(album);
  }
  return albums;
}

test(findByArtist.name, () => {
  const findAndLog = artist => {
    const found = findByArtist(artist);
    switch (found.length) {
      case 0:
        console.log('Found %o albums by %s', 0, artist);
        break;
      case 1:
        console.log('Found %o album by %s:', 1, artist, found[0]);
        break;
      default:
        console.log('Found %o albums by %s:', found.length, artist, found);
        break;
    }
  };
  console.log('Collection is', collection);
  findAndLog('Marbin');
  findAndLog('Cö Shu Nie');
  findAndLog('Ryo Fukui');
});

/**
 * Search collection based on multiple criteria
 * @param {*} criteria Search criteria object (all match)
 * @returns Array of matching albums
 */
function search(criteria) {
  const searchKeys = Object.keys(criteria ?? {});
  // Filter albums by match with criteria
  return collection.filter(album => {
    // Search exclusively by track name if present
    if (searchKeys.includes('trackName')) {
      return album.tracks.filter(track =>
        track.name === criteria.trackName
      ).length > 0;
    } else {
      // Array of matches, reduce on logical 'and'
      return [
        searchKeys.includes('artist') ?
          album.artist === criteria.artist :
          true,
        searchKeys.includes('year') ?
          album.yearPublished === criteria.year :
          true
      ].reduce((a, b) => a && b, true);
    }
  });
}

test(search.name, () => {
  const searchAndLog = criteria => {
    const found = search(criteria);
    switch (found.length) {
      case 0:
        console.log('Found %o albums matching %o', 0, criteria);
        break;
      case 1:
        console.log('Found %o album matching %o:', 1, criteria, found[0]);
        break;
      default:
        console.log('Found %o albums matching %o:', found.length, criteria, found);
        break;
    }
  };
  console.log('Collection is', collection);
  searchAndLog({});
  searchAndLog();
  searchAndLog({ artist: 'Marbin' });
  searchAndLog({ artist: '惑星アブノーマル', year: 2018 });
  searchAndLog({ artist: '惑星アブノーマル', year: 1 });
  searchAndLog({ title: 'NUMBER SEVEN', artist: 'THE PINBALLS', year: 2017 });
  searchAndLog({ trackName: 'Swamp House' });
  searchAndLog({ trackName: 'Swamp House', artist: 'Bill Evans' });
  searchAndLog({ trackName: 'Peace Piece' });
});
