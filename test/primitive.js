import chai from 'chai';
import valjs, {
  string,
  number,
  bool,
  array,
  object,
  func,
} from '../dist/val';

const should = chai.should();

describe('string', function() {
  it('check if string', (done) => {
    const error = valjs('hello', string);

    should.equal(error, null);
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, string);

    should.equal(error, 'Invalid: expected string. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, string);

    should.equal(error, 'Invalid: expected string. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], string);

    should.equal(error, 'Invalid: expected string. got array');
    done();
  });
  it('error that got function', (done) => {
    const error = valjs(() => {}, string);

    should.equal(error, 'Invalid: expected string. got function');
    done();
  });
  it('error that got boolean', (done) => {
    const error = valjs(true, string);

    should.equal(error, 'Invalid: expected string. got boolean');
    done();
  });
});

describe('number', function() {
  it('check if number', (done) => {
    const error = valjs(1, number);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', number);

    should.equal(error, 'Invalid: expected number. got string');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, number);

    should.equal(error, 'Invalid: expected number. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], number);

    should.equal(error, 'Invalid: expected number. got array');
    done();
  });
  it('error that got function', (done) => {
    const error = valjs(() => {}, number);

    should.equal(error, 'Invalid: expected number. got function');
    done();
  });
  it('error that got boolean', (done) => {
    const error = valjs(true, number);

    should.equal(error, 'Invalid: expected number. got boolean');
    done();
  });
});

describe('boolean', function() {
  it('check if boolean', (done) => {
    const error = valjs(true, bool);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', bool);

    should.equal(error, 'Invalid: expected boolean. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, bool);

    should.equal(error, 'Invalid: expected boolean. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, bool);

    should.equal(error, 'Invalid: expected boolean. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], bool);

    should.equal(error, 'Invalid: expected boolean. got array');
    done();
  });
  it('error that got function', (done) => {
    const error = valjs(() => {}, bool);

    should.equal(error, 'Invalid: expected boolean. got function');
    done();
  });
});

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
  it('error that got function', (done) => {
    const error = valjs(() => {}, array);

    should.equal(error, 'Invalid: expected array. got function');
    done();
  });
  it('error that got boolean', (done) => {
    const error = valjs(true, array);

    should.equal(error, 'Invalid: expected array. got boolean');
    done();
  });
});

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
  it('error that got function', (done) => {
    const error = valjs(() => {}, object);

    should.equal(error, 'Invalid: expected object. got function');
    done();
  });
  it('error that got boolean', (done) => {
    const error = valjs(true, object);

    should.equal(error, 'Invalid: expected object. got boolean');
    done();
  });
});

describe('func', function() {
  it('check if function', (done) => {
    const error = valjs(() => {}, func);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', func);

    should.equal(error, 'Invalid: expected function. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, func);

    should.equal(error, 'Invalid: expected function. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, func);

    should.equal(error, 'Invalid: expected function. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], func);

    should.equal(error, 'Invalid: expected function. got array');
    done();
  });
  it('error that got boolean', (done) => {
    const error = valjs(true, func);

    should.equal(error, 'Invalid: expected function. got boolean');
    done();
  });
});
