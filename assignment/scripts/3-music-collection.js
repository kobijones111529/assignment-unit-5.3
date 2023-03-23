console.log('***** Music Collection *****');

const test = (name, test) => {
  console.group('Testing', name);
  test();
  console.groupEnd();
};

let collection = [];

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

function showCollection(collection, name) {
  console.group(`${name === undefined ? 'Collection' : `'${name}'`} has %o albums`, collection.length);
  for (const album of collection) {
    const msg = `${album.title} by ${album.artist}, published in ${album.yearPublished}`;
    if (album.tracks.length > 0) {
      console.group(`${msg}:`);
      album.tracks.forEach((element, index) => {
        console.log(`${index + 1}. ${element.name}: %o:%o`, Math.floor(element.duration / 60), element.duration % 60);
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
    if (found.length > 0)
      console.log(
        `Found %o album${found.length > 1 ? 's' : ''} by %s:`,
        found.length,
        artist,
        found.length > 1 ? found : found[0]
      );
    else
      console.log('Found %o albums by %s', 0, artist);
  };
  console.log('Collection is', collection);
  findAndLog('Marbin');
  findAndLog('Cö Shu Nie');
  findAndLog('Ryo Fukui');
});

function search(criteria) {
  const entries = Object.entries(criteria ?? {});
  const byTrackName = new Map(entries).has('trackName');
  return collection.filter(album => {
    if (byTrackName) {
      return album.tracks.filter(track =>
        track.name === criteria.trackName
      ).length > 0;
    } else {
      return entries
        .map(([k, v]) => album[k] === v)
        .reduce((a, b) => a && b, true);
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
  searchAndLog({ artist: '惑星アブノーマル', yearPublished: 2018 });
  searchAndLog({ artist: '惑星アブノーマル', yearPublished: 1 });
  searchAndLog({ title: 'NUMBER SEVEN', artist: 'THE PINBALLS', yearPublished: 2017 });
  searchAndLog({ trackName: 'Swamp House' });
  searchAndLog({ trackName: 'Swamp House', artist: 'Bill Evans' });
  searchAndLog({ trackName: 'Peace Piece' });
});
