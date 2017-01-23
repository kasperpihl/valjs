import chai from 'chai';
import valjs, {
  bool,
} from '../dist/val';

const should = chai.should();

describe('bool', function() {
  it('check if bool', (done) => {
    const error = valjs(true, bool);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', bool);

    should.equal(error, 'Invalid: expected bool. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, bool);

    should.equal(error, 'Invalid: expected bool. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, bool);

    should.equal(error, 'Invalid: expected bool. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], bool);

    should.equal(error, 'Invalid: expected bool. got array');
    done();
  });
  it('error that got func', (done) => {
    const error = valjs(() => {}, bool);

    should.equal(error, 'Invalid: expected bool. got func');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), bool);

    should.equal(error, 'Invalid: expected bool. got date');
    done();
  });
});

describe('bool require', function() {
  it('check require', (done) => {
    const error = valjs(true, bool.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, bool.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});

describe('bool custom', function() {
  it('check custom', (done) => {
    const error = bool.custom((value) => {
      if (value === true) {
        return null;
      }
    }).test(true);

    should.equal(error, null);
    done();
  });
  it('error custom', (done) => {
    const error = bool.custom((value) => {
      if (value === false) {
        return null;
      } else {
        return 'Some error';
      }
    }).test(true);

    should.equal(error, 'Invalid: Some error');
    done();
  });
});

describe('bool comparisons', function() {
  it('check eq', (done) => {
    const error = valjs(true, bool.eq(true));

    should.equal(error, null);
    done();
  });
  it('check neq', (done) => {
    const error = valjs(true, bool.neq(false));

    should.equal(error, null);
    done();
  });
  it('error eq', (done) => {
    const error = valjs(true, bool.eq(false));

    should.equal(error, 'Invalid: expected not equal \'false\'');
    done();
  });
  it('error neq', (done) => {
    const error = valjs(true, bool.neq(true));

    should.equal(error, 'Invalid: expected equal \'true\'');
    done();
  });
});
