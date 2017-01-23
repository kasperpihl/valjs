import chai from 'chai';
import valjs, {
  string,
  array,
} from '../dist/val';

const should = chai.should();

describe('array', function() {
  it('check if array', (done) => {
    const error = valjs([], array);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', array);

    should.equal(error, 'Invalid: expected array. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, array);

    should.equal(error, 'Invalid: expected array. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, array);

    should.equal(error, 'Invalid: expected array. got object');
    done();
  });
  it('error that got func', (done) => {
    const error = valjs(() => {}, array);

    should.equal(error, 'Invalid: expected array. got func');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, array);

    should.equal(error, 'Invalid: expected array. got bool');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), array);

    should.equal(error, 'Invalid: expected array. got date');
    done();
  });
});

describe('array require', function() {
  it('check require', (done) => {
    const error = valjs([], array.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, array.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});

describe('array custom', function() {
  it('check custom', (done) => {
    const error = array.custom((value) => {
      if (value[0] === 'hi') {
        return null;
      }
    }).test(['hi']);

    should.equal(error, null);
    done();
  });
  it('error custom', (done) => {
    const error = array.custom((value) => {
      if (value[0] === 'hi') {
        return null;
      } else {
        return 'Some error';
      }
    }).test(['hii']);

    should.equal(error, 'Invalid: Some error');
    done();
  });
});

describe('array bounds', function() {
  it('check min length', (done) => {
    const error = valjs([1, 2], array.min(2));

    should.equal(error, null);
    done();
  });
  it('check max length', (done) => {
    const error = valjs([1], array.max(2));

    should.equal(error, null);
    done();
  });
  it('check min-max range length', (done) => {
    const error = valjs([1, 2, 3], array.min(2).max(10));

    should.equal(error, null);
    done();
  });
  it('check empty', (done) => {
    const error = valjs([], array.empty());

    should.equal(error, null);
    done();
  });
  it('error min length', (done) => {
    const error = valjs([1], array.min(3));

    should.equal(error, 'Invalid: min size 3. got 1');
    done();
  });
  it('error max length', (done) => {
    const error = valjs([1, 2, 3, 4], array.max(3));

    should.equal(error, 'Invalid: max size 3. got 4');
    done();
  });
  it('error min-max range length', (done) => {
    const error = valjs([1], array.min(2).max(10));

    should.equal(error, 'Invalid: min size 2. got 1');
    done();
  });
  it('error empty', (done) => {
    const error = valjs([1], array.empty());

    should.equal(error, 'Invalid: not empty');
    done();
  });
});

describe('array iteratives', function() {
  it('check nested with includes, of and as', (done) => {
    const error = array.includes(array.as([
      array.of(string.eq('b')),
    ])).test([
      [
        ['b']
      ]
    ]);

    should.equal(error, null);
    done();
  });
});
