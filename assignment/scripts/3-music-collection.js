console.log('***** Music Collection *****');

const test = (name, test) => {
  console.group('Testing', name);
  test();
  console.groupEnd();
};

let collection = [];

function addToCollection(title, artist, yearPublished) {
  const album = {
    title: title,
    artist: artist,
    yearPublished: yearPublished
  };
  collection.push(album);
  return album;
}

test(addToCollection.name, () => {
  const add = (title, artist, year) => {
    console.log(
      'Added %o to collection',
      addToCollection(title, artist, year)
    );
  };
  collection = [];
  console.log('Collection is', collection);
  add('Swamp House', 'Marbin', 2023);
  add('We Like It Here', 'Snarky Puppy', 2014);
  add('Scenery', 'Ryo Fukui', 1976);
  add('私は怒りでできている', '惑星アブノーマル', 2018);
  add('NUMBER SEVEN', 'THE PINBALLS', 2017);
  add('Dirty Horse', 'Marbin', 2022);
  console.log('Collection is', collection);
});

function showCollection(collection, name) {
  console.group(`${name === undefined ? 'Collection' : `'${name}'`} has %o albums`, collection.length);
  for (const album of collection) {
    console.log(`${album.title} by ${album.artist}, published in ${album.yearPublished}`);
  }
  console.groupEnd();
}

test(showCollection.name, () => {
  showCollection(collection);
  showCollection(collection, 'My collection');
});
