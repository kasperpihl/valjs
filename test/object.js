import chai from 'chai';
import valjs, {
  string,
  object,
} from '../dist/val';

const should = chai.should();

describe('object', function() {
  it('check if object', (done) => {
    const error = valjs({}, object);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', object);

    should.equal(error, 'Invalid: expected object. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, object);

    should.equal(error, 'Invalid: expected object. got number');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], object);

    should.equal(error, 'Invalid: expected object. got array');
    done();
  });
  it('error that got func', (done) => {
    const error = valjs(() => {}, object);

    should.equal(error, 'Invalid: expected object. got func');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, object);

    should.equal(error, 'Invalid: expected object. got bool');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), object);

    should.equal(error, 'Invalid: expected object. got date');
    done();
  });
});

describe('object require', function() {
  it('check require', (done) => {
    const error = valjs({}, object.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, object.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});

// describe('object custom', function() {
//   it('check custom', (done) => {
//     const error = object.custom((value) => {
//       if (value.a === 'hi') {
//         return null;
//       }
//     }).test({a: 'hi'});
//
//     should.equal(error, null);
//     done();
//   });
//   it('error custom', (done) => {
//     const error = object.custom((value) => {
//       if (value.a === 'hi') {
//         return null;
//       } else {
//         return '';
//       }
//     }).test({a: 'hii'});
//
//     should.equal(error, 'Some error');
//     done();
//   });
// });

describe('object bounds', function() {
  it('check min length', (done) => {
    const error = valjs({a: 'a', b: 'b'}, object.min(2));

    should.equal(error, null);
    done();
  });
  it('check max length', (done) => {
    const error = valjs({a: 'a', b: 'b'}, object.max(2));

    should.equal(error, null);
    done();
  });
  it('check min-max range length', (done) => {
    const error = valjs({a: 'a', b: 'b', c: 'c'}, object.min(2).max(10));

    should.equal(error, null);
    done();
  });
  it('check empty', (done) => {
    const error = valjs({}, object.empty());

    should.equal(error, null);
    done();
  });
  it('error min length', (done) => {
    const error = valjs({a: 'a'}, object.min(3));

    should.equal(error, 'Invalid: min size 3. got 1');
    done();
  });
  it('error max length', (done) => {
    const error = valjs({a: 'a', b: 'b'}, object.max(1));

    should.equal(error, 'Invalid: max size 1. got 2');
    done();
  });
  it('error min-max range length', (done) => {
    const error = valjs({a: 'a'}, object.min(2).max(10));

    should.equal(error, 'Invalid: min size 2. got 1');
    done();
  });
  it('error empty', (done) => {
    const error = valjs({a: 'a'}, object.empty());

    should.equal(error, 'Invalid: not empty');
    done();
  });
});

describe('object iteratives', function() {
  it('check nested with includes, of and as', (done) => {
    const error = object.includes(object.as({
      a: object.of(string.eq('b')),
    })).test({
      two: {
        a: {
          test: 'b'
        }
      }
    });

    should.equal(error, null);
    done();
  });
});
