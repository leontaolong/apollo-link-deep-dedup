import 'jest';
import CacheDataStore from '../cacheDataStore';

describe('CacheDataStore', () => {
    const author1Object = {
        'id': 1,
        'firstName': 'Tom',
        'lastName': 'Coleman',
        'posts': [
            {
                'type': 'id',
                'generated': false,
                'id': 'Post:1',
                'typename': 'Post',
            },
        ],
        '__typename': 'Author',
    };

    const post1Object = {
        'id': 1,
        '__typename': 'Post',
        'title': 'Introduction to GraphQL',
        'author': {
            'type': 'id',
            'generated': false,
            'id': 'Author:1',
            'typename': 'Author',
        },
    };

    const seed = {
        'Author:1': author1Object,
        'Post:1': post1Object,
    };

    const store = new CacheDataStore(seed);

    it(`gets correct data from store`, () => {
        // get result
        const author1Result = store.get('Author:1');
        const post1Result = store.get('Post:1');
        const undefinedResult = store.get('undefinedObject');
        // assert
        expect(author1Result).toEqual(author1Object);
        expect(post1Result).toEqual(post1Object);
        expect(undefinedResult).toEqual(undefined);
    });

    it(`toObject returns correct object`, () => {
        const result = store.toObject();
        expect(result).toEqual(seed);
    });
});
