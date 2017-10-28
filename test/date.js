import chai from 'chai';
import valjs, {
  date,
} from 'valjs';

const should = chai.should();

describe('date', function() {
  it('check if date', (done) => {
    const error = valjs(new Date(), date);

    should.equal(error, null);
    done();
  });
  it('error that got date', (done) => {
    const error = valjs('hey', date);

    should.equal(error, 'Invalid: expected date. got string');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(2, date);

    should.equal(error, 'Invalid: expected date. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, date);

    should.equal(error, 'Invalid: expected date. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], date);

    should.equal(error, 'Invalid: expected date. got array');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, date);

    should.equal(error, 'Invalid: expected date. got bool');
    done();
  });
});

describe('date require', function() {
  it('check require', (done) => {
    const error = valjs(new Date(), date.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, date.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});
