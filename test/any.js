import chai from 'chai';
import valjs, {
  string,
  number,
  any,
} from 'valjs';

const should = chai.should();

describe('any', function() {
  it('check if any', (done) => {
    const error = any.test(9)

    should.equal(error, null);
    done();
  });
  it('error if any', (done) => {
    const error = any.test(null)

    should.equal(error, null);
    done();
  });
});

describe('any require', function() {
  it('check require', (done) => {
    const error = any.require().test(9);

    should.equal(error, null);
    done();
  });
  it('error require', (done) => {
    const error = any.require().test(null)

    should.equal(error, 'Invalid: required');
    done();
  });
});

describe('any iteratives', function() {
  it('check of', (done) => {
    const error = any.of(string, number).test('9');

    should.equal(error, null);
    done();
  });
  it('check of again', (done) => {
    const error = any.of(string, number).test(9);

    should.equal(error, null);
    done();
  });
});
