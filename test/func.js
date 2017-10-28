import chai from 'chai';
import valjs, {
  func,
} from 'valjs';

const should = chai.should();

describe('func', function() {
  it('check if function', (done) => {
    const error = valjs(() => {}, func);

    should.equal(error, null);
    done();
  });
  it('error that got string', (done) => {
    const error = valjs('hey', func);
    should.equal(error, 'Invalid: expected func. got string');
    done();
  });
  it('error that got number', (done) => {
    const error = valjs(2, func);

    should.equal(error, 'Invalid: expected func. got number');
    done();
  });
  it('error that got object', (done) => {
    const error = valjs({}, func);

    should.equal(error, 'Invalid: expected func. got object');
    done();
  });
  it('error that got array', (done) => {
    const error = valjs([], func);

    should.equal(error, 'Invalid: expected func. got array');
    done();
  });
  it('error that got bool', (done) => {
    const error = valjs(true, func);

    should.equal(error, 'Invalid: expected func. got bool');
    done();
  });
  it('error that got date', (done) => {
    const error = valjs(new Date(), func);

    should.equal(error, 'Invalid: expected func. got date');
    done();
  });
});

describe('func require', function() {
  it('check require', (done) => {
    const error = valjs(() => {}, func.require());

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = valjs(null, func.require());

    should.equal(error, 'Invalid: required');
    done();
  });
});
